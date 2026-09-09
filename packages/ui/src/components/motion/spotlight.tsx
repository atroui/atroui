"use client"

import * as React from "react"
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react"

import { easeOutSoft, hoverTween } from "../../lib/motion"
import { cn } from "../../lib/utils"

const settle = {
  type: "tween" as const,
  duration: hoverTween.duration,
  ease: easeOutSoft,
}

export type SpotlightProps = {
  children: React.ReactNode
  className?: string
  /** Spotlight diameter in px. Default 240. */
  size?: number
  /** Wash opacity — keep low on dark Mira cards. Default 0.12. */
  opacity?: number
  /** Spotlight color. Default white. */
  color?: string
}

/**
 * Low-opacity cursor wash for dark media cards.
 * Overlay only — reduced motion skips the wash.
 */
export function Spotlight({
  children,
  className,
  size = 240,
  opacity = 0.12,
  color = "#ffffff",
}: SpotlightProps) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const wash = useMotionValue(0)

  if (reduce) {
    return <div className={cn("relative", className)}>{children}</div>
  }

  return (
    <div
      className={cn("relative isolate overflow-hidden", className)}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - rect.left)
        y.set(e.clientY - rect.top)
      }}
      onPointerEnter={() => {
        animate(wash, opacity, settle)
      }}
      onPointerLeave={() => {
        animate(wash, 0, settle)
      }}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-10 rounded-full"
        style={{
          width: size,
          height: size,
          left: x,
          top: y,
          x: "-50%",
          y: "-50%",
          opacity: wash,
          background: `radial-gradient(circle, color-mix(in oklch, ${color} 100%, transparent), transparent 70%)`,
        }}
      />
    </div>
  )
}
