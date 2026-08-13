import { ImageResponse } from "next/og"
import {
  QUICK_INPUT_LIMITS,
  STYLE_PRESETS,
  isStyleKey,
  type StyleKey,
} from "atroui/lib/og/presets"
import { INTER_BOLD, INTER_MEDIUM } from "atroui/lib/og/font-data"

/**
 * Vercel-safe Quick preview: next/og (Edge-proven) instead of
 * satori+sharp in the Host API package (those were HTML-500ing on live).
 */
export async function buildDocsOgPreviewResponse(input: {
  title: string
  subtitle?: string
  style: StyleKey
}): Promise<Response> {
  const preset = STYLE_PRESETS[input.style]
  const title = input.title.slice(0, QUICK_INPUT_LIMITS.titleMax)
  const subtitle = input.subtitle?.slice(0, QUICK_INPUT_LIMITS.subtitleMax)

  const pngResponse = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent:
            preset.safeZone === "lowerThird" ? "flex-end" : "center",
          alignItems:
            preset.safeZone === "center" ? "center" : "flex-start",
          padding: 80,
          background: preset.previewGradient,
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems:
              preset.safeZone === "center" ? "center" : "flex-start",
            maxWidth: preset.safeZone === "center" ? 960 : 880,
          }}
        >
          <div
            style={{
              display: "flex",
              color: preset.palette.title,
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              textAlign: preset.safeZone === "center" ? "center" : "left",
              whiteSpace: "pre-wrap",
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                display: "flex",
                marginTop: 20,
                color: hex8ToRgba(preset.palette.subtitle),
                fontSize: 28,
                fontWeight: 500,
                lineHeight: 1.35,
                textAlign: preset.safeZone === "center" ? "center" : "left",
                whiteSpace: "pre-wrap",
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: INTER_BOLD, weight: 700, style: "normal" },
        { name: "Inter", data: INTER_MEDIUM, weight: 500, style: "normal" },
      ],
    },
  )

  const png = Buffer.from(await pngResponse.arrayBuffer())
  const imageUrl = `data:image/png;base64,${png.toString("base64")}`
  return Response.json({ ok: true, imageUrl })
}

/** next/og is happier with rgba() than 8-digit hex. */
function hex8ToRgba(color: string): string {
  const m = /^#([0-9a-fA-F]{8})$/.exec(color.trim())
  if (!m) return color
  const hex = m[1]!
  const r = Number.parseInt(hex.slice(0, 2), 16)
  const g = Number.parseInt(hex.slice(2, 4), 16)
  const b = Number.parseInt(hex.slice(4, 6), 16)
  const a = Number.parseInt(hex.slice(6, 8), 16) / 255
  return `rgba(${r},${g},${b},${Number(a.toFixed(3))})`
}

export function parseDocsQuickPreview(
  raw: unknown,
):
  | { ok: true; title: string; subtitle?: string; style: StyleKey }
  | { ok: false; error: string; status: number } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "Invalid body", status: 400 }
  }
  const data = raw as Record<string, unknown>
  const title = typeof data.title === "string" ? data.title.trim() : ""
  if (!title) return { ok: false, error: "title is required", status: 400 }
  if (title.length > QUICK_INPUT_LIMITS.titleMax) {
    return {
      ok: false,
      error: `title must be ${QUICK_INPUT_LIMITS.titleMax} characters or fewer`,
      status: 400,
    }
  }
  let subtitle: string | undefined
  if (typeof data.subtitle === "string" && data.subtitle.trim()) {
    subtitle = data.subtitle.trim()
    if (subtitle.length > QUICK_INPUT_LIMITS.subtitleMax) {
      return {
        ok: false,
        error: `subtitle must be ${QUICK_INPUT_LIMITS.subtitleMax} characters or fewer`,
        status: 400,
      }
    }
  }
  const style = data.style
  if (typeof style !== "string" || !isStyleKey(style)) {
    return {
      ok: false,
      error: "style is required and must be a valid preset",
      status: 400,
    }
  }
  return { ok: true, title, subtitle, style }
}
