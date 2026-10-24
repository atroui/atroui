"use client"

import * as React from "react"
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react"

import { easeOutSoft, hoverTween } from "@/lib/motion"
import { cn } from "@/lib/utils"

const settle = {
  type: "tween" as const,
  duration: hoverTween.duration,
  ease: easeOutSoft,
}

export type MagicCardProps = {
  children: React.ReactNode
  className?: string
  /** Spotlight diameter in px. Default 280. */
  size?: number
  /** Show border glow on hover. Default true. */
  glow?: boolean
}

/**
 * Magic card — cursor spotlight + brand border glow.
 * Soft-rect panel; tokens only (brand/border). Reduced motion → plain card.
 */
export function MagicCard({
  children,
  className,
  size = 280,
  glow = true,
}: MagicCardProps) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const wash = useMotionValue(0)

  if (reduce) {
    return (
      <div
        className={cn(
          "ds-elev-card relative overflow-hidden rounded-[var(--atro-panel-radius,var(--radius))] bg-card",
          className
        )}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "ds-elev-card relative isolate overflow-hidden rounded-[var(--atro-panel-radius,var(--radius))] bg-card",
        glow && "ds-hover-lift",
        className
      )}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - rect.left)
        y.set(e.clientY - rect.top)
      }}
      onPointerEnter={() => animate(wash, 1, settle)}
      onPointerLeave={() => animate(wash, 0, settle)}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-10 rounded-full"
        style={{
          width: size,
          height: size,
          left: x,
          top: y,
          x: "-50%",
          y: "-50%",
          opacity: wash,
          background: `radial-gradient(circle, color-mix(in oklch, var(--brand) 14%, transparent), transparent 70%)`,
        }}
      />
    </div>
  )
}
