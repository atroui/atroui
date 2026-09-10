"use client"

import * as React from "react"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export type MarqueeProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Reverse scroll direction. Default false. */
  reverse?: boolean
  /** Pause on hover / focus-within. Default true. */
  pauseOnHover?: boolean
  /** Vertical scroll. Default false. */
  vertical?: boolean
  /** Repeat count for seamless loop. Default 2. */
  repeat?: number
  /** Duration in seconds for one loop. Default 40. */
  duration?: number
}

/**
 * Infinite marquee — logo / testimonial strips.
 * Token-agnostic shell; children carry color. Reduced motion → scrollable row.
 */
export function Marquee({
  reverse = false,
  pauseOnHover = true,
  vertical = false,
  repeat = 2,
  duration = 40,
  className,
  children,
  ...props
}: MarqueeProps) {
  const reduce = useReducedMotion()
  const items = React.useMemo(
    () => Array.from({ length: Math.max(repeat, 1) }, (_, i) => i),
    [repeat]
  )

  if (reduce) {
    return (
      <div
        className={cn(
          "flex overflow-auto",
          vertical ? "max-h-48 flex-col" : "flex-row",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      data-slot="marquee"
      className={cn(
        "group/marquee relative flex overflow-hidden",
        vertical ? "flex-col" : "flex-row",
        className
      )}
      {...props}
    >
      <style>{`@keyframes atro-marquee-x { from { transform: translateX(0); } to { transform: translateX(-50%); } } @keyframes atro-marquee-y { from { transform: translateY(0); } to { transform: translateY(-50%); } }`}</style>
      {items.map((i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={cn(
            "flex shrink-0 items-center",
            vertical ? "flex-col" : "flex-row",
            pauseOnHover &&
              "group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]"
          )}
          style={{
            animation: `${vertical ? "atro-marquee-y" : "atro-marquee-x"} ${duration}s linear infinite ${reverse ? "reverse" : "normal"}`,
          }}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
