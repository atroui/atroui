"use client"

import { motion, useReducedMotion } from "motion/react"
import { easeOutSoft } from "@/lib/motion"

/** Subtle scroll reveal — Zed-calm, not blur-stagger soup. */
export function LandingReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "-40px" }}
      transition={{
        duration: 0.3,
        delay,
        ease: easeOutSoft,
      }}
    >
      {children}
    </motion.div>
  )
}
