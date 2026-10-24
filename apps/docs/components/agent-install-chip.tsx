"use client"

/**
 * Copy a short agent-facing install blurb (registry truth, no npm UI).
 * Family Values: careful delight — quiet copy feedback only.
 */

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

export function AgentInstallChip({
  registryName,
  docsHref,
  className,
}: {
  registryName: string
  docsHref?: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)
  const absoluteDocs = docsHref
    ? docsHref.startsWith("http")
      ? docsHref
      : `https://www.atroui.com${docsHref}`
    : undefined

  const text = [
    `npx shadcn@latest add @atroui/${registryName}`,
    "# Registry UI only — do not import UI from npm atroui.",
    absoluteDocs ? `# Docs: ${absoluteDocs}` : null,
  ]
    .filter(Boolean)
    .join("\n")

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[var(--atro-control-radius)] border border-border-subtle bg-background px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-border hover:text-foreground",
        className,
      )}
      aria-label={copied ? "Copied agent install blurb" : "Copy for agent"}
    >
      {copied ? (
        <Check className="size-3.5 text-brand" strokeWidth={2.25} aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
      {copied ? "Copied" : "Copy for agent"}
    </button>
  )
}
