"use client"

import * as React from "react"

/**
 * Counts up from 0 to `value` over `duration` ms with out-quart easing.
 * Runs once on first in-view and respects prefers-reduced-motion.
 */
export function CountUp({
  value,
  duration = 1200,
  className,
  ariaLabel,
}: {
  value: number
  duration?: number
  className?: string
  ariaLabel?: string
}) {
  const ref = React.useRef<HTMLSpanElement | null>(null)
  const [display, setDisplay] = React.useState(0)
  const startedRef = React.useRef(false)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setDisplay(value)
      return
    }

    let raf = 0
    const start = () => {
      if (startedRef.current) return
      startedRef.current = true
      const t0 = performance.now()
      const from = 0
      const to = value
      const ease = (t: number) => 1 - Math.pow(1 - t, 4)

      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / duration)
        setDisplay(Math.round(from + (to - from) * ease(t)))
        if (t < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }

    if (typeof IntersectionObserver === "undefined") {
      start()
      return () => cancelAnimationFrame(raf)
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          start()
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(node)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration])

  return (
    <span
      ref={ref}
      className={className}
      aria-label={ariaLabel ?? String(value)}
    >
      {display}
    </span>
  )
}
