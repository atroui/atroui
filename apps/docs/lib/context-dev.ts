/**
 * Server-only Context.dev client. Import this module from Route Handlers,
 * server actions, or Node scripts — never from a Client Component.
 *
 * Docs: https://docs.context.dev
 */
import ContextDev, { APIError } from "context.dev"

if (typeof window !== "undefined") {
  throw new Error("lib/context-dev is server-only — it holds CONTEXT_DEV_API_KEY")
}

type SearchParams = Parameters<ContextDev["web"]["search"]>[0]
type ScrapeParams = Parameters<ContextDev["web"]["webScrapeMd"]>[0]
type StyleguideParams = Parameters<ContextDev["web"]["extractStyleguide"]>[0]

let client: ContextDev | null = null

function getClient() {
  if (client) return client
  const apiKey = process.env.CONTEXT_DEV_API_KEY
  if (!apiKey) {
    throw new Error(
      "CONTEXT_DEV_API_KEY is missing. Add it to apps/docs/.env.local (local) or the host env (Vercel)."
    )
  }
  client = new ContextDev({ apiKey })
  return client
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function retryAfterMs(err: APIError): number | null {
  const raw = err.headers?.get("retry-after")
  if (!raw) return null
  const seconds = Number(raw)
  if (!Number.isFinite(seconds) || seconds < 0) return null
  return seconds * 1000
}

function isRetryable(err: unknown): err is APIError {
  if (!(err instanceof APIError) || err.status == null) return false
  return err.status === 408 || err.status === 429 || err.status >= 500
}

async function withRetry<T>(fn: () => Promise<T>, maxAttempts = 3): Promise<T> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (err) {
      const last = attempt === maxAttempts - 1
      if (!isRetryable(err) || last) throw err
      const wait =
        err.status === 429
          ? (retryAfterMs(err) ?? 2 ** attempt * 1000)
          : 2 ** attempt * 1000
      await sleep(wait)
    }
  }
  throw new Error("unreachable")
}

/** POST /web/search — 1 credit per 10 results. */
export function searchWeb(params: SearchParams) {
  return withRetry(() => getClient().web.search(params))
}

/** GET /web/scrape/markdown — 1 credit (2 with actions). */
export function scrapeMarkdown(params: ScrapeParams) {
  return withRetry(() => getClient().web.webScrapeMd(params))
}

/** GET /web/styleguide — 10 credits. */
export function extractStyleguide(params: StyleguideParams) {
  return withRetry(() => getClient().web.extractStyleguide(params))
}
