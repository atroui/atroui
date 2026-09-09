"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { layoutTween } from "../../lib/motion"
import { cn } from "../../lib/utils"

export type CopyStatusIconProps = {
  copied: boolean
  idle: React.ReactNode
  done: React.ReactNode
  className?: string
}

/**
 * Shared Copy → Check icon swap (layoutTween). Used by CopyButton and
 * specialized install/code chrome that cannot mount a full Button.
 */
export function CopyStatusIcon({
  copied,
  idle,
  done,
  className,
}: CopyStatusIconProps) {
  const reduce = useReducedMotion()

  return (
    <span
      className={cn(
        "relative inline-flex size-[1em] shrink-0 items-center justify-center",
        className,
      )}
    >
      {reduce ? (
        <span className="inline-flex">{copied ? done : idle}</span>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "copied" : "idle"}
            className="inline-flex"
            initial={{ opacity: 0, scale: 0.65, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.65, y: -4 }}
            transition={layoutTween}
          >
            {copied ? done : idle}
          </motion.span>
        </AnimatePresence>
      )}
    </span>
  )
}
