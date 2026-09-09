"use client"

import { motion, useReducedMotion } from "motion/react"
import { usePathname } from "next/navigation"
import { pageFade } from "@/lib/motion"

/**
 * Docs article continuity — chapter content fades in once per route.
 * Sidebar / TOC stay put; only the measure column re-enters.
 */
export function DocsPageFade({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const reduce = useReducedMotion()

  return (
    <motion.div
      key={pathname}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduce ? { duration: 0 } : pageFade}
    >
      {children}
    </motion.div>
  )
}
