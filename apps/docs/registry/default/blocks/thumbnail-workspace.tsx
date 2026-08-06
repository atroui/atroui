"use client"

import { ThumbnailLivePreview } from "@/components/blocks/thumbnail-live-preview"

/**
 * Thumbnail workspace shell. Wire CONTENT.endpoint for real exports (Host API).
 */
const CONTENT = {
  endpoint: "/api/thumbnail",
  title: "How we shipped in 7 days",
  subtitle: "MVP sprint walkthrough",
  format: "youtube" as const,
}

export function ThumbnailWorkspace() {
  return (
    <div className="space-y-4 rounded-2xl border border-border-subtle bg-card/40 p-4 sm:p-6">
      <div>
        <p className="ms-stamp">Thumbnail workspace</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Preview is CSS-only. Point{" "}
          <code className="font-mono text-[12px] text-foreground">
            CONTENT.endpoint
          </code>{" "}
          at your thumbnail API to export images.
        </p>
      </div>
      <ThumbnailLivePreview
        title={CONTENT.title}
        subtitle={CONTENT.subtitle}
        format={CONTENT.format}
      />
    </div>
  )
}
