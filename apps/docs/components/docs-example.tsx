"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { CodeBlock } from "@/components/code-block"
import { InstallCommandChip } from "@/components/install-command-chip"
import { ResizablePreview } from "@/components/resizable-preview"
import { revealTween } from "@/lib/motion"

type DocsExampleProps = {
  preview: React.ReactNode
  code: string
  className?: string
  /** Section / page components - render edge-to-edge in a scrollable stage */
  fullBleed?: boolean
  /**
   * Grow with content instead of clipping to 70vh.
   * Blog embeds: keep the reading column, no inner scrollbar.
   */
  unclip?: boolean
  /** CLI install line in the stage toolbar (see it → get it). */
  installCommand?: string
}

/**
 * Preview / Code tabs — shared pill travels (fluidity) instead of a hard swap.
 * Install command sits in the toolbar when provided (gradual revelation:
 * see it → get it in one frame). Tween, not spring — Family chrome.
 */
export function DocsExample({
  preview,
  code,
  className,
  fullBleed,
  unclip,
  installCommand,
}: DocsExampleProps) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview")
  const reduce = useReducedMotion()
  const tabInkId = React.useId()

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--atro-panel-radius)] border border-border-subtle bg-background text-foreground",
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-2 border-b border-border-subtle bg-muted px-1.5">
        <div className="relative flex shrink-0 gap-0.5 p-1.5">
          {(["preview", "code"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={cn(
                "relative px-3.5 py-1.5 text-[13px] font-medium capitalize transition-colors",
                tab === key
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab === key && !reduce ? (
                <motion.span
                  layoutId={tabInkId}
                  className="absolute inset-0 rounded-md bg-foreground/10"
                  transition={revealTween}
                />
              ) : tab === key ? (
                <span className="absolute inset-0 rounded-md bg-foreground/10" />
              ) : null}
              <span className="relative z-1">{key}</span>
            </button>
          ))}
        </div>

        {installCommand ? (
          <div className="ml-auto flex min-w-0 items-center py-1 pr-1 sm:pr-1.5">
            <InstallCommandChip command={installCommand} />
          </div>
        ) : null}
      </div>

      {tab === "preview" ? (
        <div
          data-toc-skip
          className={cn(
            "docs-example-stage relative",
            fullBleed
              ? unclip
                ? "overflow-visible"
                : "max-h-[min(720px,70vh)] overflow-auto"
              : "atro-preview-canvas"
          )}
        >
          {fullBleed ? (
            <div className="w-full min-w-0">{preview}</div>
          ) : (
            <ResizablePreview>{preview}</ResizablePreview>
          )}
        </div>
      ) : (
        <CodeBlock code={code} embedded className="border-0" />
      )}
    </div>
  )
}
