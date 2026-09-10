"use client"

import { OgLivePreview, type OgStyleKey } from "./og-live-preview"

/**
 * Lightweight OG workspace shell. Wire CONTENT.endpoint in your host app
 * for real image generation (Host API).
 */
const CONTENT = {
  endpoint: "/api/generate",
  title: "Ship the product this week",
  subtitle: "Fixed scope. Fixed price.",
  styleKey: "paperQuote" as OgStyleKey,
}

export function OgWorkspace() {
  return (
    <div className="space-y-4 rounded-[var(--atro-panel-radius)] border border-border-subtle bg-card/40 p-4 sm:p-6">
      <div>
        <p className="ms-stamp">OG workspace</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Preview is CSS-only. Point{" "}
          <code className="font-mono text-[12px] text-foreground">
            CONTENT.endpoint
          </code>{" "}
          at your generator API to export PNGs.
        </p>
      </div>
      <div
        className="relative aspect-[1200/630] overflow-hidden rounded-xl border border-border-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        tabIndex={0}
        role="img"
        aria-label="OG card preview. No exports yet — previews stay local until you connect a generator."
      >
        <OgLivePreview
          title={CONTENT.title}
          subtitle={CONTENT.subtitle}
          styleKey={CONTENT.styleKey}
        />
      </div>
      <p aria-live="polite" className="text-xs text-muted-foreground">
        Preview ready. No exports yet — point CONTENT.endpoint at your
        generator API to export PNGs.
      </p>
    </div>
  )
}
