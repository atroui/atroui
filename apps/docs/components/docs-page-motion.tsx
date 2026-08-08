"use client"

import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { pageFade } from "@/lib/motion"

/**
 * Lateral docs navigation — soft fade (no false depth).
 * Family: fly between places without teleport flicker.
 */
export function DocsPageMotion({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const reduce = useReducedMotion()

  if (reduce) {
    return <>{children}</>
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={pageFade}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
