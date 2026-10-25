"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { Maximize, RotateCw } from "lucide-react"
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
  /**
   * CLI install in the stage toolbar (see it → get it).
   * Pass a raw string for InstallCommandChip, or a node (e.g. RegistryInstallCommand).
   * Live theme companions follow the site Themes tray — one source of truth.
   */
  installCommand?: string | React.ReactNode
  /**
   * Flagship poke hint inside the preview stage (TRY · …).
   * Careful delight — only on demos that invite a finger.
   */
  tip?: string
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
  tip,
}: DocsExampleProps) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview")
  const [replayKey, setReplayKey] = React.useState(0)
  const stageRef = React.useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const tabInkId = React.useId()

  async function toggleFullscreen() {
    const el = stageRef.current
    if (!el) return
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      } else if (el.requestFullscreen) {
        await el.requestFullscreen()
      }
    } catch {
      /* Fullscreen unsupported or denied — stay inline. */
    }
  }

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

        <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-0.5 py-1 pr-1 sm:pr-1.5">
          {tab === "preview" ? (
            <>
              <button
                type="button"
                onClick={() => setReplayKey((k) => k + 1)}
                aria-label="Replay preview"
                title="Replay preview"
                className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
              >
                <RotateCw className="size-3.5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label="Fullscreen preview"
                title="Fullscreen preview"
                className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
              >
                <Maximize className="size-3.5" aria-hidden />
              </button>
            </>
          ) : null}
          {installCommand ? (
            <div className="min-w-0 max-w-full flex-1 sm:max-w-[min(100%,36rem)]">
              {typeof installCommand === "string" ? (
                <InstallCommandChip command={installCommand} />
              ) : (
                installCommand
              )}
            </div>
          ) : null}
        </div>
      </div>

      {tab === "preview" ? (
        <div
          ref={stageRef}
          data-toc-skip
          className={cn(
            "docs-example-stage relative",
            tip && "pt-8",
            fullBleed
              ? unclip
                ? "overflow-visible"
                : "max-h-[min(720px,70vh)] overflow-auto"
              : "atro-preview-canvas"
          )}
        >
          {tip ? (
            <p
              className="pointer-events-none absolute top-2.5 left-3 z-10 max-w-[calc(100%-1.5rem)] truncate font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase"
              aria-hidden
            >
              Try · {tip}
            </p>
          ) : null}
          <ResizablePreview key={replayKey} bleed={Boolean(fullBleed)}>
            {preview}
          </ResizablePreview>
        </div>
      ) : (
        <CodeBlock code={code} embedded className="border-0" />
      )}
    </div>
  )
}
