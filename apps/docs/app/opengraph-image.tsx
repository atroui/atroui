import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "AtroUI - React component library at atroui.com"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "64px 72px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#0a0a0a",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
              <path
                d="M14 36 L24 10 L34 36"
                stroke="#fafafa"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="17.5"
                y="24.3"
                width="13"
                height="3.6"
                rx="1.8"
                fill="#0b7bff"
              />
            </svg>
          </div>
          <div
            style={{
              color: "#fafafa",
              fontSize: 36,
              fontWeight: 600,
              letterSpacing: "-0.03em",
            }}
          >
            AtroUI
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              color: "#fafafa",
              fontSize: 64,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            React component library
          </div>
          <div
            style={{
              color: "#a3a3a3",
              fontSize: 28,
              fontWeight: 400,
              maxWidth: 720,
              lineHeight: 1.35,
            }}
          >
            Dark-first design system for Next.js - atroui.com
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#737373",
            fontSize: 22,
          }}
        >
          <span>npm i atroui</span>
          <span style={{ color: "#0b7bff" }}>atroui.com</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
