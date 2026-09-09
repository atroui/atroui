"use client"

import { motion, useReducedMotion } from "motion/react"
import type { HTMLMotionProps } from "motion/react"

import { enterTween, easeOutSoft, stagger as clampStagger } from "@/lib/motion"

type StaggerProps = HTMLMotionProps<"div"> & {
  delay?: number
  stagger?: number
  once?: boolean
  /** Docs: play on mount instead of waiting for scroll. */
  preview?: boolean
}

/**
 * Scroll-triggered stagger group.
 * List chrome defaults clamp via {@link clampStagger} (≤50ms).
 * Pass a larger `stagger` only for landing hero beats (not clamped above max —
 * use `landing` lane intentionally by passing ≤0.05 for lists).
 */
export function Stagger({
  delay = 0,
  stagger: staggerProp = 0.04,
  once = true,
  preview = false,
  children,
  ...props
}: StaggerProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>
        {children as React.ReactNode}
      </div>
    )
  }

  const transition = {
    delayChildren: delay,
    staggerChildren: clampStagger(staggerProp),
  }

  return (
    <motion.div
      initial="hidden"
      {...(preview
        ? { animate: "show" as const }
        : {
            whileInView: "show" as const,
            viewport: { once, margin: "0px", amount: 0.15 },
          })}
      variants={{
        hidden: {},
        show: { transition },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

type ChildProps = HTMLMotionProps<"div"> & { y?: number }

export function StaggerChild({ y = 14, children, ...props }: ChildProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>
        {children as React.ReactNode}
      </div>
    )
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: enterTween(0.26, easeOutSoft),
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
