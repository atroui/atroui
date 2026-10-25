"use client"

import * as React from "react"
import { useReducedMotion } from "motion/react"

import { cn } from "../../lib/utils"

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

/** easeOutSoft-ish cubic (matches Family Values chrome settle). */
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

/**
 * Pricing / stats counter — digits tween as numbers (not split-text scramble).
 * Family Values: ease-out settle, no spring overshoot; reduced motion jumps to final.
 * Uses rAF (not MotionValue children) so the digit always paints in React 19.
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
  const label = `${prefix}${formatFn(value)}${suffix}`
  const [text, setText] = React.useState(label)

  React.useEffect(() => {
    if (reduce || start === value || duration <= 0) {
      setText(label)
      return
    }

    setText(`${prefix}${formatFn(start)}${suffix}`)
    let raf = 0
    const t0 = performance.now()
    const ms = duration * 1000

    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / ms)
      const latest = start + (value - start) * easeOutCubic(t)
      setText(`${prefix}${formatFn(latest)}${suffix}`)
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setText(label)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, value, duration, reduce, label, prefix, suffix, formatFn])

  return (
    <span className={cn("tabular-nums", className)} aria-label={label}>
      {text}
    </span>
  )
}
