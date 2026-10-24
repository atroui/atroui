"use client"

import {
  motion,
  type SpringOptions,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react"
import type { RefObject } from "react"

import { cn } from "@/lib/utils"

export type ScrollProgressProps = {
  className?: string
  /**
   * Opt-in soft spring on scaleX. Default is direct scrollYProgress → scaleX
   * (MotionScore S — compositor prop, no lag).
   */
  springOptions?: SpringOptions
  containerRef?: RefObject<HTMLDivElement | null>
}

/** Quiet settle when callers opt into spring — no default bounce. */
const SOFT_SPRING_OPTIONS: SpringOptions = {
  stiffness: 120,
  damping: 28,
  restDelta: 0.001,
}

export function ScrollProgress({
  className,
  springOptions,
  containerRef,
}: ScrollProgressProps) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    container: containerRef,
  })

  const softScaleX = useSpring(scrollYProgress, {
    ...SOFT_SPRING_OPTIONS,
    ...(springOptions ?? {}),
  })

  // Reduced motion: hide decorative chrome (scrollbar still shows place).
  if (reduce) return null

  // Default: direct progress → scaleX. Soft spring only when opted in.
  const scaleX = springOptions != null ? softScaleX : scrollYProgress

  return (
    <motion.div
      aria-hidden
      className={cn("inset-x-0 top-0 h-1 origin-left", className)}
      style={{
        scaleX,
      }}
    />
  )
}
