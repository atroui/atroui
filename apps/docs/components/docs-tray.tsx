"use client"

/**
 * Docs trays — Family simplicity: one focused step at a time,
 * height shifts so progression is obvious, context stays on the page.
 */

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { fadeTween, panelTween } from "@/lib/motion"

export type DocsTrayStep = {
  title: string
  summary: string
  children: React.ReactNode
}

export function DocsTrayStack({
  steps,
  className,
}: {
  steps: DocsTrayStep[]
  className?: string
}) {
  const reduce = useReducedMotion()
  const [index, setIndex] = React.useState(0)
  const step = steps[index]
  if (!step) return null

  const atStart = index === 0
  const atEnd = index === steps.length - 1
  /** Vary tray height language: earlier steps feel shorter, later taller */
  const minHeight = 220 + index * 28

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
          Step {index + 1} of {steps.length}
        </p>
        <div className="flex gap-1">
          {steps.map((s, i) => (
            <button
              key={s.title}
              type="button"
              aria-label={`Go to ${s.title}`}
              aria-current={i === index ? "step" : undefined}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 w-5 rounded-full transition-colors",
                i === index ? "bg-brand" : "bg-white/15 hover:bg-white/25"
              )}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.section
          key={step.title}
          role="group"
          aria-labelledby={`docs-tray-title-${index}`}
          className="overflow-hidden rounded-2xl border border-border-subtle bg-card/50 shadow-[0_0_40px_color-mix(in_oklch,var(--color-brand)_12%,transparent)] backdrop-blur-md"
          style={{ minHeight }}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -10 }}
          transition={panelTween}
        >
          <div className="flex items-start justify-between gap-3 border-b border-border-subtle bg-white/[0.03] px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <h2
                id={`docs-tray-title-${index}`}
                className="ds-headline text-base text-foreground"
              >
                {step.title}
              </h2>
              <p className="mt-0.5 text-[13px] text-muted-foreground">
                {step.summary}
              </p>
            </div>
            <span className="ds-sketch shrink-0 text-sm text-brand">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="space-y-4 px-4 py-4 sm:px-5 sm:py-5">
            {step.children}
          </div>
        </motion.section>
      </AnimatePresence>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          disabled={atStart}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border-subtle bg-white/5 px-3.5 text-[13px] font-medium text-foreground transition-colors enabled:hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
        >
          <ChevronLeft className="size-3.5" aria-hidden />
          Back
        </button>
        <button
          type="button"
          disabled={atEnd}
          onClick={() => setIndex((i) => Math.min(steps.length - 1, i + 1))}
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[13px] font-medium text-background transition-opacity enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-35"
        >
          {atEnd ? "Done" : "Next"}
          {!atEnd ? <ChevronRight className="size-3.5" aria-hidden /> : null}
        </button>
      </div>

      {reduce ? null : (
        <motion.p
          key={`hint-${index}`}
          className="text-center font-mono text-[11px] text-muted-foreground/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={fadeTween}
        >
          {atEnd
            ? "Depth on demand — jump any step above"
            : "One tray at a time · complexity stays out of sight"}
        </motion.p>
      )}
    </div>
  )
}
