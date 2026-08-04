"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

export function CodeBlock({ code, language = "tsx", className }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-500">
          {language}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-medium text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-neutral-100">
        <code>{code}</code>
      </pre>
    </div>
  )
}
