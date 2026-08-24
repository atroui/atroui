import { ImageResponse } from "next/og"
import { loadOgFonts } from "atroui/lib/og/load-fonts"

export const OG_SIZE = { width: 1200, height: 630 } as const

export type ShareOgFields = {
  eyebrow: string
  title: string
  description: string
  path: string
}

export function clipOgText(value: string, max: number): string {
  const text = value.replace(/\s+/g, " ").trim()
  if (text.length <= max) return text
  return `${text.slice(0, Math.max(0, max - 1)).trimEnd()}…`
}

export function eyebrowForPath(path: string): string {
  const p = path.split("?")[0] ?? "/"
  if (p === "/" || p === "") return "Home"
  if (p === "/blog" || p.startsWith("/blog/")) return "Blog"
  if (p.startsWith("/docs/components/")) return "Component"
  if (p.startsWith("/docs/collections/")) return "Collection"
  if (p.startsWith("/docs/glossary/")) return "Glossary"
  if (p.startsWith("/docs/guides/")) return "Guide"
  if (p.startsWith("/docs")) return "Docs"
  if (p.startsWith("/og") || p.startsWith("/planner") || p.startsWith("/thumbnail")) {
    return "Tool"
  }
  if (p.startsWith("/updates")) return "Updates"
  return "AtroUI"
}

/**
 * Path-only OG URL. LinkedIn, X, Discord, and Facebook often skip
 * query-string image URLs; this stays a clean HTTPS path.
 */
export function shareOgImagePath(path: string): string {
  const p = path.split("?")[0] ?? "/"
  const normalized = p.startsWith("/") ? p : `/${p}`
  if (normalized === "/" || normalized === "") return "/opengraph-image"
  const trimmed =
    normalized.length > 1 && normalized.endsWith("/")
      ? normalized.slice(0, -1)
      : normalized
  return `/og-card${trimmed}`
}

function AtroMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path
        d="M14 36 L24 10 L34 36"
        stroke="#fafafa"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="17.5" y="24.3" width="13" height="3.6" rx="1.8" fill="#0b7bff" />
    </svg>
  )
}

function ShareOgMarkup({ eyebrow, title, description, path }: ShareOgFields) {
  const displayPath = path === "/" ? "atroui.com" : `atroui.com${path}`
  const titleSize = title.length > 52 ? 40 : title.length > 32 ? 46 : 52

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        position: "relative",
        background: "#050505",
        padding: "56px 64px",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: "-180px",
          top: "-180px",
          width: "720px",
          height: "720px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(11,123,255,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "6px",
          background: "#0b7bff",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#0a0a0a",
              }}
            >
              <AtroMark />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  color: "#fafafa",
                  fontSize: 26,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                AtroUI
              </span>
              <span style={{ color: "rgba(255,255,255,0.28)", fontSize: 22 }}>
                /
              </span>
              <span
                style={{
                  color: "#0b7bff",
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                {eyebrow}
              </span>
            </div>
          </div>
          <span
            style={{
              background: "rgba(11,123,255,0.1)",
              border: "1px solid rgba(11,123,255,0.28)",
              borderRadius: 6,
              padding: "5px 12px",
              fontSize: 12,
              color: "#0b7bff",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: 1040,
          }}
        >
          <div
            style={{
              color: "#ffffff",
              fontSize: titleSize,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.12,
            }}
          >
            {title}
          </div>
          {description ? (
            <div
              style={{
                color: "#a3a3a3",
                fontSize: 22,
                fontWeight: 400,
                lineHeight: 1.4,
                maxWidth: 920,
              }}
            >
              {description}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#0e0e0e",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              padding: "12px 18px",
            }}
          >
            <span style={{ color: "#0b7bff", fontWeight: 700, fontSize: 15 }}>
              $
            </span>
            <span
              style={{
                color: "#ffffff",
                fontFamily: "ui-monospace, monospace",
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              npx shadcn add @atroui/…
            </span>
          </div>
          <span
            style={{
              color: "rgba(255,255,255,0.42)",
              fontSize: 16,
              fontWeight: 500,
              fontFamily: "ui-monospace, monospace",
            }}
          >
            {displayPath}
          </span>
        </div>
      </div>
    </div>
  )
}

export async function renderShareOgImage(input: ShareOgFields) {
  const { bold: fontBold, medium: fontMedium } = loadOgFonts()
  return new ImageResponse(
    <ShareOgMarkup
      eyebrow={clipOgText(input.eyebrow, 24)}
      title={clipOgText(input.title, 90)}
      description={clipOgText(input.description, 180)}
      path={input.path}
    />,
    {
      ...OG_SIZE,
      fonts: [
        { name: "Inter", data: fontBold, weight: 700, style: "normal" },
        { name: "Inter", data: fontMedium, weight: 500, style: "normal" },
      ],
    }
  )
}
