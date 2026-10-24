"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { enterTween, exitTween, pageFade } from "@/lib/motion"
import { cn } from "@/lib/utils"

type TransitionPanelProps = {
  /** Stable key for the active panel — remounts the motion child on change. */
  activeKey: string
  /**
   * Panel content keyed by `activeKey`, or a render prop that receives the key.
   * Prefer a map for discrete feature tabs; use a render prop when panels are dynamic.
   */
  children:
    | Record<string, React.ReactNode>
    | ((activeKey: string) => React.ReactNode)
  className?: string
  /** Enter/exit y travel in px. Opacity always pairs with y (never fade alone). */
  y?: number
}

/**
 * Discrete panel swap — AnimatePresence `mode="wait"`, opacity + small y.
 * Family Values fluidity: exit finishes before enter; no spring. Reduced motion → instant.
 */
export function TransitionPanel({
  activeKey,
  children,
  className,
  y = 8,
}: TransitionPanelProps) {
  const reduce = useReducedMotion()
  const content =
    typeof children === "function" ? children(activeKey) : children[activeKey]

  if (reduce) {
    return <div className={cn(className)}>{content}</div>
  }

  const enter = enterTween(pageFade.duration, pageFade.ease)
  const exit = exitTween(pageFade.duration, pageFade.ease)

  return (
    <div className={cn(className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeKey}
          initial={{ opacity: 0, y }}
          animate={{
            opacity: 1,
            y: 0,
            transition: enter,
          }}
          exit={{
            opacity: 0,
            y: -Math.round(y * 0.5),
            transition: exit,
          }}
        >
          {content}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export type { TransitionPanelProps }
