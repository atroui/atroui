"use client"

import * as React from "react"
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react"

import { easeOutSoft, enterTween } from "@/lib/motion"
import { cn } from "@/lib/utils"

export type AnimateNumberFormat =
  | Intl.NumberFormatOptions
  | ((value: number) => string)

export type AnimateNumberProps = {
  value: number
  /** Start value on mount / when first set. Defaults to `value` (no enter tween). */
  from?: number
  /** Tween duration in seconds. Soft settle — ~0.6–0.8s. */
  duration?: number
  /** Intl options or a formatter. Default: rounded `toLocaleString`. */
  format?: AnimateNumberFormat
  locale?: string
  prefix?: string
  suffix?: string
  className?: string
}

function resolveFormat(
  format: AnimateNumberFormat | undefined,
  locale?: string
): (n: number) => string {
  if (typeof format === "function") return format
  if (format) {
    const nf = new Intl.NumberFormat(locale, format)
    return (n) => nf.format(n)
  }
  return (n) => Math.round(n).toLocaleString(locale)
}

/**
 * Pricing / stats counter — digits tween as numbers (not split-text scramble).
 * Family Values: easeOutSoft tween, no spring overshoot; reduced motion jumps to final.
 */
export function AnimateNumber({
  value,
  from,
  duration = 0.7,
  format,
  locale,
  prefix = "",
  suffix = "",
  className,
}: AnimateNumberProps) {
  const reduce = useReducedMotion()
  const formatFn = React.useMemo(
    () => resolveFormat(format, locale),
    [format, locale]
  )

  const start = from ?? value
  const count = useMotionValue(start)
  const display = useTransform(count, (latest) => {
    return `${prefix}${formatFn(latest)}${suffix}`
  })

  const label = `${prefix}${formatFn(value)}${suffix}`

  React.useEffect(() => {
    if (reduce) {
      count.set(value)
      return
    }
    const controls = animate(count, value, {
      ...enterTween(duration, easeOutSoft),
    })
    return () => controls.stop()
  }, [count, value, duration, reduce])

  if (reduce) {
    return (
      <span className={cn("tabular-nums", className)} aria-label={label}>
        {label}
      </span>
    )
  }

  return (
    <motion.span className={cn("tabular-nums", className)} aria-label={label}>
      {display}
    </motion.span>
  )
}
