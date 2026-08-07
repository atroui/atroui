type Window = { timestamps: number[] }

const memoryStore = new Map<string, Window>()

export type RateLimitOptions = {
  /** Max requests in the window */
  limit: number
  /** Window length in ms */
  windowMs: number
}

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterSec: number }

type RedisCreds = { url: string; token: string }

let productionWarningShown = false

function getRedisCreds(): RedisCreds | null {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL?.trim()
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim()
  if (upstashUrl && upstashToken) {
    return { url: upstashUrl, token: upstashToken }
  }

  // Vercel KV is Upstash-compatible REST.
  const kvUrl = process.env.KV_REST_API_URL?.trim()
  const kvToken = process.env.KV_REST_API_TOKEN?.trim()
  if (kvUrl && kvToken) {
    return { url: kvUrl, token: kvToken }
  }

  return null
}

function warnMemoryInProduction() {
  if (productionWarningShown) return
  if (process.env.VERCEL_ENV !== "production") return
  productionWarningShown = true
  console.warn(
    "[atroui] Rate limiting is in-memory (per instance). Set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (or KV_REST_API_URL + KV_REST_API_TOKEN) for shared limits across instances. See https://www.atroui.com/docs/host-api",
  )
}

function memoryCheck(
  key: string,
  options: RateLimitOptions,
): RateLimitResult {
  const now = Date.now()
  const windowStart = now - options.windowMs
  const entry = memoryStore.get(key) ?? { timestamps: [] }
  entry.timestamps = entry.timestamps.filter((t) => t > windowStart)

  if (entry.timestamps.length >= options.limit) {
    const oldest = entry.timestamps[0] ?? now
    const retryAfterSec = Math.max(
      1,
      Math.ceil((oldest + options.windowMs - now) / 1000),
    )
    memoryStore.set(key, entry)
    return { ok: false, retryAfterSec }
  }

  entry.timestamps.push(now)
  memoryStore.set(key, entry)
  return { ok: true }
}

async function redisPipeline(
  creds: RedisCreds,
  commands: unknown[][],
): Promise<unknown[]> {
  const res = await fetch(creds.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${creds.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Upstash Redis error (${res.status}): ${text.slice(0, 200)}`)
  }
  const payload = (await res.json()) as unknown
  if (!Array.isArray(payload)) {
    throw new Error("Unexpected Upstash Redis response shape")
  }
  return payload.map((item) => {
    if (item && typeof item === "object" && "error" in item) {
      throw new Error(String((item as { error: unknown }).error))
    }
    if (item && typeof item === "object" && "result" in item) {
      return (item as { result: unknown }).result
    }
    return item
  })
}

/**
 * Sliding-window rate limit via Upstash / Vercel KV REST (sorted set).
 * Falls back to memory on Redis errors so forms stay available.
 */
async function redisCheck(
  key: string,
  options: RateLimitOptions,
  creds: RedisCreds,
): Promise<RateLimitResult> {
  const now = Date.now()
  const windowStart = now - options.windowMs
  const redisKey = `atroui:rl:${key}`
  const member = `${now}:${Math.random().toString(36).slice(2, 10)}`

  try {
    // 1) drop expired  2) count  3) peek oldest (for retryAfter)
    const probe = await redisPipeline(creds, [
      ["ZREMRANGEBYSCORE", redisKey, 0, windowStart],
      ["ZCARD", redisKey],
      ["ZRANGE", redisKey, 0, 0, "WITHSCORES"],
    ])

    const count = Number(probe[1] ?? 0)
    if (count >= options.limit) {
      const oldestRow = probe[2]
      let oldest = now
      // Upstash ZRANGE WITHSCORES → ["member", "score"] (flat) or nested.
      if (Array.isArray(oldestRow) && oldestRow.length >= 2) {
        const maybeScore = oldestRow[1]
        if (typeof maybeScore === "string" || typeof maybeScore === "number") {
          oldest = Number(maybeScore) || now
        } else if (Array.isArray(maybeScore) && maybeScore.length >= 2) {
          oldest = Number(maybeScore[1]) || now
        }
      }
      const retryAfterSec = Math.max(
        1,
        Math.ceil((oldest + options.windowMs - now) / 1000),
      )
      return { ok: false, retryAfterSec }
    }

    await redisPipeline(creds, [
      ["ZADD", redisKey, now, member],
      ["PEXPIRE", redisKey, options.windowMs],
    ])
    return { ok: true }
  } catch (err) {
    console.error("[atroui] Redis rate limit failed; falling back to memory", err)
    return memoryCheck(key, options)
  }
}

/**
 * Sliding-window rate limiter.
 * - Default: in-memory (per process) — local / single instance / demos.
 * - When `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` (or Vercel
 *   `KV_REST_API_*`) are set: shared Redis backend for multi-instance hosts.
 */
export async function checkRateLimit(
  key: string,
  options: RateLimitOptions,
): Promise<RateLimitResult> {
  const creds = getRedisCreds()
  if (creds) {
    return redisCheck(key, options, creds)
  }
  warnMemoryInProduction()
  return memoryCheck(key, options)
}

/** Test helper - clear memory buckets between tests. */
export function resetRateLimits() {
  memoryStore.clear()
  productionWarningShown = false
}

/** Test helper - whether Redis/KV env is currently selected. */
export function rateLimitBackend(): "redis" | "memory" {
  return getRedisCreds() ? "redis" : "memory"
}
