import { describe, expect, it } from "vitest"
import {
  MAX_BODY_BYTES,
  clientIp,
  isHoneypotTripped,
  readJsonBody,
} from "./shared"

describe("shared helpers", () => {
  it("clientIp prefers the first x-forwarded-for hop", () => {
    const req = new Request("http://localhost/", {
      headers: {
        "x-forwarded-for": "203.0.113.1, 10.0.0.1",
        "x-real-ip": "10.0.0.9",
      },
    })
    expect(clientIp(req)).toBe("203.0.113.1")
  })

  it("clientIp falls back to x-real-ip then unknown", () => {
    expect(
      clientIp(
        new Request("http://localhost/", {
          headers: { "x-real-ip": "198.51.100.7" },
        }),
      ),
    ).toBe("198.51.100.7")
    expect(clientIp(new Request("http://localhost/"))).toBe("unknown")
  })

  it("isHoneypotTripped treats non-empty strings as tripped", () => {
    expect(isHoneypotTripped("")).toBe(false)
    expect(isHoneypotTripped("   ")).toBe(false)
    expect(isHoneypotTripped("bot")).toBe(true)
    expect(isHoneypotTripped(undefined)).toBe(false)
  })

  it("readJsonBody rejects oversized content-length", async () => {
    const req = new Request("http://localhost/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "content-length": String(MAX_BODY_BYTES + 1),
      },
      body: "{}",
    })
    const result = await readJsonBody(req)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.response.status).toBe(413)
    }
  })

  it("readJsonBody parses valid JSON", async () => {
    const req = new Request("http://localhost/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "a@b.co" }),
    })
    const result = await readJsonBody(req)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data).toEqual({ email: "a@b.co" })
    }
  })

  it("readJsonBody rejects invalid JSON", async () => {
    const req = new Request("http://localhost/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{not-json",
    })
    const result = await readJsonBody(req)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.response.status).toBe(400)
    }
  })
})
