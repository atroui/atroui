"use client"

import { motion, useReducedMotion } from "motion/react"
import { usePathname } from "next/navigation"
import { easeOutSoft, PAGE_ENTER_Y } from "@/lib/motion"

/**
 * Docs article continuity — chapter content re-enters once per route.
 * Opacity + y only. No blur: animating filter on the full article forces
 * a repaint of every preview + code block each frame, which reads as a
 * jerk when stepping laterally between component pages. Reduced motion →
 * instant.
 */
export function DocsPageFade({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const reduce = useReducedMotion()

  return (
    <motion.div
      key={pathname}
      initial={reduce ? false : { opacity: 0, y: PAGE_ENTER_Y }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduce
          ? { duration: 0 }
          : { type: "tween", duration: 0.2, ease: easeOutSoft }
      }
    >
      {children}
    </motion.div>
  )
}
