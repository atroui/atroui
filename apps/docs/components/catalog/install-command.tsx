"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import posthog from "posthog-js"
import { cn } from "@/lib/utils"

/**
 * The first real action on the site, so it is a button rather than decoration:
 * the whole chip copies, and the command stays selectable for people who'd
 * rather drag across it.
 */
export function InstallCommand({
  command,
  className,
  source = "landing",
}: {
  command: string
  className?: string
  source?: string
}) {
  const [copied, setCopied] = React.useState(false)
  const timeout = React.useRef<number | undefined>(undefined)

  React.useEffect(() => () => window.clearTimeout(timeout.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(command)
      posthog.capture("documentation_code_copied", {
        language: "bash",
        kind: "install",
        source,
      })
      setCopied(true)
      timeout.current = window.setTimeout(() => setCopied(false), 1800)
    } catch {
      /* Clipboard unavailable — the text is still selectable. */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn("spec-command", className)}
      aria-label={copied ? "Command copied" : `Copy ${command}`}
    >
      <span className="text-muted-foreground select-none" aria-hidden>
        $
      </span>
      <span className="min-w-0 truncate">{command}</span>
      {copied ? (
        <Check className="size-3.5 shrink-0 text-[var(--brand)]" aria-hidden />
      ) : (
        <Copy className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
      )}
    </button>
  )
}
