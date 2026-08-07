import { z } from "zod"

import { getBrand } from "../lib/brand"
import {
  getDefaultFromAddress,
  isSmtpConfigured,
  sendMail,
} from "../lib/mail"
import { checkRateLimit } from "./rate-limit"
import {
  clientIp,
  emailSchema,
  getContactInbox,
  isHoneypotTripped,
  isResendAudienceConfigured,
  jsonError,
  jsonOk,
  readJsonBody,
  subscribeResendAudience,
} from "./shared"

const newsletterSchema = z.object({
  email: emailSchema,
  honeypot: z.string().optional().default(""),
})

/**
 * POST /api/newsletter handler.
 * Prefers Resend Audiences; falls back to SMTP notification email.
 */
export async function handleNewsletterPost(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return jsonError("Method not allowed", 405)
  }

  const ip = clientIp(req)
  const limited = await checkRateLimit(`newsletter:${ip}`, {
    limit: 10,
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

  const parsed = newsletterSchema.safeParse(body.data)
  if (!parsed.success) {
    return jsonError("Invalid email", 400)
  }

  const data = parsed.data
  if (isHoneypotTripped(data.honeypot)) {
    return jsonOk({ ok: true })
  }

  try {
    if (isResendAudienceConfigured()) {
      await subscribeResendAudience(data.email)
    } else if (isSmtpConfigured()) {
      const to = getContactInbox()
      if (!to) return jsonError("CONTACT_EMAIL_TO is not set", 503)
      const brand = getBrand()
      await sendMail({
        to,
        from: getDefaultFromAddress(),
        replyTo: data.email,
        subject: `[${brand.name}] Newsletter subscribe`,
        text: `Email: ${data.email}`,
      })
    } else {
      return jsonError("Email not configured", 503)
    }
  } catch (err) {
    console.error("[atroui/api/newsletter]", err)
    return jsonError("Failed to subscribe", 502)
  }

  return jsonOk({ ok: true })
}
