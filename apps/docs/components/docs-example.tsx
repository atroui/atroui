"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { CodeBlock } from "@/components/code-block"
import { revealTween } from "@/lib/motion"

type DocsExampleProps = {
  preview: React.ReactNode
  code: string
  className?: string
  /** Section / page components - render edge-to-edge in a scrollable stage */
  fullBleed?: boolean
}

/**
 * Preview / Code tabs — shared pill travels (fluidity) instead of a hard swap.
 * Tween, not spring — Family chrome prefers easeOut over overshoot.
 */
export function DocsExample({ preview, code, className, fullBleed }: DocsExampleProps) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview")
  const reduce = useReducedMotion()

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border-subtle bg-card text-foreground",
        className
      )}
    >
      <div className="flex items-center border-b border-border-subtle bg-white/[0.02] px-1.5">
        <div className="relative flex gap-0.5 p-1.5">
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
              <span className="relative z-[1]">{key}</span>
            </button>
          ))}
        </div>
      </div>

      {tab === "preview" ? (
        <div
          className={cn(
            "relative overflow-x-auto bg-background",
            fullBleed
              ? "max-h-[min(720px,70vh)] overflow-auto"
              : "flex min-h-[200px] items-center justify-center p-4 sm:min-h-[280px] sm:p-8 md:p-10"
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
