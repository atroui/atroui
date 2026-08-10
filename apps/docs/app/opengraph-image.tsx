import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "AtroUI - React component library at atroui.com"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpenGraphImage() {
  let fontBold: ArrayBuffer
  let fontMedium: ArrayBuffer

  try {
    fontBold = await fetch(
      new URL("../../../packages/ui/src/lib/og/fonts/Inter-Bold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer())
  } catch {
    fontBold = await fetch(
      "https://api.fontsource.org/v1/fonts/inter/latin-700-normal.ttf"
    ).then((res) => res.arrayBuffer())
  }

  try {
    fontMedium = await fetch(
      new URL("../../../packages/ui/src/lib/og/fonts/Inter-Medium.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer())
  } catch {
    fontMedium = await fetch(
      "https://api.fontsource.org/v1/fonts/inter/latin-500-normal.ttf"
    ).then((res) => res.arrayBuffer())
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          background: "#050505",
          padding: "64px 72px",
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          overflow: "hidden",
        }}
      >
        {/* Glow/Light effect behind the right side content */}
        <div
          style={{
            position: "absolute",
            right: "-200px",
            top: "-200px",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(11,123,255,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Brand outline accents */}
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
            flexDirection: "row",
            width: "100%",
            height: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left Block - Brand Information */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              width: "620px",
            }}
          >
            {/* Header: Logo + Name */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#0a0a0a",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
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
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                AtroUI
              </div>
            </div>

            {/* Core Message */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginTop: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    background: "rgba(11,123,255,0.1)",
                    border: "1px solid rgba(11,123,255,0.25)",
                    borderRadius: "6px",
                    padding: "4px 10px",
                    fontSize: 12,
                    color: "#0b7bff",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Tailwind v4 Ready
                </span>
                <span
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "6px",
                    padding: "4px 10px",
                    fontSize: 12,
                    color: "#a3a3a3",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  shadcn CLI
                </span>
              </div>
              <div
                style={{
                  color: "#fafafa",
                  fontSize: 54,
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.1,
                }}
              >
                Own the UI.
                <br />
                Borrow the API.
              </div>
              <div
                style={{
                  color: "#a3a3a3",
                  fontSize: 22,
                  fontWeight: 400,
                  lineHeight: 1.4,
                  marginTop: 4,
                  maxWidth: "540px",
                }}
              >
                Production React sections and secure Host APIs. Copy-paste directly
                into your repository.
              </div>
            </div>

            {/* CLI Command Footer */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                marginTop: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "#0e0e0e",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12,
                  padding: "14px 20px",
                  width: "480px",
                }}
              >
                <span style={{ color: "#0b7bff", fontWeight: 700, fontSize: 16 }}>
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
                  npx shadcn add @atroui/home-hero
                </span>
              </div>
            </div>
          </div>

          {/* Right Block - Visual Interface Component Preview */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <div
              style={{
                width: "400px",
                height: "380px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: "rgba(20,20,20,0.7)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "28px",
                boxShadow: "0 24px 80px rgba(0,0,0,0.8)",
              }}
            >
              {/* Window chrome header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  paddingBottom: "16px",
                }}
              >
                <div style={{ display: "flex", gap: 6 }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.15)",
                    }}
                  />
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.15)",
                    }}
                  />
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.15)",
                    }}
                  />
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontWeight: 500,
                  }}
                >
                  atroui.com
                </div>
              </div>

              {/* Theme Toggle Element */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontWeight: 600,
                  }}
                >
                  Component Preview
                </span>
                <div
                  style={{
                    display: "flex",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                    padding: 4,
                    gap: 4,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "8px 0",
                      borderRadius: 7,
                      background: "rgba(255,255,255,0.08)",
                      color: "#ffffff",
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    Dark
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "8px 0",
                      borderRadius: 7,
                      color: "rgba(255,255,255,0.35)",
                      fontSize: 13,
                    }}
                  >
                    Light
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "8px 0",
                      borderRadius: 7,
                      color: "rgba(255,255,255,0.35)",
                      fontSize: 13,
                    }}
                  >
                    System
                  </div>
                </div>
              </div>

              {/* Inner card panel preview */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.01)",
                  borderRadius: 12,
                  padding: "12px 16px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span
                    style={{
                      color: "#ffffff",
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    contact-form
                  </span>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: 10,
                    }}
                  >
                    With SMTP Host API
                  </span>
                </div>
                <div
                  style={{
                    background: "#0b7bff",
                    color: "#ffffff",
                    padding: "6px 12px",
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                >
                  Copy component
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [
      {
        name: "Inter",
        data: fontBold,
        weight: 700,
        style: "normal",
      },
      {
        name: "Inter",
        data: fontMedium,
        weight: 500,
        style: "normal",
      },
    ] }
  )
}
