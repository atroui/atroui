"use client"

import { cn } from "@/lib/utils"

/** Edit CONTENT for default preview copy. */
const CONTENT = {
  title: "How we shipped in 7 days",
  subtitle: "MVP sprint walkthrough",
  format: "youtube" as const,
}

export function ThumbnailLivePreview({
  title = CONTENT.title,
  subtitle = CONTENT.subtitle,
  format = CONTENT.format,
  className,
}: {
  title?: string
  subtitle?: string
  format?: "youtube" | "linkedin"
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border-subtle bg-gradient-to-br from-neutral-900 via-neutral-800 to-brand/30",
        format === "youtube" ? "aspect-video" : "aspect-[1.91/1]",
        className
      )}
    >
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sky-300/90">
          {format}
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {title}
        </p>
        <p className="mt-2 text-sm text-neutral-300">{subtitle}</p>
      </div>
    </div>
  )
}
