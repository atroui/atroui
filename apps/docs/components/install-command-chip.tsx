"use client"

/**
 * Soft brand install chip — Family Values: see the tool → get the install line
 * in the same frame (gradual revelation, one primary copy action).
 */

import * as React from "react"
import { Check, Copy } from "lucide-react"
import posthog from "posthog-js"
import { cn } from "@/lib/utils"

export function InstallCommandChip({
  command,
  className,
}: {
  command: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(command)
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
    <div
      className={cn(
        "flex min-w-0 max-w-full items-center gap-1.5 rounded-lg border border-brand/25 bg-brand/10 py-1 pr-1 pl-2.5 sm:gap-2 sm:pl-3",
        className,
      )}
    >
      <span
        className="hidden shrink-0 font-mono text-[12px] font-medium text-brand sm:inline"
        aria-hidden
      >
        $
      </span>
      <code className="min-w-0 truncate font-mono text-[11px] text-foreground sm:text-[12px]">
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy install command"}
        className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-brand transition-colors hover:bg-brand/15 hover:text-foreground"
      >
        {copied ? (
          <Check className="size-3.5 text-brand" aria-hidden />
        ) : (
          <Copy className="size-3.5" aria-hidden />
        )}
      </button>
    </div>
  )
}
