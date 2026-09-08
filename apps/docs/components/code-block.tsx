"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import posthog from "posthog-js"
import { easeOutExpo } from "@/lib/motion"
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
  const reduce = useReducedMotion()
  const resetTimer = React.useRef<number | null>(null)

  React.useEffect(
    () => () => {
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current)
    },
    [],
  )

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      posthog.capture("documentation_code_copied", {
        language,
        embedded,
      })
      setCopied(true)
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current)
      resetTimer.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[var(--atro-panel-radius)] bg-muted/30 text-foreground",
        !embedded && "border border-border-subtle",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border-subtle bg-white/[0.03] px-4 py-2.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {language}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy code"}
          className={cn(
            "inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-md border bg-white/5 px-2.5 text-[12px] font-medium text-muted-foreground transition-colors duration-200 hover:bg-white/10 hover:text-foreground",
            copied ? "border-brand/40" : "border-border-subtle",
          )}
        >
          {copied ? (
            <motion.span
              className="inline-flex"
              initial={reduce ? false : { scale: 0.65, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.14, ease: easeOutExpo }}
            >
              <Check className="size-3.5 text-brand" aria-hidden />
            </motion.span>
          ) : (
            <Copy className="size-3.5" aria-hidden />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-foreground">
        <code className="whitespace-pre">{code}</code>
      </pre>
    </div>
  )
}
