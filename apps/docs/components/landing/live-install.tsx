"use client"

/**
 * Clean terminal — static lines, token-based. No legacy presence styling.
 */

import * as React from "react"
import { Check, Copy } from "lucide-react"

export const INSTALL_LINES = [
  "npx shadcn@latest init",
  "npx shadcn@latest add @atroui/home-hero",
] as const

export function LiveInstall({ className }: { className?: string }) {
  const [copied, setCopied] = React.useState<number | "all" | null>(null)

  async function copy(text: string, key: number | "all") {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      window.setTimeout(() => setCopied(null), 1600)
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      className={[
        "overflow-hidden rounded-lg border border-border-subtle bg-card font-mono text-[13px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Install AtroUI"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border-subtle px-4 py-2.5">
        <span className="text-[11px] text-muted-foreground">Terminal</span>
        <button
          type="button"
          onClick={() => copy(INSTALL_LINES.join("\n"), "all")}
          className="inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-md px-2 text-[11px] text-muted-foreground transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
        >
          {copied === "all" ? (
            <>
              <Check className="size-3" aria-hidden />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3" aria-hidden />
              Copy all
            </>
          )}
        </button>
      </div>

      <div className="space-y-3 px-4 py-4">
        {INSTALL_LINES.map((line, i) => (
          <div key={line} className="flex items-start gap-2">
            <span className="shrink-0 select-none text-muted-foreground">$</span>
            <code className="min-w-0 flex-1 break-all text-foreground/90">{line}</code>
            <button
              type="button"
              onClick={() => copy(line, i)}
              aria-label={`Copy line ${i + 1}`}
              className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
            >
              {copied === i ? (
                <Check className="size-3.5" aria-hidden />
              ) : (
                <Copy className="size-3.5" aria-hidden />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
