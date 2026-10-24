"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { readAsciiColor, setupAsciiCanvas, useAsciiTick } from "@/lib/ascii-rig"

export type AsciiRainProps = {
  /** Columns (streams). Rows derive from the 1:2 cell ratio. */
  cols?: number
  /** Fall-speed multiplier. */
  speed?: number
  /** Characters that fall — any string; position order is random. */
  chars?: string
  /** Accessible description of the decorative scene. */
  label?: string
  className?: string
}

const DEFAULT_CHARS =
  "ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ0123456789Z+*:."

function clampInt(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Math.round(v)))
}

/** Stable pseudo-random 0..1 for a (col,row) cell, so glyphs don't churn. */
function cellHash(col: number, row: number) {
  let h = (col * 73856093) ^ (row * 19349663)
  h = (h ^ (h >> 13)) * 1274126177
  return Math.abs(h % 100000) / 100000
}

type Drop = { y: number; v: number; len: number }

/**
 * ASCII Rain — procedural field effect: per-stream cascades of glyphs whose
 * color fades along each tail. Head cell stays bright; glyph per cell is
 * stable so the field reads solid rather than flickering.
 */
export function AsciiRain({
  cols: colsProp = 52,
  speed = 1,
  chars = DEFAULT_CHARS,
  label = "Falling columns of characters",
  className,
}: AsciiRainProps) {
  const cols = clampInt(colsProp, 16, 120)
  const rows = Math.round(cols * 0.42)
  const hostRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  const dropsRef = React.useRef<Drop[]>([])

  const draw = React.useCallback(
    (t: number, dt: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const setup = setupAsciiCanvas(canvas, cols, rows, 10)
      if (!setup) return
      const { ctx, cellH, cellW } = setup
      ctx.clearRect(0, 0, setup.w, setup.h)
      const color = readAsciiColor(hostRef.current)
      ctx.fillStyle = color

      // Reset streams when the grid shape changes.
      if (dropsRef.current.length !== cols) {
        dropsRef.current = Array.from({ length: cols }, (_, c) => ({
          y: -cellHash(c, 7) * rows * 2,
          v: 5 + cellHash(c, 11) * 9,
          len: 6 + Math.round(cellHash(c, 13) * 10),
        }))
      }

      for (let c = 0; c < cols; c++) {
        const drop = dropsRef.current[c]!
        const head = Math.floor(drop.y)
        for (let r = 1; r <= drop.len; r++) {
          const row = head - r
          if (row < 0 || row >= rows) continue
          const fade = 1 - r / drop.len
          const a = Math.pow(fade, 1.7) * 0.9
          if (a < 0.04) continue
          ctx.globalAlpha = r === 1 ? 1 : a
          const ch =
            chars[
              Math.floor(cellHash(c, row) * chars.length) % chars.length
            ] ?? " "
          ctx.fillText(ch, c * cellW, row * cellH)
        }
      }
      ctx.globalAlpha = 1

      // Advance: clamped dt keeps the cascade steady across tab switches.
      const step = Math.min(dt, 0.12)
      for (const drop of dropsRef.current) {
        drop.y += drop.v * speed * step
        if (drop.y - drop.len > rows) {
          drop.y = -drop.len * 0.5
          drop.v = 5 + Math.random() * 9
          drop.len = 6 + Math.round(Math.random() * 10)
        }
      }
    },
    [cols, rows, speed, chars]
  )

  useAsciiTick(hostRef, draw, { fps: 16 })

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label={label}
      className={cn("flex justify-center overflow-hidden", className)}
    >
      <canvas ref={canvasRef} className="max-w-full" aria-hidden="true" />
    </div>
  )
}
