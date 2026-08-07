import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("../lib/thumbnail/compose", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("../lib/thumbnail/compose")>()
  return {
    ...actual,
    composeThumbnailPreview: vi.fn(async () => Buffer.from("preview")),
    composeThumbnail: vi.fn(async () => Buffer.from("ai")),
    composeThumbnailWithBackground: vi.fn(async () => Buffer.from("pro")),
  }
})

import {
  composeThumbnail,
  composeThumbnailPreview,
} from "../lib/thumbnail/compose"
import { resetRateLimits } from "./rate-limit"
import { handleThumbnailPost } from "./thumbnail"

function jsonRequest(body: unknown, ip = "198.51.100.40") {
  return new Request("http://localhost/api/thumbnail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  })
}

const base = {
  title: "Ship this week",
  style: "youtubePop",
}

describe("handleThumbnailPost", () => {
  beforeEach(() => {
    resetRateLimits()
    delete process.env.HUGGINGFACE_API_KEY
    delete process.env.GEMINI_API_KEY
    delete process.env.GOOGLE_AI_KEY
    delete process.env.GOOGLE_AI_API_KEY
    delete process.env.XAI_API_KEY
    vi.mocked(composeThumbnailPreview).mockClear()
    vi.mocked(composeThumbnail).mockClear()
  })

  afterEach(() => {
    resetRateLimits()
  })

  it("returns preview without AI keys", async () => {
    const res = await handleThumbnailPost(
      jsonRequest({ ...base, previewOnly: true }),
    )
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.imageUrl).toMatch(/^data:image\/jpeg;base64,/)
    expect(composeThumbnailPreview).toHaveBeenCalledOnce()
    expect(composeThumbnail).not.toHaveBeenCalled()
  })

  it("returns 503 for AI mode without HF key", async () => {
    const res = await handleThumbnailPost(jsonRequest(base))
    expect(res.status).toBe(503)
    const data = await res.json()
    expect(data.error).toMatch(/HUGGINGFACE_API_KEY/i)
  })

  it("returns 503 for Pro mode without XAI key", async () => {
    process.env.HUGGINGFACE_API_KEY = "hf_test"
    const res = await handleThumbnailPost(jsonRequest({ ...base, usePro: true }))
    expect(res.status).toBe(503)
    const data = await res.json()
    expect(data.error).toMatch(/XAI_API_KEY/i)
  })

  it("rejects missing title", async () => {
    const res = await handleThumbnailPost(
      jsonRequest({ style: "youtubePop", previewOnly: true, title: "  " }),
    )
    expect(res.status).toBe(400)
  })

  it("rejects invalid style", async () => {
    const res = await handleThumbnailPost(
      jsonRequest({
        title: "Hello",
        style: "not-a-preset",
        previewOnly: true,
      }),
    )
    expect(res.status).toBe(400)
  })

  it("calls composeThumbnail when HF key is set", async () => {
    process.env.HUGGINGFACE_API_KEY = "hf_test"
    const res = await handleThumbnailPost(jsonRequest(base))
    expect(res.status).toBe(200)
    expect(composeThumbnail).toHaveBeenCalledOnce()
    expect(composeThumbnailPreview).not.toHaveBeenCalled()
  })
})
