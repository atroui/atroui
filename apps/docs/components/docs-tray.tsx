"use client"

/**
 * Docs guide — Family Values: gradual revelation.
 * One chapter open at a time. Editorial rail, not a glowing wizard card.
 */

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { panelTween } from "@/lib/motion"

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
  const directionRef = React.useRef(0)
  const step = steps[index]
  if (!step) return null

  const atStart = index === 0
  const atEnd = index === steps.length - 1

  const goTo = (next: number) => {
    if (next < 0 || next >= steps.length || next === index) return
    directionRef.current = next > index ? 1 : -1
    setIndex(next)
  }

  const dir = directionRef.current

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border-subtle bg-background",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border-subtle px-4 py-3 sm:px-5">
        <p className="ms-stamp">Guide</p>
        <p className="font-mono text-[11px] tabular-nums tracking-[0.12em] text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
          <span className="text-muted-foreground/50"> / </span>
          {String(steps.length).padStart(2, "0")}
        </p>
      </div>

      <div className="md:grid md:grid-cols-[minmax(9.5rem,12rem)_minmax(0,1fr)]">
        <nav
          aria-label="Guide chapters"
          className="border-b border-border-subtle md:border-r md:border-b-0"
        >
          <ul className="flex gap-1 overflow-x-auto px-2 py-2 md:flex-col md:gap-0 md:overflow-visible md:px-0 md:py-3">
            {steps.map((s, i) => {
              const active = i === index
              return (
                <li key={s.title} className="shrink-0 md:w-full">
                  <button
                    type="button"
                    aria-current={active ? "step" : undefined}
                    onClick={() => goTo(i)}
                    className={cn(
                      "relative w-full px-3 py-2 text-left transition-colors md:px-4 md:py-2.5",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {active ? (
                      <span
                        aria-hidden
                        className="absolute inset-x-2 bottom-1 h-px bg-brand md:inset-y-2 md:right-auto md:bottom-auto md:left-0 md:h-auto md:w-0.5 md:rounded-full"
                      />
                    ) : null}
                    <span className="flex items-baseline gap-2">
                      <span className="font-mono text-[10px] tabular-nums tracking-wider text-muted-foreground/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[13px] font-medium tracking-tight">
                        {s.title}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="relative min-w-0">
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.section
              key={step.title}
              role="group"
              aria-labelledby={`docs-tray-title-${index}`}
              custom={dir}
              initial={
                reduce
                  ? false
                  : { opacity: 0, x: dir >= 0 ? 18 : -18 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={
                reduce
                  ? undefined
                  : { opacity: 0, x: dir >= 0 ? -14 : 14 }
              }
              transition={panelTween}
              className="flex min-h-[16rem] flex-col"
            >
              <header className="space-y-1.5 border-b border-border-subtle px-4 py-4 sm:px-5">
                <p className="text-[13px] leading-snug text-muted-foreground">
                  {step.summary}
                </p>
                <h2
                  id={`docs-tray-title-${index}`}
                  className="ds-headline text-lg text-foreground sm:text-xl"
                >
                  {step.title}
                </h2>
              </header>

              <div className="flex-1 space-y-4 px-4 py-4 sm:px-5 sm:py-5">
                {step.children}
              </div>

              <div className="mt-auto flex items-center justify-between gap-3 border-t border-border-subtle px-4 py-3 sm:px-5">
                <button
                  type="button"
                  disabled={atStart}
                  onClick={() => goTo(index - 1)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border-subtle bg-white/5 px-3 text-[13px] font-medium text-foreground transition-colors enabled:hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <ChevronLeft className="size-3.5" aria-hidden />
                  Back
                </button>
                <button
                  type="button"
                  disabled={atEnd}
                  onClick={() => goTo(index + 1)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border-subtle bg-white/5 px-3 text-[13px] font-medium text-foreground transition-colors enabled:hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Next
                  <ChevronRight className="size-3.5" aria-hidden />
                </button>
              </div>
            </motion.section>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
