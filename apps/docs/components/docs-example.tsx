"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CodeBlock } from "@/components/code-block"

type DocsExampleProps = {
  preview: React.ReactNode
  code: string
  className?: string
  /** Section / page components - render edge-to-edge in a scrollable stage */
  fullBleed?: boolean
}

/**
 * Preview / Code tabs with a live canvas that preserves design tokens.
 */
export function DocsExample({ preview, code, className, fullBleed }: DocsExampleProps) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview")

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border-subtle bg-card/40 text-foreground backdrop-blur-md",
        className
      )}
    >
      <div className="flex items-center border-b border-border-subtle bg-white/[0.03] px-1.5">
        <div className="flex gap-0.5 p-1.5">
          {(["preview", "code"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[13px] font-medium capitalize transition-colors",
                tab === key
                  ? "bg-white/10 text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {tab === "preview" ? (
        <div
          className={cn(
            "relative overflow-x-auto bg-background",
            fullBleed
              ? "max-h-[min(720px,70vh)] overflow-auto"
              : "flex min-h-[200px] items-center justify-center p-4 sm:min-h-[280px] sm:p-8 md:p-10"
          )}
        >
          <div
            className={cn(
              "w-full min-w-0",
              !fullBleed && "flex justify-center"
            )}
          >
            {preview}
          </div>
        </div>
      ) : (
        <CodeBlock code={code} embedded className="border-0" />
      )}
    </div>
  )
}
