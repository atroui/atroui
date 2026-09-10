"use client"

import { Children, type CSSProperties, type ReactNode } from "react"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export type OrbitingCirclesProps = {
  className?: string
  children: ReactNode
  /** Orbit radius in px. Default 90. */
  radius?: number
  /** Loop duration in seconds. Default 20. */
  duration?: number
  /** Reverse direction. Default false. */
  reverse?: boolean
  /** Start delay in seconds. Default 0. */
  delay?: number
}

function OrbitTile({ children }: { children: ReactNode }) {
  return (
    <div className="flex size-9 items-center justify-center rounded-[var(--atro-control-radius,var(--radius))] border border-border-subtle bg-card text-foreground shadow-sm">
      {children}
    </div>
  )
}

/**
 * Orbiting circles — icons orbit a center node.
 * Stack two with different radius/duration for integration art.
 * Reduced motion → static ring (same geometry, no spin).
 */
export function OrbitingCircles({
  className,
  children,
  radius = 90,
  duration = 20,
  reverse = false,
  delay = 0,
}: OrbitingCirclesProps) {
  const reduce = useReducedMotion()
  const kids = Children.toArray(children)
  const size = radius * 2 + 40

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {!reduce && (
        <style>{`@keyframes atro-orbit { from { transform: rotate(0deg) translateX(var(--atro-orbit-r, 90px)) rotate(0deg); } to { transform: rotate(360deg) translateX(var(--atro-orbit-r, 90px)) rotate(-360deg); } }`}</style>
      )}
      <div
        aria-hidden
        className="absolute rounded-full border border-border-subtle"
        style={{ width: radius * 2, height: radius * 2 }}
      />
      {kids.map((child, i) => {
        if (reduce) {
          const angle = (i / Math.max(kids.length, 1)) * Math.PI * 2 - Math.PI / 2
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          return (
            <div
              key={i}
              className="absolute"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              <OrbitTile>{child}</OrbitTile>
            </div>
          )
        }

        return (
          <div
            key={i}
            className="absolute"
            style={
              {
                "--atro-orbit-r": `${radius}px`,
                animation: `atro-orbit ${duration}s linear infinite ${reverse ? "reverse" : "normal"}`,
                animationDelay: `${delay + (i * duration) / Math.max(kids.length, 1)}s`,
              } as CSSProperties
            }
          >
            <OrbitTile>{child}</OrbitTile>
          </div>
        )
      })}
    </div>
  )
}
