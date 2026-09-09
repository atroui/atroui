"use client"

import { motion, useReducedMotion } from "motion/react"
import type { HTMLMotionProps } from "motion/react"

import { inViewTween } from "../../lib/motion"

export type FadeInProps = HTMLMotionProps<"div"> & {
  y?: number
  delay?: number
  duration?: number
  once?: boolean
  /** Intersection amount — 0–1 or Motion keywords. */
  amount?: number | "some" | "all"
  /** Viewport margin (e.g. `"-40px"` triggers earlier — landing feel). */
  margin?: string
  /**
   * Docs: animate on mount instead of scroll-reveal so the
   * content is never stuck at opacity 0 inside a preview canvas.
   */
  preview?: boolean
}

/**
 * The scroll reveal — opacity + small y, shared tween tokens.
 * One primitive for cards, sections, and landing (pass `margin` / `amount` for section feel).
 */
export function FadeIn({
  y = 14,
  delay = 0,
  duration = inViewTween.duration,
  once = true,
  amount = 0.15,
  margin = "0px",
  preview = false,
  children,
  ...props
}: FadeInProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>
        {children as React.ReactNode}
      </div>
    )
  }

  const transition = {
    ...inViewTween,
    duration,
    delay,
  }

  if (preview) {
    return (
      <motion.div
        initial={{ opacity: 0, y }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin, amount }}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/** Landing / marketing section defaults for {@link FadeIn}. */
export const fadeInSection = {
  y: 10,
  amount: 0.2 as const,
  margin: "-40px",
}
