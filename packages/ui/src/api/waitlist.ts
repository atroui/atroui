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

const waitlistSchema = z.object({
  email: emailSchema,
  source: z.string().trim().max(200).optional().default(""),
  honeypot: z.string().optional().default(""),
})

/**
 * POST /api/waitlist handler.
 * Prefers Resend Audiences; falls back to SMTP notification email.
 */
export async function handleWaitlistPost(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return jsonError("Method not allowed", 405)
  }

  const ip = clientIp(req)
  const limited = await checkRateLimit(`waitlist:${ip}`, {
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

  const parsed = waitlistSchema.safeParse(body.data)
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
        subject: `[${brand.name}] Waitlist signup`,
        text: [
          `Email: ${data.email}`,
          data.source ? `Source: ${data.source}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
      })
    } else {
      return jsonError("Email not configured", 503)
    }
  } catch (err) {
    console.error("[atroui/api/waitlist]", err)
    return jsonError("Failed to join waitlist", 502)
  }

  return jsonOk({ ok: true })
}
