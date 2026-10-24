"use client"

import * as React from "react"
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react"
import type { HTMLMotionProps } from "motion/react"

import { easeOutSoft, hoverTween } from "@/lib/motion"
import { cn } from "@/lib/utils"

/** Cap — media cards only; never Button / Menu chrome. */
export const MAGNETIC_INTENSITY_MAX = 0.35
export const MAGNETIC_RANGE_MAX = 80

const settle = {
  type: "tween" as const,
  duration: hoverTween.duration,
  ease: easeOutSoft,
}

export type MagneticProps = HTMLMotionProps<"div"> & {
  /** Pull strength toward pointer. Clamped ≤ {@link MAGNETIC_INTENSITY_MAX}. Default 0.25. */
  intensity?: number
  /** Active radius in px. Clamped ≤ {@link MAGNETIC_RANGE_MAX}. Default 48. */
  range?: number
}

/**
 * Mild magnetic pull toward the pointer — media / PreviewCard only.
 * Real-time set on move; tween settle (bounce:0) on leave. Reduced motion → static.
 */
export function Magnetic({
  intensity = 0.25,
  range = 48,
  className,
  style,
  onPointerMove,
  onPointerLeave,
  children,
  ...props
}: MagneticProps) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const strength = Math.min(Math.max(intensity, 0), MAGNETIC_INTENSITY_MAX)
  const maxRange = Math.min(Math.max(range, 0), MAGNETIC_RANGE_MAX)

  const handleMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      onPointerMove?.(e)
      if (e.defaultPrevented) return
      const rect = e.currentTarget.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      const dist = Math.hypot(dx, dy)
      const scale = dist > maxRange && dist > 0 ? maxRange / dist : 1
      x.set(dx * strength * scale)
      y.set(dy * strength * scale)
    },
    [maxRange, onPointerMove, strength, x, y]
  )

  const handleLeave = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      onPointerLeave?.(e)
      if (e.defaultPrevented) return
      animate(x, 0, settle)
      animate(y, 0, settle)
    },
    [onPointerLeave, x, y]
  )

  if (reduce) {
    return (
      <div
        className={cn(className)}
        style={style as React.CSSProperties}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children as React.ReactNode}
      </div>
    )
  }

  return (
    <motion.div
      className={cn(className)}
      style={{ x, y, ...style }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...props}
    >
      {children}
    </motion.div>
  )
}
