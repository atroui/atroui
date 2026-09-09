"use client"

import * as React from "react"

import { AnimateNumber } from "../ui/animate-number"

/**
 * Counts up from 0 to `value` on first in-view.
 * Wraps AnimateNumber (easeOutSoft); reduced motion jumps to final.
 */
export function CountUp({
  value,
  duration = 1200,
  className,
  ariaLabel,
}: {
  value: number
  /** Duration in ms (converted for AnimateNumber). */
  duration?: number
  className?: string
  ariaLabel?: string
}) {
  const ref = React.useRef<HTMLSpanElement | null>(null)
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setActive(true)
      return
    }

    if (typeof IntersectionObserver === "undefined") {
      setActive(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setActive(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <span ref={ref}>
      {active ? (
        <AnimateNumber
          value={value}
          from={0}
          duration={duration / 1000}
          className={className}
        />
      ) : (
        <span className={className} aria-label={ariaLabel ?? String(value)}>
          0
        </span>
      )}
    </span>
  )
}
