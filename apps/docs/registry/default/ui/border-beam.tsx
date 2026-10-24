"use client"

import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export type BorderBeamProps = {
  className?: string
  /** Beam length in degrees of the conic wash. Default 80. */
  size?: number
  /** Loop duration in seconds. Default 6. */
  duration?: number
  /** Start delay in seconds. Default 0. */
  delay?: number
  /** Reverse direction. Default false. */
  reverse?: boolean
  /** Hairline thickness in px. Default 1. */
  borderWidth?: number
}

/**
 * Border beam — light travels along the container edge.
 * Brand-tinted conic wash masked to a rim; parent needs relative +
 * overflow-hidden + panel radius. Reduced motion → static hairline.
 */
export function BorderBeam({
  className,
  size = 80,
  duration = 6,
  delay = 0,
  reverse = false,
  borderWidth = 1,
}: BorderBeamProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", className)}
        style={{
          boxShadow: `inset 0 0 0 ${borderWidth}px color-mix(in oklch, var(--brand) 45%, transparent)`,
        }}
      />
    )
  }

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        className
      )}
      style={{
        padding: borderWidth,
        // Rim-only mask: paint the padding ring, punch out the content box.
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
        WebkitMaskComposite: "xor",
      }}
    >
      <style>{`@keyframes atro-beam-spin { to { transform: rotate(360deg); } }`}</style>
      <div
        className="absolute inset-0"
        style={{
          animation: `atro-beam-spin ${duration}s linear infinite ${reverse ? "reverse" : "normal"}`,
          animationDelay: `${delay}s`,
          background: `conic-gradient(from 0deg, transparent 0deg, color-mix(in oklch, var(--brand) 70%, transparent) ${size}deg, transparent ${size * 2}deg)`,
        }}
      />
    </div>
  )
}
