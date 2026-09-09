"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react"
import { SCROLL_HIDE_OFFSET, scrollHideTween } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * Shared floating chrome for SiteHeader + DocsHeader.
 * Soft-rect pill over the page — brand · nav/search · tools.
 *
 * `hideOnScroll` is marketing-shell only (landing / blog / updates).
 * Docs book keeps the quiet sticky bar — never pass hideOnScroll there.
 */
export function SiteChrome({
  leading,
  children,
  center,
  trailing,
  className,
  hideOnScroll = false,
}: {
  leading?: ReactNode
  children?: ReactNode
  /** Center slot — docs search. Takes remaining width and centers the control. */
  center?: ReactNode
  trailing?: ReactNode
  className?: string
  /** Motion scroll-direction hide — marketing shell only. */
  hideOnScroll?: boolean
}) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const canHide = hideOnScroll && !reduce

  useMotionValueEvent(scrollY, "change", (current) => {
    if (!canHide) {
      if (hidden) setHidden(false)
      return
    }
    const previous = scrollY.getPrevious() ?? 0
    const next = current > previous && current > SCROLL_HIDE_OFFSET
    setHidden((prev) => (prev === next ? prev : next))
  })

  return (
    <motion.header
      className={cn(
        "atro-site-chrome",
        center && "atro-site-chrome--docs",
        canHide && hidden && "is-scroll-hidden",
        className
      )}
      style={{ viewTransitionName: "site-header" }}
      animate={
        canHide
          ? {
              y: hidden ? -72 : 0,
              opacity: hidden ? 0 : 1,
            }
          : { y: 0, opacity: 1 }
      }
      transition={reduce ? { duration: 0 } : scrollHideTween}
    >
      <div className="atro-shell atro-site-chrome-inner">
        {leading ? (
          <div className="flex min-w-0 shrink-0 items-center gap-2">
            {leading}
          </div>
        ) : null}
        {children}
        {center ? (
          <div className="atro-site-chrome-center">{center}</div>
        ) : null}
        {trailing ? (
          <div
            className={cn(
              "flex min-w-0 shrink-0 items-center gap-1.5",
              !center && "ml-auto"
            )}
          >
            {trailing}
          </div>
        ) : null}
      </div>
    </motion.header>
  )
}
