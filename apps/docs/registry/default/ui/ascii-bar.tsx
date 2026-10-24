"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type AsciiBarProps = {
  /** 0–100. */
  value?: number
  /** Bar width in pseudo-graphic cells. */
  cols?: number
  /** Show the percentage readout after the bar. */
  showPercent?: boolean
  /** Accessible name for the progressbar. */
  label?: string
  className?: string
}

const FULL = "▰"
const EMPTY = "▱"

function tweenCurve(p: number) {
  // ease-out cubic — winch, then settle.
  return 1 - Math.pow(1 - p, 3)
}

/**
 * ASCII Bar — a progress readout in pseudo-graphics (▰▱) that fills in
 * discrete display-steps so it always reads as plottable text. Percent
 * tweens with the bar; reduced motion jumps straight to the target.
 */
export function AsciiBar({
  value: valueProp = 68,
  cols = 24,
  showPercent = true,
  label = "Progress",
  className,
}: AsciiBarProps) {
  const value = Math.min(100, Math.max(0, valueProp))
  const [fill, setFill] = React.useState(value)
  const fillRef = React.useRef(value)
  const reduceRef = React.useRef(false)

  React.useEffect(() => {
    reduceRef.current = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches
  })

  React.useEffect(() => {
    if (reduceRef.current) {
      fillRef.current = value
      setFill(value)
      return
    }
    const from = fillRef.current
    if (Math.abs(value - from) < 0.01) return
    const dur = 360 + Math.abs(value - from) * 5
    let raf = 0
    const t0 = performance.now()
    const anim = (now: number) => {
      const p = Math.min(1, (now - t0) / dur)
      const next = from + (value - from) * tweenCurve(p)
      fillRef.current = next
      setFill(next)
      if (p < 1) raf = requestAnimationFrame(anim)
      else {
        fillRef.current = value
        setFill(value)
      }
    }
    raf = requestAnimationFrame(anim)
    return () => cancelAnimationFrame(raf)
  }, [value])

  const shown = Math.round((fill / 100) * cols)
  const bar = FULL.repeat(Math.max(0, Math.min(cols, shown))) +
    EMPTY.repeat(Math.max(0, cols - shown))
  const pct = Math.round(value)

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className={cn("inline-flex items-baseline gap-2", className)}
    >
      <pre
        aria-hidden="true"
        className="m-0 select-none whitespace-pre font-mono text-[13px] leading-none text-primary"
      >
        {`[${bar}]`}
      </pre>
      {showPercent ? (
        <span aria-hidden="true" className="font-mono text-xs text-foreground/60 tabular-nums">
          {pct}%
        </span>
      ) : null}
    </div>
  )
}
