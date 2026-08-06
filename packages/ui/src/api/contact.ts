import { z } from "zod"

import {
  getDefaultFromAddress,
  isSmtpConfigured,
  sendMail,
} from "../lib/mail"
import { getBrand } from "../lib/brand"
import { checkRateLimit } from "./rate-limit"
import {
  clientIp,
  decodeAttachment,
  emailSchema,
  getContactInbox,
  isHoneypotTripped,
  jsonError,
  jsonOk,
  readJsonBody,
} from "./shared"

const contactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: emailSchema,
  company: z.string().trim().max(200).optional().default(""),
  projectType: z.string().trim().max(100).optional().default(""),
  budget: z.string().trim().max(100).optional().default(""),
  timeline: z.string().trim().max(100).optional().default(""),
  message: z.string().trim().min(1).max(8000),
  config: z.string().trim().max(500).optional().default(""),
  honeypot: z.string().optional().default(""),
  attachmentName: z.string().optional(),
  attachmentMime: z.string().optional(),
  attachmentData: z.string().optional(),
})

/**
 * POST /api/contact handler.
 * Expects JSON from AtroUI ContactForm (incl. optional base64 attachment).
 */
export async function handleContactPost(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return jsonError("Method not allowed", 405)
  }

  const ip = clientIp(req)
  const limited = checkRateLimit(`contact:${ip}`, {
    limit: 5,
    windowMs: 15 * 60 * 1000,
  })
  if (!limited.ok) {
    return jsonError(
      `Too many requests. Try again in ${limited.retryAfterSec}s.`,
      429,
    )
  }

  const body = await readJsonBody(req)
  if (!body.ok) return body.response

  const parsed = contactSchema.safeParse(body.data)
  if (!parsed.success) {
    return jsonError("Invalid contact payload", 400)
  }

  const data = parsed.data
  if (isHoneypotTripped(data.honeypot)) {
    return jsonOk({ ok: true })
  }

  if (!isSmtpConfigured()) {
    return jsonError("Email not configured", 503)
  }

  const to = getContactInbox()
  if (!to) {
    return jsonError("CONTACT_EMAIL_TO is not set", 503)
  }

  let attachments:
    | { filename: string; content: Buffer; contentType?: string }[]
    | undefined

  if (data.attachmentData) {
    const decoded = decodeAttachment({
      name: data.attachmentName,
      mime: data.attachmentMime,
      data: data.attachmentData,
    })
    if (!decoded.ok) {
      return jsonError(decoded.error, decoded.status)
    }
    attachments = [
      {
        filename: decoded.filename,
        content: decoded.content,
        contentType: decoded.contentType,
      },
    ]
  }

  const brand = getBrand()
  const subject = `[${brand.name}] Contact from ${data.name}`
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : null,
    data.projectType ? `Project: ${data.projectType}` : null,
    data.budget ? `Budget: ${data.budget}` : null,
    data.timeline ? `Timeline: ${data.timeline}` : null,
    data.config ? `Config: ${data.config}` : null,
    "",
    data.message,
  ]
    .filter(Boolean)
    .join("\n")

  try {
    await sendMail({
      to,
      from: getDefaultFromAddress(),
      replyTo: data.email,
      subject,
      text,
      attachments,
    })
  } catch (err) {
    console.error("[atroui/api/contact]", err)
    return jsonError("Failed to send message", 502)
  }

  return jsonOk({ ok: true })
}
