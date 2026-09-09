"use client"

/**
 * Clean terminal — static lines, token-based. No legacy presence styling.
 */

import { CopyButton } from "atroui"

export const INSTALL_LINES = [
  "npx shadcn@latest init",
  "npx shadcn@latest add @atroui/home-hero",
] as const

export function LiveInstall({ className }: { className?: string }) {
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
        <CopyButton
          value={INSTALL_LINES.join("\n")}
          idleLabel="Copy all"
          copiedLabel="Copied"
          size="xs"
          variant="ghost"
          timeout={1600}
          className="h-7 px-2 text-[11px] text-muted-foreground hover:bg-foreground/[0.05] hover:text-foreground"
        />
      </div>

      <div className="space-y-3 px-4 py-4">
        {INSTALL_LINES.map((line, i) => (
          <div key={line} className="flex items-start gap-2">
            <span className="shrink-0 select-none text-muted-foreground">$</span>
            <code className="min-w-0 flex-1 break-all text-foreground/90">{line}</code>
            <CopyButton
              value={line}
              size="icon-sm"
              variant="ghost"
              timeout={1600}
              aria-label={`Copy line ${i + 1}`}
              className="text-muted-foreground hover:bg-foreground/[0.05] hover:text-foreground"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
