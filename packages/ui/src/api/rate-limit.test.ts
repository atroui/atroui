import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import {
  checkRateLimit,
  rateLimitBackend,
  resetRateLimits,
} from "./rate-limit"

describe("checkRateLimit (memory)", () => {
  beforeEach(() => {
    resetRateLimits()
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
    delete process.env.KV_REST_API_URL
    delete process.env.KV_REST_API_TOKEN
    delete process.env.VERCEL_ENV
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2026-08-07T05:00:00.000Z"))
  })

  afterEach(() => {
    resetRateLimits()
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
    delete process.env.KV_REST_API_URL
    delete process.env.KV_REST_API_TOKEN
    delete process.env.VERCEL_ENV
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it("selects memory when Redis env is unset", () => {
    expect(rateLimitBackend()).toBe("memory")
  })

  it("allows requests under the limit", async () => {
    expect(await checkRateLimit("k", { limit: 2, windowMs: 60_000 })).toEqual({
      ok: true,
    })
    expect(await checkRateLimit("k", { limit: 2, windowMs: 60_000 })).toEqual({
      ok: true,
    })
  })

  it("blocks when the limit is reached and returns retryAfterSec", async () => {
    await checkRateLimit("k", { limit: 2, windowMs: 60_000 })
    await checkRateLimit("k", { limit: 2, windowMs: 60_000 })
    const blocked = await checkRateLimit("k", { limit: 2, windowMs: 60_000 })
    expect(blocked.ok).toBe(false)
    if (!blocked.ok) {
      expect(blocked.retryAfterSec).toBeGreaterThanOrEqual(1)
      expect(blocked.retryAfterSec).toBeLessThanOrEqual(60)
    }
  })

  it("isolates keys", async () => {
    await checkRateLimit("a", { limit: 1, windowMs: 60_000 })
    expect((await checkRateLimit("a", { limit: 1, windowMs: 60_000 })).ok).toBe(
      false,
    )
    expect((await checkRateLimit("b", { limit: 1, windowMs: 60_000 })).ok).toBe(
      true,
    )
  })

  it("expires timestamps outside the window", async () => {
    await checkRateLimit("k", { limit: 1, windowMs: 10_000 })
    expect((await checkRateLimit("k", { limit: 1, windowMs: 10_000 })).ok).toBe(
      false,
    )

    vi.advanceTimersByTime(10_001)
    expect((await checkRateLimit("k", { limit: 1, windowMs: 10_000 })).ok).toBe(
      true,
    )
  })

  it("warns once in Vercel production without a shared store", async () => {
    process.env.VERCEL_ENV = "production"
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    await checkRateLimit("prod", { limit: 5, windowMs: 60_000 })
    await checkRateLimit("prod", { limit: 5, windowMs: 60_000 })
    expect(warn).toHaveBeenCalledOnce()
    expect(String(warn.mock.calls[0]?.[0])).toMatch(/in-memory/i)
    warn.mockRestore()
  })
})

describe("checkRateLimit (Upstash / KV)", () => {
  beforeEach(() => {
    resetRateLimits()
    process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io"
    process.env.UPSTASH_REDIS_REST_TOKEN = "token"
    delete process.env.KV_REST_API_URL
    delete process.env.KV_REST_API_TOKEN
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2026-08-07T05:00:00.000Z"))
  })

  afterEach(() => {
    resetRateLimits()
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
    delete process.env.KV_REST_API_URL
    delete process.env.KV_REST_API_TOKEN
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it("selects redis when Upstash env is set", () => {
    expect(rateLimitBackend()).toBe("redis")
  })

  it("allows then blocks via Redis pipeline responses", async () => {
    const fetchMock = vi
      .fn()
      // first request: empty card → allow, then ZADD
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify([{ result: 0 }, { result: 0 }, { result: [] }]),
          { status: 200 },
        ),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify([{ result: 1 }, { result: 1 }]), {
          status: 200,
        }),
      )
      // second request: card already at limit
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify([
            { result: 0 },
            { result: 1 },
            { result: ["old", String(Date.now())] },
          ]),
          { status: 200 },
        ),
      )

    vi.stubGlobal("fetch", fetchMock)

    const first = await checkRateLimit("user", { limit: 1, windowMs: 60_000 })
    expect(first).toEqual({ ok: true })
    expect(fetchMock).toHaveBeenCalled()

    const second = await checkRateLimit("user", { limit: 1, windowMs: 60_000 })
    expect(second.ok).toBe(false)
    if (!second.ok) {
      expect(second.retryAfterSec).toBeGreaterThanOrEqual(1)
    }
  })

  it("falls back to memory when Redis errors", async () => {
    const fetchMock = vi.fn(async () => new Response("nope", { status: 500 }))
    vi.stubGlobal("fetch", fetchMock)
    const err = vi.spyOn(console, "error").mockImplementation(() => {})

    const a = await checkRateLimit("fb", { limit: 1, windowMs: 60_000 })
    const b = await checkRateLimit("fb", { limit: 1, windowMs: 60_000 })
    expect(a).toEqual({ ok: true })
    expect(b.ok).toBe(false)
    expect(err).toHaveBeenCalled()
    err.mockRestore()
  })

  it("accepts Vercel KV env aliases", () => {
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
    process.env.KV_REST_API_URL = "https://kv.example"
    process.env.KV_REST_API_TOKEN = "kv_token"
    expect(rateLimitBackend()).toBe("redis")
  })
})
