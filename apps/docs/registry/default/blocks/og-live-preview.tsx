/**
 * CSS-only OG card preview. Edit CONTENT.presets or pass props.
 */

/** Edit CONTENT for default title/subtitle/style. */
const CONTENT = {
  title: "Ship the product this week",
  subtitle: "Fixed scope. Fixed price.",
  styleKey: "paperQuote" as const,
  presets: {
    paperQuote: {
      previewGradient:
        "linear-gradient(145deg, var(--background) 0%, var(--card) 45%, color-mix(in oklch, var(--brand) 22%, transparent) 100%)",
      safeZone: "lowerThird" as const,
      palette: { title: "var(--foreground)", subtitle: "var(--muted-foreground)" },
      typography: { titleSizeMax: 72, subtitleSizeMax: 28, titleWeight: 700 },
    },
    boldSplit: {
      previewGradient:
        "linear-gradient(90deg, var(--brand) 0%, var(--brand) 42%, var(--background) 42%)",
      safeZone: "center" as const,
      palette: { title: "var(--foreground)", subtitle: "var(--muted-foreground)" },
      typography: { titleSizeMax: 64, subtitleSizeMax: 24, titleWeight: 700 },
    },
  },
}

export type OgStyleKey = keyof typeof CONTENT.presets

export function OgLivePreview({
  title = CONTENT.title,
  subtitle = CONTENT.subtitle,
  styleKey = CONTENT.styleKey,
}: {
  title?: string
  subtitle?: string
  styleKey?: OgStyleKey
}) {
  const preset = CONTENT.presets[styleKey] ?? CONTENT.presets.paperQuote
  const zone = preset.safeZone

  const alignItems = zone === "center" ? "center" : "flex-start"
  const justifyContent = zone === "lowerThird" ? "flex-end" : "center"
  const textAlign = zone === "center" ? "center" : "left"

  const titleVW = `${Math.round((preset.typography.titleSizeMax / 1200) * 100)}cqi`
  const subVW = `${Math.round((preset.typography.subtitleSizeMax / 1200) * 100)}cqi`

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
                "var(--font-merriweather), var(--font-fraunces), ui-serif, Georgia, serif",
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
                fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
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
  )
}
