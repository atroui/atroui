import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("../lib/mail", () => ({
  isSmtpConfigured: vi.fn(() => false),
  sendMail: vi.fn(async () => undefined),
  getDefaultFromAddress: vi.fn(() => "AtroUI <noreply@atroui.com>"),
}))

import { isSmtpConfigured, sendMail } from "../lib/mail"
import { resetRateLimits } from "./rate-limit"
import { handleWaitlistPost } from "./waitlist"

function jsonRequest(body: unknown, ip = "203.0.113.30") {
  return new Request("http://localhost/api/waitlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  })
}

describe("handleWaitlistPost", () => {
  beforeEach(() => {
    resetRateLimits()
    vi.mocked(isSmtpConfigured).mockReturnValue(false)
    vi.mocked(sendMail).mockClear()
    delete process.env.RESEND_API_KEY
    delete process.env.RESEND_AUDIENCE_ID
    delete process.env.CONTACT_EMAIL_TO
    vi.unstubAllGlobals()
  })

  afterEach(() => {
    resetRateLimits()
    vi.unstubAllGlobals()
  })

  it("returns 503 without Resend or SMTP", async () => {
    const res = await handleWaitlistPost(
      jsonRequest({ email: "ada@example.com", source: "test" }),
    )
    expect(res.status).toBe(503)
  })

  it("rejects invalid email", async () => {
    const res = await handleWaitlistPost(jsonRequest({ email: "nope" }))
    expect(res.status).toBe(400)
  })

  it("returns 200 without side effects when honeypot is filled", async () => {
    process.env.RESEND_API_KEY = "re_test"
    process.env.RESEND_AUDIENCE_ID = "aud_test"
    const fetchMock = vi.fn()
    vi.stubGlobal("fetch", fetchMock)

    const res = await handleWaitlistPost(
      jsonRequest({
        email: "ada@example.com",
        source: "landing",
        honeypot: "bot",
      }),
    )
    expect(res.status).toBe(200)
    expect(fetchMock).not.toHaveBeenCalled()
    expect(sendMail).not.toHaveBeenCalled()
  })

  it("subscribes via Resend and ignores duplicate 409", async () => {
    process.env.RESEND_API_KEY = "re_test"
    process.env.RESEND_AUDIENCE_ID = "aud_test"
    const fetchMock = vi.fn(async () => new Response(null, { status: 409 }))
    vi.stubGlobal("fetch", fetchMock)

    const res = await handleWaitlistPost(
      jsonRequest({ email: "ada@example.com", source: "footer" }),
    )
    expect(res.status).toBe(200)
    expect(fetchMock).toHaveBeenCalledOnce()
  })

  it("falls back to SMTP with source in the body", async () => {
    vi.mocked(isSmtpConfigured).mockReturnValue(true)
    process.env.CONTACT_EMAIL_TO = "hello@atroui.com"

    const res = await handleWaitlistPost(
      jsonRequest({ email: "ada@example.com", source: "hero" }),
    )
    expect(res.status).toBe(200)
    expect(sendMail).toHaveBeenCalledOnce()
    const arg = vi.mocked(sendMail).mock.calls[0]?.[0]
    expect(arg?.text).toMatch(/Source: hero/)
  })

  it("rate-limits after 10 requests from the same IP", async () => {
    vi.mocked(isSmtpConfigured).mockReturnValue(true)
    process.env.CONTACT_EMAIL_TO = "hello@atroui.com"

    for (let i = 0; i < 10; i++) {
      const res = await handleWaitlistPost(
        jsonRequest({ email: `u${i}@example.com` }),
      )
      expect(res.status).toBe(200)
    }
    const limited = await handleWaitlistPost(
      jsonRequest({ email: "overflow@example.com" }),
    )
    expect(limited.status).toBe(429)
  })
})
