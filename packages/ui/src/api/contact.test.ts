import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("../lib/mail", () => ({
  isSmtpConfigured: vi.fn(() => false),
  sendMail: vi.fn(async () => undefined),
  getDefaultFromAddress: vi.fn(() => "AtroUI <noreply@atroui.com>"),
}))

import {
  getDefaultFromAddress,
  isSmtpConfigured,
  sendMail,
} from "../lib/mail"
import { handleContactPost } from "./contact"
import { resetRateLimits } from "./rate-limit"
import { handleWaitlistPost } from "./waitlist"

function jsonRequest(url: string, body: unknown) {
  return new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": "203.0.113.10",
    },
    body: JSON.stringify(body),
  })
}

const baseContact = {
  name: "Ada",
  email: "ada@example.com",
  company: "",
  projectType: "mvp-sprint",
  budget: "5k-10k",
  timeline: "asap",
  message: "Need a scoped MVP this month.",
  config: "",
  honeypot: "",
}

describe("handleContactPost", () => {
  beforeEach(() => {
    resetRateLimits()
    vi.mocked(isSmtpConfigured).mockReturnValue(false)
    vi.mocked(sendMail).mockClear()
    delete process.env.CONTACT_EMAIL_TO
  })

  afterEach(() => {
    resetRateLimits()
  })

  it("returns 503 when SMTP is not configured", async () => {
    const res = await handleContactPost(jsonRequest("http://localhost/api/contact", baseContact))
    expect(res.status).toBe(503)
    const data = await res.json()
    expect(data.error).toMatch(/not configured/i)
  })

  it("returns 200 without sending when honeypot is filled", async () => {
    vi.mocked(isSmtpConfigured).mockReturnValue(true)
    process.env.CONTACT_EMAIL_TO = "hello@atroui.com"
    const res = await handleContactPost(
      jsonRequest("http://localhost/api/contact", {
        ...baseContact,
        honeypot: "bot",
      }),
    )
    expect(res.status).toBe(200)
    expect(sendMail).not.toHaveBeenCalled()
  })

  it("rejects invalid email", async () => {
    const res = await handleContactPost(
      jsonRequest("http://localhost/api/contact", {
        ...baseContact,
        email: "not-an-email",
      }),
    )
    expect(res.status).toBe(400)
  })

  it("rejects oversized attachment", async () => {
    vi.mocked(isSmtpConfigured).mockReturnValue(true)
    process.env.CONTACT_EMAIL_TO = "hello@atroui.com"
    const huge = Buffer.alloc(6 * 1024 * 1024, 1).toString("base64")
    const res = await handleContactPost(
      jsonRequest("http://localhost/api/contact", {
        ...baseContact,
        attachmentName: "brief.pdf",
        attachmentMime: "application/pdf",
        attachmentData: huge,
      }),
    )
    expect(res.status).toBe(413)
    expect(sendMail).not.toHaveBeenCalled()
  })

  it("sends mail when SMTP is configured", async () => {
    vi.mocked(isSmtpConfigured).mockReturnValue(true)
    process.env.CONTACT_EMAIL_TO = "hello@atroui.com"
    const res = await handleContactPost(
      jsonRequest("http://localhost/api/contact", baseContact),
    )
    expect(res.status).toBe(200)
    expect(sendMail).toHaveBeenCalledOnce()
    expect(vi.mocked(getDefaultFromAddress)).toHaveBeenCalled()
  })
})

describe("handleWaitlistPost", () => {
  beforeEach(() => {
    resetRateLimits()
    vi.mocked(isSmtpConfigured).mockReturnValue(false)
    delete process.env.RESEND_API_KEY
    delete process.env.RESEND_AUDIENCE_ID
    delete process.env.CONTACT_EMAIL_TO
  })

  it("returns 503 without Resend or SMTP", async () => {
    const res = await handleWaitlistPost(
      jsonRequest("http://localhost/api/waitlist", {
        email: "ada@example.com",
        source: "test",
      }),
    )
    expect(res.status).toBe(503)
  })

  it("rejects invalid email", async () => {
    const res = await handleWaitlistPost(
      jsonRequest("http://localhost/api/waitlist", { email: "nope" }),
    )
    expect(res.status).toBe(400)
  })
})
