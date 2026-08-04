import {
  STYLE_PRESETS,
  type StyleKey,
} from "../../lib/og/presets";

/**
 * CSS-only approximation of the server-rendered OG card — same presets as /og.
 * Used in the OG workspace idle state and on the homepage hero as product proof.
 */
export function OgLivePreview({
  title,
  subtitle,
  styleKey,
}: {
  title: string;
  subtitle: string;
  styleKey: StyleKey;
}) {
  const preset = STYLE_PRESETS[styleKey];
  const zone = preset.safeZone;

  const alignItems = zone === "center" ? "center" : "flex-start";
  const justifyContent = zone === "lowerThird" ? "flex-end" : "center";
  const textAlign = zone === "center" ? "center" : "left";

  const titleVW = `${Math.round((preset.typography.titleSizeMax / 1200) * 100)}cqi`;
  const subVW = `${Math.round((preset.typography.subtitleSizeMax / 1200) * 100)}cqi`;

  return (
    <div
      aria-hidden
      className="@container absolute inset-0 flex"
      style={{ background: preset.previewGradient }}
    >
      <div
        className="flex w-full flex-col"
        style={{
          padding: `${(60 / 630) * 100}% ${(80 / 1200) * 100}%`,
          alignItems,
          justifyContent,
          textAlign,
        }}
      >
        <div
          className="flex w-full flex-col"
          style={{
            alignItems: zone === "center" ? "center" : "flex-start",
            maxWidth: zone === "center" ? "80%" : "73%",
          }}
        >
          <div
            style={{
              color: preset.palette.title,
              fontFamily:
                'var(--font-outfit), var(--font-fraunces), system-ui, sans-serif',
              fontWeight: preset.typography.titleWeight,
              fontSize: titleVW,
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              whiteSpace: "pre-wrap",
              textAlign,
            }}
          >
            {title || "Your title lands here."}
          </div>
          {(subtitle || !title) && (
            <div
              style={{
                color: preset.palette.subtitle,
                fontFamily:
                  'var(--font-outfit), system-ui, sans-serif',
                fontWeight: 500,
                fontSize: subVW,
                lineHeight: 1.35,
                letterSpacing: "-0.005em",
                whiteSpace: "pre-wrap",
                textAlign,
                marginTop: "2.5%",
              }}
            >
              {subtitle || "Optional subtitle for context."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
