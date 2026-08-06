import { ImageResponse } from "next/og"
import { getPost } from "@/lib/blog"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

type Props = { params: Promise<{ slug: string }> }

export default async function Image({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  const title = post?.title ?? "AtroUI Blog"
  const description = post?.description ?? "Guides for owning UI with the shadcn CLI."

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
          color: "#fafafa",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          <div
            style={{
              width: 14,
              height: 40,
              background: "#0b7bff",
              borderRadius: 4,
            }}
          />
          AtroUI
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#a3a3a3",
              lineHeight: 1.35,
              maxWidth: 920,
            }}
          >
            {description.length > 140
              ? `${description.slice(0, 137)}…`
              : description}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
