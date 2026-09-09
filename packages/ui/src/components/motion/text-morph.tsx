"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { layoutTween } from "../../lib/motion"
import { cn } from "../../lib/utils"

type TextMorphProps = {
  children: string
  className?: string
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "label"
  /**
   * Stable id prefix for layoutIds when multiple TextMorphs share a tree.
   * Defaults to a React id.
   */
  morphId?: string
}

/**
 * Shared-letter morph between label strings (Idle → Loading → Done).
 * Opt-in — too heavy as a default on every Button.
 * Family Values: letters travel; reduced motion crossfades the whole string.
 */
export function TextMorph({
  children,
  className,
  as: Tag = "span",
  morphId,
}: TextMorphProps) {
  const reduce = useReducedMotion()
  const reactId = React.useId()
  const id = morphId ?? reactId

  if (reduce) {
    return (
      <Tag className={cn("inline-block", className)} aria-label={children}>
        {children}
      </Tag>
    )
  }

  const chars = Array.from(children)
  const counts = new Map<string, number>()

  return (
    <Tag className={cn("inline-flex flex-wrap whitespace-pre-wrap", className)} aria-label={children}>
      <AnimatePresence mode="popLayout" initial={false}>
        {chars.map((char) => {
          const n = counts.get(char) ?? 0
          counts.set(char, n + 1)
          const layoutId = `${id}-${char === " " ? "space" : char}-${n}`
          return (
            <motion.span
              key={layoutId}
              layoutId={layoutId}
              className="inline-block"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={layoutTween}
              aria-hidden
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          )
        })}
      </AnimatePresence>
    </Tag>
  )
}
