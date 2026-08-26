"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import posthog from "posthog-js"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
  /** Nest inside DocsExample - no outer border, lighter chrome */
  embedded?: boolean
}

export function CodeBlock({
  code,
  language = "tsx",
  className,
  embedded = false,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    await navigator.clipboard.writeText(code)
    posthog.capture("documentation_code_copied", {
      language,
      embedded,
    })
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[var(--radius)] bg-[var(--plate-ground)] text-foreground",
        !embedded && "border border-[var(--line)]",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-2.5">
        <span className="spec-label">{language}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--line)] px-2.5 text-[12px] font-medium text-muted-foreground transition-colors hover:border-[var(--line-strong)] hover:text-foreground"
        >
          {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-foreground">
        <code className="whitespace-pre">{code}</code>
      </pre>
    </div>
  )
}
