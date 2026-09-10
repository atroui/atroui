"use client"

import { motion, useReducedMotion } from "motion/react"
import { usePathname } from "next/navigation"
import {
  PAGE_ENTER_BLUR,
  PAGE_ENTER_Y,
  pageEnterTween,
} from "@/lib/motion"

/**
 * Docs article continuity — chapter content re-enters once per route.
 * Full beat (opacity + y + blur settle); sidebar / TOC / header stay
 * mounted so the page morphs instead of remounting. Reduced motion →
 * instant.
 */
export function DocsPageFade({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const reduce = useReducedMotion()

  return (
    <motion.div
      key={pathname}
      initial={
        reduce
          ? false
          : { opacity: 0, y: PAGE_ENTER_Y, filter: `blur(${PAGE_ENTER_BLUR}px)` }
      }
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={reduce ? { duration: 0 } : pageEnterTween}
    >
      {children}
    </motion.div>
  )
}
