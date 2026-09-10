"use client"

import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export type AuroraTextProps = {
  className?: string
  children: React.ReactNode
  /** Loop duration in seconds. Default 8. */
  duration?: number
}

/**
 * Aurora text — slow brand gradient sweep on display words.
 * Padding guards descender clip; reduced motion → static brand text.
 */
export function AuroraText({ className, children, duration = 8 }: AuroraTextProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <span className={cn("text-brand", className)}>{children}</span>
  }

  return (
    <span
      className={cn("inline-block bg-clip-text text-transparent", className)}
      style={{
        paddingBlock: "0.08em 0.12em",
        backgroundImage: `linear-gradient(100deg, var(--foreground) 10%, var(--brand-hover) 40%, var(--brand) 55%, var(--foreground) 75%)`,
        backgroundSize: "220% 100%",
        animation: `atro-aurora ${duration}s ease-in-out infinite alternate`,
      }}
    >
      <style>{`@keyframes atro-aurora { from { background-position: 0% 50%; } to { background-position: 100% 50%; } }`}</style>
      {children}
    </span>
  )
}
