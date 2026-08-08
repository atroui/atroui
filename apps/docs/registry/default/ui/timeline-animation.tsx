"use client"

import type { Variants } from "motion/react"
import {
  type HTMLMotionProps,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react"
import type React from "react"

type TimelineContentProps<T extends keyof HTMLElementTagNameMap> = {
  children?: React.ReactNode
  animationNum: number
  className?: string
  timelineRef: React.RefObject<HTMLElement | null>
  as?: T
  customVariants?: Variants
  once?: boolean
} & HTMLMotionProps<T>

export const TimelineAnimation = <
  T extends keyof HTMLElementTagNameMap = "div",
>({
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

  const defaultSequenceVariants: Variants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: reduce ? 0 : i * 0.5,
        duration: reduce ? 0 : 0.5,
      },
    }),
    hidden: {
      y: reduce ? 0 : 8,
      opacity: reduce ? 1 : 0,
    },
  }

  const sequenceVariants = customVariants || defaultSequenceVariants

  const isInView = useInView(timelineRef, {
    once,
  })

  const MotionComponent = motion[as || "div"] as React.ElementType

  return (
    <MotionComponent
      initial={reduce ? false : "hidden"}
      animate={reduce || isInView ? "visible" : "hidden"}
      custom={animationNum}
      variants={sequenceVariants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}
