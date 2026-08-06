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

export function jsonError(error: string, status: number) {
  return Response.json({ ok: false, error }, { status })
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

export function isResendAudienceConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() &&
      process.env.RESEND_AUDIENCE_ID?.trim(),
  )
}

export async function subscribeResendAudience(email: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const audienceId = process.env.RESEND_AUDIENCE_ID?.trim()
  if (!apiKey || !audienceId) {
    throw new Error("Resend audience is not configured")
  }

  const res = await fetch(
    `https://api.resend.com/audiences/${audienceId}/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    },
  )

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as {
      message?: string
      error?: string
    }
    // Resend returns 409-ish for duplicates; treat as success for UX.
    if (res.status === 409) return
    throw new Error(
      body.message || body.error || `Resend error (${res.status})`,
    )
  }
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
