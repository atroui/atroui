"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button, cn } from "@meridian/ui"

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
    <div className={cn("group relative overflow-hidden rounded-lg border bg-zinc-950", className)}>
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-xs text-zinc-400">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copy}
          className="h-7 text-zinc-400 hover:bg-white/10 hover:text-zinc-100"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          <span className="ml-1.5 text-xs">{copied ? "Copied" : "Copy"}</span>
        </Button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-zinc-100">
        <code>{code}</code>
      </pre>
    </div>
  )
}
