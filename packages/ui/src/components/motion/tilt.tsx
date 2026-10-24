"use client"

import * as React from "react"
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react"
import type { HTMLMotionProps } from "motion/react"

import { easeOutSoft, hoverTween } from "../../lib/motion"
import { cn } from "../../lib/utils"

/** Cap — mild media tilt only (≤6–8°). Never Button / Menu chrome. */
export const TILT_ROTATION_MAX = 8

const settle = {
  type: "tween" as const,
  duration: hoverTween.duration,
  ease: easeOutSoft,
}

export type TiltProps = HTMLMotionProps<"div"> & {
  /** Max rotate in degrees. Clamped ≤ {@link TILT_ROTATION_MAX}. Default 6. */
  rotationFactor?: number
  /** CSS perspective in px. Default 800. */
  perspective?: number
}

/**
 * Mild 3D tilt toward the pointer — media / PreviewCard only.
 * Real-time rotate on move; tween settle on leave. Reduced motion → static.
 */
export function Tilt({
  rotationFactor = 6,
  perspective = 800,
  className,
  style,
  onPointerMove,
  onPointerLeave,
  children,
  ...props
}: TiltProps) {
  const reduce = useReducedMotion()
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const max = Math.min(Math.max(rotationFactor, 0), TILT_ROTATION_MAX)

  const handleMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      onPointerMove?.(e)
      if (e.defaultPrevented) return
      const rect = e.currentTarget.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      rotateX.set(-py * max * 2)
      rotateY.set(px * max * 2)
    },
    [max, onPointerMove, rotateX, rotateY]
  )

  const handleLeave = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      onPointerLeave?.(e)
      if (e.defaultPrevented) return
      animate(rotateX, 0, settle)
      animate(rotateY, 0, settle)
    },
    [onPointerLeave, rotateX, rotateY]
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
      style={{
        rotateX,
        rotateY,
        transformPerspective: perspective,
        transformStyle: "preserve-3d",
        ...style,
      }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...props}
    >
      {children}
    </motion.div>
  )
}
