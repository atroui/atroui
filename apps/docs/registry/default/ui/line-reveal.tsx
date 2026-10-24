"use client"

import { motion, useReducedMotion } from "motion/react"

import {
  enterTween,
  easeOutExpo,
  stagger as clampStagger,
} from "@/lib/motion"
import { cn } from "@/lib/utils"

type LineRevealProps = {
  children: string
  className?: string
  /** Split by word (default) or by line breaks. */
  by?: "word" | "line"
  /** Stagger between units — clamped ≤50ms for kit; pass through clamp. */
  stagger?: number
  once?: boolean
  preview?: boolean
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div"
}

/**
 * Marketing / essay enter — clipped opacity + y stagger.
 * The only recommended text enter for landing sections (no blur / scramble).
 */
export function LineReveal({
  children,
  className,
  by = "word",
  stagger: staggerProp = 0.04,
  once = true,
  preview = false,
  as: Tag = "p",
}: LineRevealProps) {
  const reduce = useReducedMotion()
  const units =
    by === "line"
      ? children.split(/\n+/).filter(Boolean)
      : children.split(/(\s+)/).filter((p) => p.length > 0)

  if (reduce) {
    return <Tag className={className}>{children}</Tag>
  }

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: clampStagger(staggerProp),
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: enterTween(0.32, easeOutExpo),
    },
  }

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial="hidden"
      {...(preview
        ? { animate: "show" as const }
        : {
            whileInView: "show" as const,
            viewport: { once, amount: 0.2 },
          })}
      variants={container}
      role="text"
      aria-label={children}
    >
      <Tag className="m-0">
        {units.map((unit, i) => (
          <motion.span
            key={`${unit}-${i}`}
            className="inline-block"
            variants={item}
            aria-hidden
          >
            {unit === " " ? "\u00A0" : unit}
            {by === "line" && i < units.length - 1 ? <br /> : null}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  )
}
