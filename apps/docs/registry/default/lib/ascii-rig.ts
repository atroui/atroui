/**
 * ASCII rig — shared machinery for the ascii-* family.
 *
 * Characters are pixels. One place for:
 * - luminance ramps (dim → bright, ordered for direct indexing)
 * - one rAF tick loop that pauses offscreen and honors reduced motion
 * - canvas cell metrics so effects draw at exact character-cell width
 *
 * No dependencies. Monospace cells are 1:2 (w:h) unless a component opts out.
 */

import * as React from "react"

/** Dim → bright ramps. Index by normalized value 0..len-1. */
export const ASCII_RAMPS = {
  /** The classic donut.c ramp — thin for highlights, dense for body. */
  classic: ".,-~:;=!*#$@",
  /** Even ladder, good for field effects. */
  ladder: " `./:;+*xOX#",
  /** Half blocks — flat bands, minimal texture. */
  blocks: "░▒▓█",
  /** Newskool scene look — chunky, high contrast. */
  newskool: "▓$#Xxo",
} as const

export type AsciiRampName = keyof typeof ASCII_RAMPS

/** Resolve a ramp by literal string or named key. */
export function resolveAsciiRamp(ramp: string): string {
  const named = ASCII_RAMPS[ramp as AsciiRampName]
  return named ?? ramp
}

/** Character at a normalized 0..1 position of a ramp. */
export function rampAt(ramp: string, v01: number): string {
  const i = Math.min(
    ramp.length - 1,
    Math.max(0, Math.floor(v01 * ramp.length))
  )
  return ramp[i] ?? ramp[0] ?? " "
}

/** Computed `color` of an element — canvas-safe on any accent or surface. */
export function readAsciiColor(el: Element | null): string {
  if (!el) return "#e5e7eb"
  return getComputedStyle(el).color
}

/**
 * One tick loop for an effect.
 * - `prefers-reduced-motion` → a single draw(0, 0) frame, then done
 * - offscreen (IntersectionObserver, 64px rootMargin) → paused, zero work
 * - throttled to `fps`; dt is clamped to 0.2s to survive tab switches
 */
export function useAsciiTick(
  host: React.RefObject<Element | null>,
  draw: (t: number, dt: number) => void,
  opts?: { fps?: number }
) {
  const { fps = 16 } = opts ?? {}
  const drawRef = React.useRef(draw)
  React.useEffect(() => {
    drawRef.current = draw
  })

  React.useEffect(() => {
    if (typeof window === "undefined") return
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches
    const el = host.current
    if (reduced || !el) {
      drawRef.current(0, 0)
      return
    }

    let raf = 0
    let last = 0
    let t0 = 0
    const step = (now: number) => {
      raf = requestAnimationFrame(step)
      const min = 1000 / fps
      if (last && now - last < min - 2) return
      const dt = last ? Math.min((now - last) / 1000, 0.2) : 0.016
      last = now
      t0 ||= now
      drawRef.current((now - t0) / 1000, dt)
    }
    const run = () => {
      if (raf) return
      last = 0
      t0 = performance.now()
      raf = requestAnimationFrame(step)
    }
    const stop = () => {
      if (!raf) return
      cancelAnimationFrame(raf)
      raf = 0
    }

    const io = new IntersectionObserver(
      (entries) => (entries[0]?.isIntersecting ? run() : stop()),
      { rootMargin: "64px" }
    )
    io.observe(el)
    return () => {
      stop()
      io.disconnect()
    }
  }, [fps, host])
}

/**
 * Size a canvas to cols × rows character cells, DPR-crisp, and hand back a
 * context whose monospace advance width is exactly `cellW`px. Call each frame
 * (cheap: only re-allocates when the grid actually changes).
 */
export function setupAsciiCanvas(
  canvas: HTMLCanvasElement,
  cols: number,
  rows: number,
  cellW = 10
) {
  const cellH = cellW * 2
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = Math.round(cols * cellW)
  const h = Math.round(rows * cellH)
  if (canvas.width !== w * dpr) canvas.width = w * dpr
  if (canvas.height !== h * dpr) canvas.height = h * dpr
  const style = canvas.style
  if (style.width !== `${w}px`) style.width = `${w}px`
  if (style.height !== `${h}px`) style.height = `${h}px`

  const ctx = canvas.getContext("2d")
  if (!ctx) return null
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  // Lock the advance width to the cell so column math is pixel-exact.
  ctx.font = "100px ui-monospace, SFMono-Regular, Menlo, monospace"
  const probe = ctx.measureText("M").width || 60
  const px = Math.round((cellW / probe) * 100 * 100) / 100
  ctx.font = `${px}px ui-monospace, SFMono-Regular, Menlo, monospace`
  ctx.textBaseline = "top"
  return { ctx, cellW, cellH, w, h }
}
