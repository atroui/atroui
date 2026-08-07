import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("../lib/og/compose", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../lib/og/compose")>()
  return {
    ...actual,
    composeQuickOg: vi.fn(async () => Buffer.from("jpeg")),
    composeQuickOgPreview: vi.fn(async () => Buffer.from("preview")),
  }
})

import {
  composeQuickOg,
  composeQuickOgPreview,
} from "../lib/og/compose"
import { handleGeneratePost } from "./generate"
import { resetRateLimits } from "./rate-limit"

function jsonRequest(url: string, body: unknown) {
  return new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": "198.51.100.10",
    },
    body: JSON.stringify(body),
  })
}

describe("handleGeneratePost", () => {
  beforeEach(() => {
    resetRateLimits()
    delete process.env.HUGGINGFACE_API_KEY
    delete process.env.GEMINI_API_KEY
    delete process.env.GOOGLE_AI_KEY
    vi.mocked(composeQuickOg).mockClear()
    vi.mocked(composeQuickOgPreview).mockClear()
  })

  afterEach(() => {
    resetRateLimits()
  })

  it("returns preview without AI keys", async () => {
    const res = await handleGeneratePost(
      jsonRequest("http://localhost/api/generate", {
        mode: "quick",
        title: "Ship this week",
        style: "paperQuote",
        previewOnly: true,
      }),
    )
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.imageUrl).toMatch(/^data:image\/jpeg;base64,/)
    expect(composeQuickOgPreview).toHaveBeenCalledOnce()
    expect(composeQuickOg).not.toHaveBeenCalled()
  })

  it("returns 503 for AI quick mode without HF key", async () => {
    const res = await handleGeneratePost(
      jsonRequest("http://localhost/api/generate", {
        mode: "quick",
        title: "Ship this week",
        style: "paperQuote",
      }),
    )
    expect(res.status).toBe(503)
    const data = await res.json()
    expect(data.error).toMatch(/HUGGINGFACE_API_KEY/i)
  })

  it("rejects empty title", async () => {
    const res = await handleGeneratePost(
      jsonRequest("http://localhost/api/generate", {
        mode: "quick",
        title: "  ",
        style: "paperQuote",
        previewOnly: true,
      }),
    )
    expect(res.status).toBe(400)
  })
})
