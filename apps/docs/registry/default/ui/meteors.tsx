"use client"

import * as React from "react"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export type MeteorsProps = {
  className?: string
  /** Meteor count. Default 20. */
  count?: number
}

/**
 * Meteors — thin brand-tinted streaks falling across a hero.
 * CSS-only, capped count. Reduced motion → none.
 */
export function Meteors({ className, count = 20 }: MeteorsProps) {
  const reduce = useReducedMotion()
  const drops = React.useMemo(
    () =>
      Array.from({ length: Math.min(Math.max(count, 0), 40) }, (_, i) => ({
        id: i,
        left: `${(i * 53 + 11) % 100}%`,
        delay: `${(i * 0.7) % 6}s`,
        duration: `${5 + ((i * 1.3) % 5)}s`,
        width: i % 3 === 0 ? 2 : 1,
      })),
    [count]
  )

  if (reduce) return null

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <style>{`@keyframes atro-meteor-fall { 0% { transform: translateY(-10%) translateX(0) rotate(18deg); opacity: 0; } 10% { opacity: 1; } 100% { transform: translateY(420px) translateX(-140px) rotate(18deg); opacity: 0; } }`}</style>
      {drops.map((d) => (
        <span
          key={d.id}
          className="absolute top-0 h-24 rounded-full"
          style={{
            left: d.left,
            width: d.width,
            animation: `atro-meteor-fall ${d.duration} linear infinite`,
            animationDelay: d.delay,
            background: `linear-gradient(to bottom, transparent, color-mix(in oklch, var(--brand) 60%, transparent))`,
          }}
        />
      ))}
    </div>
  )
}
