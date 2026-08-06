import { generateText } from "ai"
import { xai } from "@ai-sdk/xai"
import { z } from "zod"

import {
  getRuleBasedScopeReply,
  type ScopeMessage,
} from "../lib/scope-chat"
import { checkRateLimit } from "./rate-limit"
import {
  clientIp,
  getXaiApiKey,
  jsonError,
  jsonOk,
  readJsonBody,
} from "./shared"

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(4000),
})

const scopeSchema = z.object({
  messages: z.array(messageSchema).min(1).max(40),
})

/**
 * POST /api/scope - scope chat.
 * Without XAI_API_KEY: deterministic rule-based reply (no keys required).
 * With XAI_API_KEY: short LLM reply via the consumer's key.
 */
export async function handleScopePost(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return jsonError("Method not allowed", 405)
  }

  const ip = clientIp(req)
  const limited = checkRateLimit(`scope:${ip}`, {
    limit: 30,
    windowMs: 15 * 60 * 1000,
  })
  if (!limited.ok) {
    return jsonError(
      `Too many requests. Try again in ${limited.retryAfterSec}s.`,
      429,
    )
  }

  const body = await readJsonBody(req)
  if (!body.ok) return body.response

  const parsed = scopeSchema.safeParse(body.data)
  if (!parsed.success) {
    return jsonError("Invalid messages payload", 400)
  }

  const messages = parsed.data.messages as ScopeMessage[]
  const xaiKey = getXaiApiKey()

  if (!xaiKey) {
    return jsonOk({
      ok: true,
      reply: getRuleBasedScopeReply(messages),
      source: "rules",
    })
  }

  try {
    const transcript = messages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n")
    const { text } = await generateText({
      model: xai(process.env.XAI_MODEL || "grok-4-1-fast-non-reasoning"),
      system:
        "You are AtroUI's scoping assistant. Recommend fixed-price packages " +
        "(MVP Sprint, AI Integration, Design System, Full-Stack). Be concise. " +
        "Use markdown sparingly. Suggest /planner or /contact when useful.",
      prompt: transcript,
      maxOutputTokens: 400,
    })
    return jsonOk({
      ok: true,
      reply: text.trim() || getRuleBasedScopeReply(messages),
      source: "xai",
    })
  } catch (err) {
    console.error("[atroui/api/scope]", err)
    return jsonOk({
      ok: true,
      reply: getRuleBasedScopeReply(messages),
      source: "rules-fallback",
    })
  }
}
