import { z } from "zod"

/** Hidden field name used by contact (and optional list) forms. */
export const HONEYPOT_FIELD = "honeypot"

/** Max JSON body we accept before parsing (attachments inflate base64). */
export const MAX_BODY_BYTES = 8 * 1024 * 1024

/** Max decoded attachment size (matches contact form client cap). */
export const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024

const ALLOWED_ATTACHMENT_EXT = new Set([
  "pdf",
  "doc",
  "docx",
  "txt",
  "png",
  "jpg",
  "jpeg",
  "md",
])

export function jsonOk(data: Record<string, unknown> = { ok: true }, status = 200) {
  return Response.json(data, { status })
}

export function jsonError(
  error: string,
  status: number,
  extra?: Record<string, unknown>,
) {
  return Response.json({ ok: false, error, ...extra }, { status })
}

/** JPEG/PNG buffer → data URL for workspace clients. */
export function bufferToDataUrl(
  buffer: Buffer,
  mime: "image/jpeg" | "image/png" = "image/jpeg",
): string {
  return `data:${mime};base64,${buffer.toString("base64")}`
}

export function getHfToken(): string | null {
  return process.env.HUGGINGFACE_API_KEY?.trim() || null
}

export function hasGoogleAiKey(): boolean {
  return Boolean(
    process.env.GOOGLE_AI_KEY?.trim() ||
      process.env.GOOGLE_AI_API_KEY?.trim() ||
      process.env.GEMINI_API_KEY?.trim(),
  )
}

export function getXaiApiKey(): string | null {
  return process.env.XAI_API_KEY?.trim() || null
}

export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim()
    if (first) return first
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown"
}

export async function readJsonBody(
  req: Request,
): Promise<{ ok: true; data: unknown } | { ok: false; response: Response }> {
  const contentLength = Number(req.headers.get("content-length") || "0")
  if (contentLength > MAX_BODY_BYTES) {
    return { ok: false, response: jsonError("Request body too large", 413) }
  }

  const text = await req.text()
  if (text.length > MAX_BODY_BYTES) {
    return { ok: false, response: jsonError("Request body too large", 413) }
  }

  try {
    return { ok: true, data: text ? JSON.parse(text) : {} }
  } catch {
    return { ok: false, response: jsonError("Invalid JSON body", 400) }
  }
}

export const emailSchema = z.string().trim().email().max(320)

export function isHoneypotTripped(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0
}

export function getContactInbox(): string | null {
  const to =
    process.env.CONTACT_EMAIL_TO?.trim() ||
    process.env.NEXT_PUBLIC_SITE_EMAIL?.trim()
  return to || null
}

/** Segment ID (new Resend) or legacy Audience ID. Same env for both. */
export function getResendListId(): string | null {
  return (
    process.env.RESEND_SEGMENT_ID?.trim() ||
    process.env.RESEND_AUDIENCE_ID?.trim() ||
    null
  )
}

export function isResendAudienceConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim() && getResendListId())
}

function resendErrorMessage(status: number, body: unknown): string {
  const data = body as { message?: string; error?: string }
  return data.message || data.error || `Resend error (${status})`
}

function isDuplicateContact(status: number, message: string): boolean {
  if (status === 409) return true
  return /already exists|already been added|duplicate/i.test(message)
}

/**
 * Add email to Resend global Contacts and the AtroUI updates segment.
 * Resend retired Audiences; Segments replace them. We still read
 * RESEND_AUDIENCE_ID as an alias for the segment UUID.
 */
export async function subscribeResendAudience(email: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const listId = getResendListId()
  if (!apiKey || !listId) {
    throw new Error("Resend audience is not configured")
  }

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  }

  const create = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers,
    body: JSON.stringify({
      email,
      unsubscribed: false,
      segments: [{ id: listId }],
    }),
  })

  if (create.ok) return

  const createBody = await create.json().catch(() => ({}))
  const createMsg = resendErrorMessage(create.status, createBody)
  if (isDuplicateContact(create.status, createMsg)) return

  // Legacy Audiences API (pre-Segments dashboard).
  const legacy = await fetch(
    `https://api.resend.com/audiences/${listId}/contacts`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ email, unsubscribed: false }),
    },
  )
  if (legacy.ok || legacy.status === 409) return

  const legacyBody = await legacy.json().catch(() => ({}))
  throw new Error(resendErrorMessage(legacy.status, legacyBody) || createMsg)
}

export function decodeAttachment(input: {
  name?: string
  mime?: string
  data?: string
}):
  | { ok: true; filename: string; content: Buffer; contentType?: string }
  | { ok: false; error: string; status: number } {
  if (!input.data) {
    return {
      ok: false,
      error: "Missing attachment data",
      status: 400,
    }
  }

  const filename = (input.name || "attachment").trim().slice(0, 200)
  const ext = filename.includes(".")
    ? filename.split(".").pop()!.toLowerCase()
    : ""
  if (!ext || !ALLOWED_ATTACHMENT_EXT.has(ext)) {
    return {
      ok: false,
      error: "Attachment type not allowed",
      status: 400,
    }
  }

  let content: Buffer
  try {
    content = Buffer.from(input.data, "base64")
  } catch {
    return { ok: false, error: "Invalid attachment encoding", status: 400 }
  }

  if (content.byteLength === 0) {
    return { ok: false, error: "Empty attachment", status: 400 }
  }
  if (content.byteLength > MAX_ATTACHMENT_BYTES) {
    return {
      ok: false,
      error: "Attachment too large (max 5 MB)",
      status: 413,
    }
  }

  return {
    ok: true,
    filename,
    content,
    contentType: input.mime?.trim() || undefined,
  }
}
