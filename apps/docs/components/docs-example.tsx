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
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy install command"}
      className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-brand transition-colors hover:bg-brand/15 hover:text-foreground"
    >
      {copied ? (
        <Check className="size-3.5 text-brand" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
    </button>
  )
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
  installCommand,
}: DocsExampleProps) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview")
  const reduce = useReducedMotion()

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border-subtle bg-card text-foreground",
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-2 border-b border-border-subtle bg-white/2 px-1.5">
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
                  layoutId="docs-example-tab"
                  className="absolute inset-0 rounded-md bg-white/10"
                  transition={revealTween}
                />
              ) : tab === key ? (
                <span className="absolute inset-0 rounded-md bg-white/10" />
              ) : null}
              <span className="relative z-1">{key}</span>
            </button>
          ))}
        </div>

        {installCommand ? (
          <div className="ml-auto flex min-w-0 items-center py-1 pr-1 sm:pr-1.5">
            <div className="flex min-w-0 items-center gap-1.5 rounded-lg border border-brand/25 bg-brand/10 py-1 pr-1 pl-2.5 sm:gap-2 sm:pl-3">
              <span
                className="hidden shrink-0 font-mono text-[12px] font-medium text-brand sm:inline"
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
          className={cn(
            "relative overflow-x-auto bg-background",
            fullBleed
              ? "max-h-[min(720px,70vh)] overflow-auto"
              : "flex min-h-50 items-center justify-center p-4 sm:min-h-70 sm:p-8 md:p-10"
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
