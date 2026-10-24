"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export type AnimatedBeamProps = {
  containerRef: React.RefObject<HTMLElement | null>
  fromRef: React.RefObject<HTMLElement | null>
  toRef: React.RefObject<HTMLElement | null>
  className?: string
  /** Beam curvature in px. Default 0. */
  curvature?: number
  /** Loop duration in seconds. Default 5. */
  duration?: number
  /** Start delay in seconds. Default 0. */
  delay?: number
  /** Reverse direction. Default false. */
  reverse?: boolean
}

/**
 * Animated beam — light travels an SVG path between two nodes.
 * For integration diagrams. Brand gradient on subtle track.
 * Reduced motion → static track.
 */
export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  className,
  curvature = 0,
  duration = 5,
  delay = 0,
  reverse = false,
}: AnimatedBeamProps) {
  const reduce = useReducedMotion()
  const gradientId = React.useId().replace(/:/g, "")
  const [path, setPath] = React.useState<string>("M 0 0 L 0 0")
  const [size, setSize] = React.useState({ w: 0, h: 0 })

  React.useEffect(() => {
    const update = () => {
      const c = containerRef.current
      const f = fromRef.current
      const t = toRef.current
      if (!c || !f || !t) return
      const cb = c.getBoundingClientRect()
      const fb = f.getBoundingClientRect()
      const tb = t.getBoundingClientRect()
      const x1 = fb.left - cb.left + fb.width / 2
      const y1 = fb.top - cb.top + fb.height / 2
      const x2 = tb.left - cb.left + tb.width / 2
      const y2 = tb.top - cb.top + tb.height / 2
      const mx = (x1 + x2) / 2
      const my = (y1 + y2) / 2 - curvature
      // Reverse swaps endpoints so travel reads the other way.
      setPath(
        reverse
          ? `M ${x2} ${y2} Q ${mx} ${my} ${x1} ${y1}`
          : `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`
      )
      setSize({ w: cb.width, h: cb.height })
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [containerRef, fromRef, toRef, curvature, reverse])

  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      width={size.w}
      height={size.h}
      viewBox={`0 0 ${size.w} ${size.h}`}
      fill="none"
    >
      <path
        d={path}
        stroke="var(--border-subtle)"
        strokeWidth={1.5}
        strokeOpacity={0.6}
      />
      {reduce ? (
        <path d={path} stroke="var(--brand)" strokeWidth={1.5} strokeOpacity={0.5} />
      ) : (
        <motion.path
          d={path}
          stroke={`url(#${gradientId})`}
          strokeWidth={1.5}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.15, 0.85, 1],
          }}
        />
      )}
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--brand)" />
          <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export type AnimatedBeamFanProps = {
  containerRef: React.RefObject<HTMLElement | null>
  fromRef: React.RefObject<HTMLElement | null>
  /** One or more target nodes — one beam each. */
  toRefs: React.RefObject<HTMLElement | null>[]
  className?: string
  /** Beam curvature in px. Default 0. */
  curvature?: number
  /** Loop duration in seconds per beam. Default 5. */
  duration?: number
  /** Stagger between beams in seconds. Default 0.8. */
  stagger?: number
  /** Reverse travel direction. Default false. */
  reverse?: boolean
}

/**
 * Animated beam fan — one hub fanning out to many targets.
 * For integration hubs (one source → N tools). Staggered loops,
 * shared brand gradient. Reduced motion → static tracks.
 */
export function AnimatedBeamFan({
  containerRef,
  fromRef,
  toRefs,
  className,
  curvature = 0,
  duration = 5,
  stagger = 0.8,
  reverse = false,
}: AnimatedBeamFanProps) {
  const reduce = useReducedMotion()
  const gradientId = React.useId().replace(/:/g, "")
  const [paths, setPaths] = React.useState<string[]>([])
  const [size, setSize] = React.useState({ w: 0, h: 0 })

  React.useEffect(() => {
    const update = () => {
      const c = containerRef.current
      const f = fromRef.current
      if (!c || !f) return
      const cb = c.getBoundingClientRect()
      const fb = f.getBoundingClientRect()
      const x1 = fb.left - cb.left + fb.width / 2
      const y1 = fb.top - cb.top + fb.height / 2
      const next = toRefs.map((ref) => {
        const t = ref.current
        if (!t) return "M 0 0 L 0 0"
        const tb = t.getBoundingClientRect()
        const x2 = tb.left - cb.left + tb.width / 2
        const y2 = tb.top - cb.top + tb.height / 2
        const mx = (x1 + x2) / 2
        const my = (y1 + y2) / 2 - curvature
        return reverse
          ? `M ${x2} ${y2} Q ${mx} ${my} ${x1} ${y1}`
          : `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`
      })
      setPaths(next)
      setSize({ w: cb.width, h: cb.height })
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [containerRef, fromRef, toRefs, curvature, reverse])

  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      width={size.w}
      height={size.h}
      viewBox={`0 0 ${size.w} ${size.h}`}
      fill="none"
    >
      {paths.map((d, i) => (
        <path
          key={`track-${i}`}
          d={d}
          stroke="var(--border-subtle)"
          strokeWidth={1.5}
          strokeOpacity={0.6}
        />
      ))}
      {reduce
        ? paths.map((d, i) => (
            <path
              key={`static-${i}`}
              d={d}
              stroke="var(--brand)"
              strokeWidth={1.5}
              strokeOpacity={0.5}
            />
          ))
        : paths.map((d, i) => (
            <motion.path
              key={`beam-${i}`}
              d={d}
              stroke={`url(#${gradientId})`}
              strokeWidth={1.5}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
              transition={{
                duration,
                delay: i * stagger,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.15, 0.85, 1],
              }}
            />
          ))}
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--brand)" />
          <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
