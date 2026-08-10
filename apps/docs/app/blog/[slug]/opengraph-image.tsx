import { ImageResponse } from "next/og"
import { loadOgFonts } from "atroui/lib/og/load-fonts"
import { getPost } from "@/lib/blog"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

type Props = { params: Promise<{ slug: string }> }

export default async function Image({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  const title = post?.title ?? "AtroUI Blog"
  const description = post?.description ?? "Guides for owning UI with the shadcn CLI."
  const dateStr = post?.date ? new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }) : "Recent Article"

  const { bold: fontBold, medium: fontMedium } = loadOgFonts()

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
              "radial-gradient(circle, rgba(11,123,255,0.05) 0%, transparent 70%)",
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
          {/* Left Block - Blog Information */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              width: "650px",
            }}
          >
            {/* Header: Logo + Name + Blog label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
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
                <svg width="24" height="28" viewBox="0 0 48 48" fill="none">
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
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
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
                <span
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    fontSize: 22,
                    fontWeight: 400,
                  }}
                >
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
                  Blog
                </span>
              </div>
            </div>

            {/* Core Message: Category, Title, Description */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginTop: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
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
                  Engineering Log
                </span>
              </div>
              <div
                style={{
                  color: "#ffffff",
                  fontSize: 44,
                  fontWeight: 700,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.15,
                  maxWidth: "630px",
                }}
              >
                {title}
              </div>
              <div
                style={{
                  color: "#a3a3a3",
                  fontSize: 20,
                  fontWeight: 400,
                  lineHeight: 1.45,
                  maxWidth: "600px",
                  marginTop: 4,
                }}
              >
                {description.length > 155
                  ? `${description.slice(0, 152)}…`
                  : description}
              </div>
            </div>

            {/* Footer with publication meta */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                color: "rgba(255,255,255,0.4)",
                fontSize: 14,
                fontWeight: 500,
                marginTop: 20,
              }}
            >
              <span>{dateStr}</span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
              <span style={{ color: "#0b7bff" }}>atroui.com</span>
            </div>
          </div>

          {/* Right Block - Visual Card Graphic representing an Article */}
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
                width: "360px",
                height: "380px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: "rgba(15,15,15,0.8)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "28px",
                boxShadow: "0 24px 80px rgba(0,0,0,0.8)",
              }}
            >
              {/* Card Header styling */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  paddingBottom: "14px",
                }}
              >
                <span
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontWeight: 600,
                  }}
                >
                  atroui / studio
                </span>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#0b7bff",
                  }}
                />
              </div>

              {/* Graphic container layout */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  margin: "12px 0",
                }}
              >
                {/* Horizontal row simulations representing read text paragraphs */}
                <div
                  style={{
                    width: "100%",
                    height: "10px",
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.08)",
                  }}
                />
                <div
                  style={{
                    width: "85%",
                    height: "10px",
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.08)",
                  }}
                />
                <div
                  style={{
                    width: "92%",
                    height: "10px",
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.08)",
                  }}
                />

                {/* Simulated interactive visual toggle preview */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.02)",
                    padding: "12px 14px",
                    marginTop: 8,
                  }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: "rgba(11,123,255,0.3)",
                      border: "1px solid #0b7bff",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        width: "80px",
                        height: "8px",
                        borderRadius: 2,
                        background: "#fafafa",
                      }}
                    />
                    <div
                      style={{
                        width: "140px",
                        height: "6px",
                        borderRadius: 2,
                        background: "rgba(255,255,255,0.3)",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Button inside card */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(11,123,255,0.25)",
                  background: "rgba(11,123,255,0.1)",
                  borderRadius: 10,
                  padding: "10px",
                  color: "#0b7bff",
                  fontSize: 13,
                  fontWeight: 600,
                  width: "100%",
                }}
              >
                Read full article
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
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
      ],
    }
  )
}
