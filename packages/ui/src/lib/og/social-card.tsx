import { ImageResponse } from "next/og";

import { getBrand } from "../brand";

export const OG_SIZE = { width: 1200, height: 630 };

const BRAND_AMBER = "#f59e0b";
const BRAND_AMBER_LIGHT = "#fbbf24";

type SocialCardOptions = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  footer?: string;
};

/** Shared 1200×630 OG card — amber brand, dark studio aesthetic. */
export function buildSocialCardImage(options: SocialCardOptions) {
  const brand = getBrand();
  const {
    eyebrow = brand.name,
    title,
    subtitle,
    footer = brand.domain,
  } = options;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#0a0a0d",
          backgroundImage: `radial-gradient(60% 50% at 20% 10%, rgba(245,158,11,0.28), transparent 60%), radial-gradient(50% 40% at 95% 10%, rgba(245,158,11,0.14), transparent 60%), linear-gradient(135deg, #111218 0%, #0a0a0d 60%, #080810 100%)`,
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              border: "1.5px solid rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 999, background: BRAND_AMBER }} />
          </div>
          <div style={{ fontSize: 13, letterSpacing: 5, textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
            {eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 64, lineHeight: 1.08, letterSpacing: -2, fontWeight: 600, maxWidth: 1000 }}>
            {title}
          </div>
          {subtitle ? (
            <div style={{ fontSize: 26, lineHeight: 1.35, color: "rgba(255,255,255,0.72)", maxWidth: 900 }}>
              {subtitle}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "rgba(255,255,255,0.55)" }}>
          <span style={{ color: BRAND_AMBER_LIGHT, fontWeight: 600 }}>Studio & AI tools</span>
          <span>{footer}</span>
        </div>
      </div>
    ),
    OG_SIZE
  );
}
