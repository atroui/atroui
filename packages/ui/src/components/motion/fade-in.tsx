"use client"

import { motion, useReducedMotion } from "motion/react"
import type { HTMLMotionProps } from "motion/react"

import { inViewTween } from "../../lib/motion"

export type FadeInProps = HTMLMotionProps<"div"> & {
  y?: number
  delay?: number
  duration?: number
  /** Blur in px paired with the enter — opt-in (`blur={SCROLL_REVEAL_BLUR}`). */
  blur?: number | false
  once?: boolean
  /** Intersection amount — 0–1 or Motion keywords. */
  amount?: number | "some" | "all"
  /** Viewport margin (e.g. `"-40px"` triggers earlier — landing feel). */
  margin?: string
  /**
   * Docs: animate on mount instead of waiting for scroll.
   * content is never stuck at opacity 0 inside a preview canvas.
   */
  preview?: boolean
}

/**
 * The scroll reveal — opacity + y on the section beat.
 * Blur settle is opt-in (`blur={4}` or `SCROLL_REVEAL_BLUR`) — careful delight only.
 */
export function FadeIn({
  y = 14,
  delay = 0,
  duration = inViewTween.duration,
  blur = false,
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
  const useBlur = typeof blur === "number" && blur > 0
  const hidden = useBlur
    ? { opacity: 0, y, filter: `blur(${blur}px)` }
    : { opacity: 0, y }
  const shown = useBlur
    ? { opacity: 1, y: 0, filter: "blur(0px)" }
    : { opacity: 1, y: 0 }

  if (preview) {
    return (
      <motion.div
        initial={hidden}
        animate={shown}
        transition={transition}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={hidden}
      whileInView={shown}
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
