"use client"

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type UseScrollOptions,
} from "motion/react"
import {
  Fragment,
  useEffect,
  useRef,
  type ElementType,
  type RefObject,
} from "react"

import { easeOutSoft } from "../../lib/motion"
import { cn } from "../../lib/utils"

export type WordRevealScrollProps = {
  children: string
  className?: string
  /**
   * Opacity before a word’s scroll slice is reached.
   * Default `0.15` — readable as dim ink, not invisible.
   */
  restingOpacity?: number
  /**
   * Progress window each word fades across (0–1).
   * Motion docs default: last word starts at `1 - wordWindow` (0.8).
   */
  wordWindow?: number
  /** `useScroll` offset. Default in-flow pull-line trigger. */
  offset?: UseScrollOptions["offset"]
  /**
   * External scroll target (sticky stage / tall section).
   * When omitted, the text element itself is the target.
   */
  targetRef?: RefObject<HTMLElement | null>
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div" | "blockquote"
  /**
   * Docs canvases — scrub 0→1 on mount with easeOutSoft
   * instead of requiring page scroll.
   */
  preview?: boolean
}

type WordProps = {
  children: string
  progress: MotionValue<number>
  index: number
  count: number
  restingOpacity: number
  wordWindow: number
}

function Word({
  children,
  progress,
  index,
  count,
  restingOpacity,
  wordWindow,
}: WordProps) {
  const start =
    count === 1 ? 0 : (index / (count - 1)) * (1 - wordWindow)
  const opacity = useTransform(
    progress,
    [start, start + wordWindow],
    [restingOpacity, 1]
  )

  return (
    <motion.span className="inline" style={{ opacity }} aria-hidden>
      {children}
    </motion.span>
  )
}

/**
 * Progress-driven word opacity via `useScroll` + `useTransform`.
 * Opacity only (no blur) — essay / marketing pull lines.
 * Careful delight: one earned scrub, not every paragraph.
 */
export function WordRevealScroll({
  children,
  className,
  restingOpacity = 0.15,
  wordWindow = 0.2,
  offset = ["start 0.85", "start 0.25"],
  targetRef,
  as: Tag = "p",
  preview = false,
}: WordRevealScrollProps) {
  const reduce = useReducedMotion()
  const localRef = useRef<HTMLElement | null>(null)
  const previewProgress = useMotionValue(0)

  const { scrollYProgress } = useScroll({
    target: targetRef ?? localRef,
    offset,
  })

  useEffect(() => {
    if (!preview || reduce) return
    previewProgress.set(0)
    const controls = animate(previewProgress, 1, {
      duration: 1.6,
      ease: easeOutSoft,
    })
    return () => controls.stop()
  }, [preview, reduce, previewProgress, children])

  const progress = preview ? previewProgress : scrollYProgress
  const words = children.trim().split(/\s+/).filter(Boolean)

  if (reduce) {
    const Comp = Tag as ElementType
    return <Comp className={className}>{children}</Comp>
  }

  const Comp = Tag as ElementType

  return (
    <Comp
      ref={targetRef ? undefined : localRef}
      className={cn(className)}
      aria-label={children}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <Word
            progress={progress}
            index={i}
            count={words.length}
            restingOpacity={restingOpacity}
            wordWindow={wordWindow}
          >
            {word}
          </Word>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Comp>
  )
}
