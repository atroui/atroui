import sharp from "sharp"
import {
  InferenceClient,
  InferenceClientProviderApiError,
} from "@huggingface/inference"

import {
  ComposeInputError,
  composeQuickOg,
  composeQuickOgPreview,
  validateComposeInput,
} from "../lib/og/compose"
import { generateImagen3 } from "../lib/google-ai"
import { checkRateLimit } from "./rate-limit"
import {
  bufferToDataUrl,
  clientIp,
  getHfToken,
  hasGoogleAiKey,
  jsonError,
  jsonOk,
  readJsonBody,
} from "./shared"

const OG_W = 1200
const OG_H = 630
const PROMPT_MAX = 2000

function rateLimitAi(ip: string, preview: boolean) {
  return checkRateLimit(`generate:${preview ? "preview" : "ai"}:${ip}`, {
    limit: preview ? 30 : 5,
    windowMs: 15 * 60 * 1000,
  })
}

async function freeformImage(prompt: string): Promise<Buffer> {
  if (hasGoogleAiKey()) {
    const buf = await generateImagen3({
      prompt,
      aspectRatio: "16:9",
    })
    return sharp(buf)
      .resize(OG_W, OG_H, { fit: "cover" })
      .jpeg({ quality: 92, mozjpeg: true })
      .toBuffer()
  }

  const hfToken = getHfToken()
  if (!hfToken) {
    throw new Error(
      "Set HUGGINGFACE_API_KEY or GEMINI_API_KEY / GOOGLE_AI_KEY for prompt mode",
    )
  }

  const model =
    process.env.HUGGINGFACE_IMAGE_MODEL?.trim() ||
    "black-forest-labs/FLUX.1-schnell"
  const client = new InferenceClient(hfToken)
  const blob = await client.textToImage(
    {
      model,
      inputs: prompt,
      parameters: {
        width: 1216,
        height: 640,
        num_inference_steps: 4,
        guidance_scale: 0,
      },
    },
    { outputType: "blob" },
  )
  const raw = Buffer.from(await blob.arrayBuffer())
  return sharp(raw, { failOn: "none" })
    .resize(OG_W, OG_H, { fit: "cover" })
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer()
}

/**
 * POST /api/generate - OG workspace.
 * Uses the consumer's HUGGINGFACE_API_KEY / Google AI keys. Never ships keys.
 * previewOnly quick mode works without AI keys (CSS/gradient composite).
 */
export async function handleGeneratePost(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return jsonError("Method not allowed", 405)
  }

  const ip = clientIp(req)
  const body = await readJsonBody(req)
  if (!body.ok) return body.response

  const raw = body.data
  if (typeof raw !== "object" || raw === null) {
    return jsonError("Invalid body", 400)
  }
  const data = raw as Record<string, unknown>
  const previewOnly = data.previewOnly === true

  const limited = await rateLimitAi(ip, previewOnly)
  if (!limited.ok) {
    return jsonError(
      `Too many requests. Try again in ${limited.retryAfterSec}s.`,
      429,
      {
        message: `Too many requests. Try again in ${limited.retryAfterSec}s.`,
        isLimit: true,
      },
    )
  }

  try {
    // Freeform prompt mode (no mode: "quick")
    if (typeof data.prompt === "string" && data.mode !== "quick") {
      const prompt = data.prompt.trim()
      if (!prompt) return jsonError("prompt is required", 400)
      if (prompt.length > PROMPT_MAX) {
        return jsonError(`prompt must be ${PROMPT_MAX} characters or fewer`, 400)
      }
      if (!getHfToken() && !hasGoogleAiKey()) {
        return jsonError(
          "AI not configured. Set HUGGINGFACE_API_KEY or GEMINI_API_KEY in your env.",
          503,
        )
      }
      const jpeg = await freeformImage(prompt)
      return jsonOk({ ok: true, imageUrl: bufferToDataUrl(jpeg) })
    }

    const validated = validateComposeInput(data)

    if (previewOnly || data.previewOnly === true) {
      const jpeg = await composeQuickOgPreview(validated)
      return jsonOk({ ok: true, imageUrl: bufferToDataUrl(jpeg) })
    }

    const hfToken = getHfToken()
    if (!hfToken) {
      return jsonError(
        "AI not configured. Set HUGGINGFACE_API_KEY for quick OG generation (or use previewOnly).",
        503,
      )
    }

    const jpeg = await composeQuickOg({ ...validated, hfToken })
    return jsonOk({ ok: true, imageUrl: bufferToDataUrl(jpeg) })
  } catch (err) {
    if (err instanceof ComposeInputError) {
      return jsonError(err.message, 400)
    }
    if (err instanceof InferenceClientProviderApiError) {
      return jsonError(
        "AI provider limit or error. Try preview-only download or retry later.",
        429,
        {
          message:
            "AI provider limit or error. Try preview-only download or retry later.",
          isLimit: true,
        },
      )
    }
    console.error("[atroui/api/generate]", err)
    const message =
      err instanceof Error ? err.message : "Failed to generate image"
    if (/not set|not configured|API_KEY/i.test(message)) {
      return jsonError(message, 503)
    }
    return jsonError(message, 502)
  }
}
