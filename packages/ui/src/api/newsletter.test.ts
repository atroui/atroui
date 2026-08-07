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
import { handleNewsletterPost } from "./newsletter"
import { resetRateLimits } from "./rate-limit"

function jsonRequest(body: unknown, ip = "203.0.113.20") {
  return new Request("http://localhost/api/newsletter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  })
}

describe("handleNewsletterPost", () => {
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

  it("returns 503 when Resend and SMTP are missing", async () => {
    const res = await handleNewsletterPost(
      jsonRequest({ email: "ada@example.com" }),
    )
    expect(res.status).toBe(503)
    const data = await res.json()
    expect(data.error).toMatch(/not configured/i)
  })

  it("rejects invalid email", async () => {
    const res = await handleNewsletterPost(jsonRequest({ email: "nope" }))
    expect(res.status).toBe(400)
  })

  it("returns 200 without side effects when honeypot is filled", async () => {
    process.env.RESEND_API_KEY = "re_test"
    process.env.RESEND_AUDIENCE_ID = "aud_test"
    const fetchMock = vi.fn()
    vi.stubGlobal("fetch", fetchMock)

    const res = await handleNewsletterPost(
      jsonRequest({ email: "ada@example.com", honeypot: "bot" }),
    )
    expect(res.status).toBe(200)
    expect(fetchMock).not.toHaveBeenCalled()
    expect(sendMail).not.toHaveBeenCalled()
  })

  it("subscribes via Resend audience when configured", async () => {
    process.env.RESEND_API_KEY = "re_test"
    process.env.RESEND_AUDIENCE_ID = "aud_test"
    const fetchMock = vi.fn(async () => new Response(null, { status: 200 }))
    vi.stubGlobal("fetch", fetchMock)

    const res = await handleNewsletterPost(
      jsonRequest({ email: "ada@example.com" }),
    )
    expect(res.status).toBe(200)
    expect(fetchMock).toHaveBeenCalledOnce()
    expect(String(fetchMock.mock.calls[0]?.[0])).toContain(
      "/audiences/aud_test/contacts",
    )
    expect(sendMail).not.toHaveBeenCalled()
  })

  it("falls back to SMTP notification when Resend is unset", async () => {
    vi.mocked(isSmtpConfigured).mockReturnValue(true)
    process.env.CONTACT_EMAIL_TO = "hello@atroui.com"

    const res = await handleNewsletterPost(
      jsonRequest({ email: "ada@example.com" }),
    )
    expect(res.status).toBe(200)
    expect(sendMail).toHaveBeenCalledOnce()
    expect(vi.mocked(getDefaultFromAddress)).toHaveBeenCalled()
  })

  it("returns 503 when SMTP is on but CONTACT_EMAIL_TO is missing", async () => {
    vi.mocked(isSmtpConfigured).mockReturnValue(true)
    const res = await handleNewsletterPost(
      jsonRequest({ email: "ada@example.com" }),
    )
    expect(res.status).toBe(503)
    expect(sendMail).not.toHaveBeenCalled()
  })
})
