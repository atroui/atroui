import {
  THUMBNAIL_STYLE_PRESETS,
  type ThumbnailStyleKey,
} from "../../lib/thumbnail/presets";
import type { ThumbnailFormat, ThumbnailLayout } from "../../lib/thumbnail/compose";

/**
 * CSS-only approximation of the server-rendered thumbnail.
 * Supports layout-specific rendering and badge overlays.
 */
export function ThumbnailLivePreview({
  title,
  subtitle,
  styleKey,
  format,
  layout = "bold-center",
  badge,
}: {
  title: string;
  subtitle: string;
  styleKey: ThumbnailStyleKey;
  format: ThumbnailFormat;
  layout?: ThumbnailLayout;
  badge?: string;
}) {
  const preset = THUMBNAIL_STYLE_PRESETS[styleKey];

  const titleMultiplier = format === "youtube" ? 1.15 : 1;
  const refWidth = format === "youtube" ? 1280 : 1200;

  const titleVW = `${Math.round(((preset.typography.titleSizeMax * titleMultiplier) / refWidth) * 100)}cqi`;
  const subVW = `${Math.round((preset.typography.subtitleSizeMax / refWidth) * 100)}cqi`;

  const displayTitle = title || "YOUR TITLE LANDS HERE";
  const displaySub = subtitle || (!title ? "Optional subtitle for context." : "");

  // ── Bold Center ──────────────────────────────────────────────────────
  if (layout === "bold-center") {
    return (
      <div
        aria-hidden
        className="@container absolute inset-0 flex"
        style={{ background: preset.previewGradient }}
      >
        {/* Badge */}
        {badge && (
          <div
            style={{
              position: "absolute",
              top: "4%",
              left: "3%",
              backgroundColor: "#FF3B30",
              color: "#fff",
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 700,
              fontSize: "1.7cqi",
              lineHeight: 1,
              padding: "0.8cqi 1.6cqi",
              borderRadius: "0.9cqi",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              zIndex: 10,
            }}
          >
            {badge}
          </div>
        )}
        <div
          className="flex w-full flex-col items-center justify-center"
          style={{ padding: `${(80 / 720) * 100}% ${(100 / 1280) * 100}%` }}
        >
          <div
            style={{
              color: preset.palette.title,
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 700,
              fontSize: titleVW,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              textAlign: "center",
              textTransform: "uppercase",
              maxWidth: "75%",
              textShadow: `3px 3px 0 ${preset.palette.title.includes("fff") || preset.palette.title.includes("FFF") ? "#000" : "#fff"}, -3px -3px 0 ${preset.palette.title.includes("fff") || preset.palette.title.includes("FFF") ? "#000" : "#fff"}, 3px -3px 0 ${preset.palette.title.includes("fff") || preset.palette.title.includes("FFF") ? "#000" : "#fff"}, -3px 3px 0 ${preset.palette.title.includes("fff") || preset.palette.title.includes("FFF") ? "#000" : "#fff"}`,
            }}
          >
            {displayTitle}
          </div>
          {displaySub && (
            <div
              style={{
                color: preset.palette.subtitle,
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 500,
                fontSize: subVW,
                lineHeight: 1.3,
                textAlign: "center",
                marginTop: "2%",
                maxWidth: "65%",
              }}
            >
              {displaySub}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Split ────────────────────────────────────────────────────────────
  if (layout === "split") {
    return (
      <div
        aria-hidden
        className="@container absolute inset-0 flex"
        style={{ background: preset.previewGradient }}
      >
        {badge && (
          <div
            style={{
              position: "absolute",
              top: "4%",
              left: "3%",
              backgroundColor: "#FF3B30",
              color: "#fff",
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 700,
              fontSize: "1.7cqi",
              lineHeight: 1,
              padding: "0.8cqi 1.6cqi",
              borderRadius: "0.9cqi",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              zIndex: 10,
            }}
          >
            {badge}
          </div>
        )}
        <div
          className="flex flex-col justify-center"
          style={{
            width: "55%",
            height: "100%",
            paddingLeft: "6.25%",
            paddingRight: "2.3%",
          }}
        >
          <div
            style={{
              color: preset.palette.title,
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 700,
              fontSize: titleVW,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              textAlign: "left",
              textTransform: "uppercase",
              maxWidth: "100%",
              textShadow: `2px 2px 0 ${preset.palette.title.includes("fff") || preset.palette.title.includes("FFF") ? "#000" : "#fff"}, -2px -2px 0 ${preset.palette.title.includes("fff") || preset.palette.title.includes("FFF") ? "#000" : "#fff"}`,
            }}
          >
            {displayTitle}
          </div>
          {displaySub && (
            <div
              style={{
                color: preset.palette.subtitle,
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 500,
                fontSize: subVW,
                lineHeight: 1.3,
                textAlign: "left",
                marginTop: "2%",
                maxWidth: "95%",
              }}
            >
              {displaySub}
            </div>
          )}
        </div>
        {/* Right side — breathing zone for AI background */}
        <div
          style={{
            width: "45%",
            height: "100%",
            borderLeft: "1px dashed rgba(255,255,255,0.15)",
          }}
        />
      </div>
    );
  }

  // ── Lower Bar ───────────────────────────────────────────────────────
  return (
    <div
      aria-hidden
      className="@container absolute inset-0 flex flex-col"
      style={{ background: preset.previewGradient }}
    >
      {badge && (
        <div
          style={{
            position: "absolute",
            top: "4%",
            left: "3%",
            backgroundColor: "#FF3B30",
            color: "#fff",
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 700,
            fontSize: "1.7cqi",
            lineHeight: 1,
            padding: "0.8cqi 1.6cqi",
            borderRadius: "0.9cqi",
            letterSpacing: "0.03em",
            textTransform: "uppercase",
            zIndex: 10,
          }}
        >
          {badge}
        </div>
      )}
      {/* Empty breathing space on top */}
      <div style={{ flex: 1 }} />
      {/* Dark bottom bar */}
      <div
        style={{
          width: "100%",
          padding: "5.5% 4.7% 6.6%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div
          style={{
            color: "#FFFFFF",
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 700,
            fontSize: `${Math.round(((preset.typography.titleSizeMax * 0.85) / refWidth) * 100)}cqi`,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            textAlign: "left",
            textTransform: "uppercase",
            maxWidth: "85%",
            textShadow: "2px 2px 0 #000, -2px -2px 0 #000",
          }}
        >
          {displayTitle}
        </div>
        {displaySub && (
          <div
            style={{
              color: "rgba(255,255,255,0.8)",
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 500,
              fontSize: `${Math.round((preset.typography.subtitleSizeMax / refWidth) * 100)}cqi`,
              lineHeight: 1.3,
              textAlign: "left",
              marginTop: "1.5%",
              maxWidth: "80%",
            }}
          >
            {displaySub}
          </div>
        )}
      </div>
    </div>
  );
}
