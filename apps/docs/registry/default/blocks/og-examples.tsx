"use client"

import Link from "next/link"

import { OgLivePreview, type OgStyleKey } from "./og-live-preview"
import { cn } from "@/lib/utils"

/** Edit CONTENT for demo cards shown in the gallery. */
const CONTENT = {
  examples: [
    {
      title: "Ship this week",
      subtitle: "Fixed-scope MVP",
      styleKey: "paperQuote" as OgStyleKey,
      href: "/og",
    },
    {
      title: "Own the UI",
      subtitle: "shadcn registry",
      styleKey: "boldSplit" as OgStyleKey,
      href: "/docs/registry",
    },
  ],
}

export function OgExamples({
  preview = false,
  className,
}: {
  preview?: boolean
  className?: string
}) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
      {CONTENT.examples.map((ex) => (
        <Link
          key={ex.title}
          href={ex.href}
          className="group relative aspect-1200/630 overflow-hidden rounded-2xl border border-border-subtle"
        >
          <OgLivePreview
            title={ex.title}
            subtitle={ex.subtitle}
            styleKey={ex.styleKey}
          />
          {!preview ? (
            <span className="absolute right-3 bottom-3 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[11px] text-white backdrop-blur-sm">
              Open
            </span>
          ) : null}
        </Link>
      ))}
    </div>
  )
}
