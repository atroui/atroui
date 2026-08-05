import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 32, height: 32 }
export const contentType = "image/png"

/** Favicon - interrupted-A mark on dark tile. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          borderRadius: 8,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
          <path
            d="M14 36 L24 10 L34 36"
            stroke="#fafafa"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="17.5" y="24.3" width="13" height="3.6" rx="1.8" fill="#0b7bff" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
