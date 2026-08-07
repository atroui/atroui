import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("ai", () => ({
  generateText: vi.fn(async () => ({ text: "Scoped via LLM." })),
}))

vi.mock("@ai-sdk/xai", () => ({
  xai: vi.fn(() => "mock-xai-model"),
}))

import { generateText } from "ai"
import { resetRateLimits } from "./rate-limit"
import { handleScopePost } from "./scope"

function jsonRequest(body: unknown, ip = "198.51.100.50") {
  return new Request("http://localhost/api/scope", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  })
}

describe("handleScopePost", () => {
  beforeEach(() => {
    resetRateLimits()
    delete process.env.XAI_API_KEY
    delete process.env.XAI_MODEL
    vi.mocked(generateText).mockClear()
    vi.mocked(generateText).mockResolvedValue({
      text: "Scoped via LLM.",
    } as Awaited<ReturnType<typeof generateText>>)
  })

  afterEach(() => {
    resetRateLimits()
  })

  it("returns rule-based reply without XAI key", async () => {
    const res = await handleScopePost(
      jsonRequest({
        messages: [{ role: "user", content: "I need an MVP in a week" }],
      }),
    )
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.source).toBe("rules")
    expect(data.reply).toMatch(/MVP/i)
    expect(generateText).not.toHaveBeenCalled()
  })

  it("uses consumer XAI key when set", async () => {
    process.env.XAI_API_KEY = "xai_test"
    const res = await handleScopePost(
      jsonRequest({
        messages: [{ role: "user", content: "Design system refresh" }],
      }),
    )
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.source).toBe("xai")
    expect(data.reply).toBe("Scoped via LLM.")
    expect(generateText).toHaveBeenCalledOnce()
  })

  it("falls back to rules when the LLM errors", async () => {
    process.env.XAI_API_KEY = "xai_test"
    vi.mocked(generateText).mockRejectedValueOnce(new Error("provider down"))
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    const res = await handleScopePost(
      jsonRequest({
        messages: [{ role: "user", content: "I need an MVP in a week" }],
      }),
    )
    errSpy.mockRestore()
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.source).toBe("rules-fallback")
    expect(data.reply).toMatch(/MVP/i)
  })

  it("rejects empty messages", async () => {
    const res = await handleScopePost(jsonRequest({ messages: [] }))
    expect(res.status).toBe(400)
  })
})
