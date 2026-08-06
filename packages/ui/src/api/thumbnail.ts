import sharp from "sharp"
import {
  InferenceClient,
  InferenceClientProviderApiError,
} from "@huggingface/inference"

import { ThumbnailPipeline } from "../lib/agents/pipeline"
import { generateImagen3 } from "../lib/google-ai"
import {
  ThumbnailInputError,
  composeThumbnail,
  composeThumbnailPreview,
  composeThumbnailWithBackground,
  validateThumbnailInput,
} from "../lib/thumbnail/compose"
import { checkRateLimit } from "./rate-limit"
import {
  bufferToDataUrl,
  clientIp,
  getHfToken,
  getXaiApiKey,
  hasGoogleAiKey,
  jsonError,
  jsonOk,
  readJsonBody,
} from "./shared"

async function hfBackground(prompt: string, hfToken: string): Promise<Buffer> {
  const model =
    process.env.HUGGINGFACE_IMAGE_MODEL?.trim() ||
    "black-forest-labs/FLUX.1-schnell"
  const client = new InferenceClient(hfToken)
  const blob = await client.textToImage(
    {
      model,
      inputs: prompt,
      parameters: {
        width: 1280,
        height: 720,
        num_inference_steps: 4,
        guidance_scale: 0,
      },
    },
    { outputType: "blob" },
  )
  return Buffer.from(await blob.arrayBuffer())
}

function rateLimitThumb(ip: string, preview: boolean) {
  return checkRateLimit(`thumbnail:${preview ? "preview" : "ai"}:${ip}`, {
    limit: preview ? 30 : 5,
    windowMs: 15 * 60 * 1000,
  })
}

/**
 * POST /api/thumbnail - thumbnail workspace.
 * Uses consumer HUGGINGFACE_API_KEY / Google / XAI keys. Never ships keys.
 * previewOnly works without AI keys.
 */
export async function handleThumbnailPost(req: Request): Promise<Response> {
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
  const usePro = data.usePro === true

  const limited = rateLimitThumb(ip, previewOnly)
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
    const validated = validateThumbnailInput(data)

    if (previewOnly) {
      const jpeg = await composeThumbnailPreview(validated)
      return jsonOk({ ok: true, imageUrl: bufferToDataUrl(jpeg) })
    }

    if (usePro) {
      if (!getXaiApiKey()) {
        return jsonError(
          "Pro mode needs XAI_API_KEY for the prompt pipeline.",
          503,
        )
      }
      const hfToken = getHfToken()
      if (!hasGoogleAiKey() && !hfToken) {
        return jsonError(
          "Pro mode needs GEMINI_API_KEY / GOOGLE_AI_KEY or HUGGINGFACE_API_KEY for image generation.",
          503,
        )
      }

      const pipeline = new ThumbnailPipeline()
      const cinematic = await pipeline.generateCinematicPrompt(
        validated.title,
        validated.subtitle,
        validated.badge,
      )

      const background = hasGoogleAiKey()
        ? await generateImagen3({ prompt: cinematic, aspectRatio: "16:9" })
        : await hfBackground(cinematic, hfToken!)

      const jpeg = await composeThumbnailWithBackground(
        validated,
        await sharp(background, { failOn: "none" }).toBuffer(),
      )
      return jsonOk({ ok: true, imageUrl: bufferToDataUrl(jpeg) })
    }

    const hfTokenQuick = getHfToken()
    if (!hfTokenQuick) {
      return jsonError(
        "AI not configured. Set HUGGINGFACE_API_KEY (or use previewOnly).",
        503,
      )
    }

    const jpeg = await composeThumbnail({ ...validated, hfToken: hfTokenQuick })
    return jsonOk({ ok: true, imageUrl: bufferToDataUrl(jpeg) })
  } catch (err) {
    if (err instanceof ThumbnailInputError) {
      return jsonError(err.message, 400)
    }
    if (err instanceof InferenceClientProviderApiError) {
      return jsonError(
        "AI provider limit or error. Try Download Preview or retry later.",
        429,
        {
          message:
            "AI provider limit or error. Try Download Preview or retry later.",
          isLimit: true,
        },
      )
    }
    console.error("[atroui/api/thumbnail]", err)
    const message =
      err instanceof Error ? err.message : "Failed to generate thumbnail"
    if (/not set|not configured|API_KEY|needs /i.test(message)) {
      return jsonError(message, 503)
    }
    return jsonError(message, 502)
  }
}
