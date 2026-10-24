"use client"

import type { Variants } from "motion/react"
import { type HTMLMotionProps, motion, useInView, useReducedMotion } from "motion/react"
import type React from "react"

import { timelineRevealVariants } from "../../lib/motion"

type TimelineContentProps<T extends keyof HTMLElementTagNameMap> = {
  children?: React.ReactNode
  animationNum: number
  className?: string
  timelineRef: React.RefObject<HTMLElement | null>
  as?: T
  customVariants?: Variants
  once?: boolean
} & HTMLMotionProps<T>

/**
 * Sequential in-view reveal for landing / essay sequences.
 * Default: opacity + y only (Family Values — no blur-in).
 */
export const TimelineAnimation = <T extends keyof HTMLElementTagNameMap = "div">({
  children,
  animationNum,
  timelineRef,
  className,
  as,
  customVariants,
  once = true,
  ...props
}: TimelineContentProps<T>) => {
  const reduce = useReducedMotion()
  const sequenceVariants = customVariants || timelineRevealVariants

  const isInView = useInView(timelineRef, {
    once,
  })

  const MotionComponent = motion[as || "div"] as React.ElementType

  if (reduce) {
    const Tag = (as || "div") as React.ElementType
    return (
      <Tag className={className} {...(props as object)}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionComponent
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={animationNum}
      variants={sequenceVariants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}
