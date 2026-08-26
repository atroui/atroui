"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import posthog from "posthog-js"
import { cn } from "@/lib/utils"
import { CodeBlock } from "@/components/code-block"
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

function InstallCopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      posthog.capture("documentation_code_copied", {
        language: "bash",
        embedded: true,
        kind: "install",
      })
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* Clipboard unavailable — the command is still selectable. */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy install command"}
      className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-sm)] text-muted-foreground transition-colors hover:text-foreground"
    >
      {copied ? (
        <Check className="size-3.5 text-[var(--brand)]" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
    </button>
  )
}

/**
 * A specimen mounted for close inspection: the same plate frame as the gallery,
 * with the source one tab away.
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

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius)] border border-[var(--line)]",
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-2 border-b border-[var(--line)] px-2">
        <div
          className="relative flex shrink-0 gap-0.5 p-1.5"
          role="tablist"
          aria-label="Preview or code"
        >
          {(["preview", "code"] as const).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={cn(
                "relative cursor-pointer rounded-[var(--radius-sm)] px-3 py-1.5 font-mono text-[11px] tracking-[0.08em] uppercase transition-colors",
                tab === key
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab === key && !reduce ? (
                <motion.span
                  layoutId="docs-example-tab"
                  className="absolute inset-0 rounded-[var(--radius-sm)] bg-muted"
                  transition={revealTween}
                />
              ) : tab === key ? (
                <span className="absolute inset-0 rounded-[var(--radius-sm)] bg-muted" />
              ) : null}
              <span className="relative z-1">{key}</span>
            </button>
          ))}
        </div>

        {installCommand ? (
          <div className="ml-auto flex min-w-0 items-center py-1.5 pr-1">
            <div className="flex min-w-0 items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--line)] py-1 pr-1 pl-2.5 sm:gap-2 sm:pl-3">
              <span
                className="hidden shrink-0 font-mono text-[11px] text-muted-foreground sm:inline"
                aria-hidden
              >
                $
              </span>
              <code className="min-w-0 truncate font-mono text-[11px] text-foreground sm:text-[12px]">
                {installCommand}
              </code>
              <InstallCopyBtn text={installCommand} />
            </div>
          </div>
        ) : null}
      </div>

      {tab === "preview" ? (
        <div
          // Marks a region whose headings belong to the specimen, not the page.
          data-preview=""
          className={cn(
            "relative bg-[var(--plate-ground)]",
            fullBleed && unclip
              ? "overflow-visible"
              : fullBleed
                ? "max-h-[min(720px,70vh)] overflow-auto"
                : "flex min-h-52 items-center justify-center overflow-x-auto p-6 sm:min-h-72 sm:p-10 md:p-12"
          )}
        >
          <div className={cn("w-full min-w-0", !fullBleed && "flex justify-center")}>
            {preview}
          </div>
        </div>
      ) : (
        <CodeBlock code={code} embedded className="border-0" />
      )}
    </div>
  )
}
