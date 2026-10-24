"use client"

import * as React from "react"
import { animate, useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export type NumberTickerProps = {
  className?: string
  /** Target value. Default 100. */
  value?: number
  /** Start value. Default 0. */
  from?: number
  /** Duration in seconds. Default 1.6. */
  duration?: number
  /** Prefix, e.g. "$". */
  prefix?: string
  /** Suffix, e.g. "+". */
  suffix?: string
  /** Locale grouping. Default true. */
  grouped?: boolean
}

/**
 * Number ticker — counts up when scrolled into view.
 * Tabular nums; reduced motion → final value instantly.
 */
export function NumberTicker({
  className,
  value = 100,
  from = 0,
  duration = 1.6,
  prefix = "",
  suffix = "",
  grouped = true,
}: NumberTickerProps) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = React.useState(from)

  React.useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    const controls = animate(from, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [inView, reduce, from, value, duration])

  const text = grouped
    ? Math.round(display).toLocaleString("en-US")
    : String(Math.round(display))

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {text}
      {suffix}
    </span>
  )
}
