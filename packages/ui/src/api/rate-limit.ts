type Window = { timestamps: number[] }

const store = new Map<string, Window>()

export type RateLimitOptions = {
  /** Max requests in the window */
  limit: number
  /** Window length in ms */
  windowMs: number
}

/**
 * In-memory sliding-window rate limiter (per process).
 * For multi-instance production, swap for Upstash / Vercel KV.
 */
export function checkRateLimit(
  key: string,
  options: RateLimitOptions,
): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now()
  const windowStart = now - options.windowMs
  const entry = store.get(key) ?? { timestamps: [] }
  entry.timestamps = entry.timestamps.filter((t) => t > windowStart)

  if (entry.timestamps.length >= options.limit) {
    const oldest = entry.timestamps[0] ?? now
    const retryAfterSec = Math.max(
      1,
      Math.ceil((oldest + options.windowMs - now) / 1000),
    )
    store.set(key, entry)
    return { ok: false, retryAfterSec }
  }

  entry.timestamps.push(now)
  store.set(key, entry)
  return { ok: true }
}

/** Test helper - clear buckets between tests. */
export function resetRateLimits() {
  store.clear()
}
