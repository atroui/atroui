"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  ASCII_RAMPS,
  readAsciiColor,
  resolveAsciiRamp,
  setupAsciiCanvas,
  useAsciiTick,
} from "@/lib/ascii-rig"

export type AsciiDonutProps = {
  /** Columns (character cells). Rows derive from the 1:2 cell ratio. */
  cols?: number
  /** Spin multiplier. 0 still renders one lit frame. */
  speed?: number
  /** Luminance ramp, dim → bright. A literal string or a rig ramp name. */
  chars?: string
  /** Accessible description of the decorative scene. */
  label?: string
  className?: string
}

const DEFAULT_RAMP = ASCII_RAMPS.classic

function clampInt(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Math.round(v)))
}

/**
 * ASCII Donut — the a1k0n torus: points plotted on a rotating torus,
 * depth-buffered per cell, shaded by surface-normal · light through a
 * luminance ramp (.,-~:;=!*#$@). Pure canvas, monospace cells, DPR-sharp.
 */
export function AsciiDonut({
  cols: colsProp = 64,
  speed = 1,
  chars,
  label = "Rotating ASCII torus",
  className,
}: AsciiDonutProps) {
  const cols = clampInt(colsProp, 24, 110)
  const rows = Math.round(cols * 0.32)
  const hostRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  const draw = React.useCallback(
    (t: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const setup = setupAsciiCanvas(canvas, cols, rows, 10)
      if (!setup) return
      const { ctx } = setup
      const ramp = resolveAsciiRamp(chars ?? DEFAULT_RAMP)
      ctx.fillStyle = readAsciiColor(hostRef.current)
      ctx.clearRect(0, 0, setup.w, setup.h)

      const cells = cols * rows
      const zbuffer = new Float32Array(cells)
      const lum = new Int8Array(cells)
      lum.fill(-1)

      // Base tilt so even the static reduced-motion frame reads as a donut.
      const A = 0.6 + speed * t * 0.8
      const B = 0.25 + speed * t * 0.4
      const cosA = Math.cos(A)
      const sinA = Math.sin(A)
      const cosB = Math.cos(B)
      const sinB = Math.sin(B)

      const K1x = (cols * 5 * 3) / 8 // screen_width*K2*3 / (8*(R1+R2)), K2=5
      const K1y = rows * 0.62

      for (let theta = 0; theta < 6.283; theta += 0.07) {
        const costheta = Math.cos(theta)
        const sintheta = Math.sin(theta)
        for (let phi = 0; phi < 6.283; phi += 0.02) {
          const cosphi = Math.cos(phi)
          const sinphi = Math.sin(phi)
          const circlex = 2 + costheta // R2 + R1*cosθ, R1=R2/2
          const circley = 0.5 * sintheta

          const x =
            circlex * (cosB * cosphi + sinA * sinB * sinphi) -
            circley * cosA * sinB
          const y =
            circlex * (sinB * cosphi - sinA * cosB * sinphi) +
            circley * cosA * cosB
          const z = 5 + cosA * circlex * sinphi + circley * sinA
          const ooz = 1 / z
          const xp = Math.round(cols / 2 + K1x * ooz * x)
          const yp = Math.round(rows / 2 - K1y * ooz * y)
          if (xp < 0 || xp >= cols || yp < 0 || yp >= rows) continue

          const L =
            cosphi * costheta * sinB -
            cosA * costheta * sinphi -
            sinA * sintheta +
            cosB * (cosA * sintheta - costheta * sinA * sinphi)
          if (L <= 0) continue

          const idx = yp * cols + xp
          const zb = zbuffer[idx] ?? -Infinity
          if (ooz > zb) {
            zbuffer[idx] = ooz
            lum[idx] = Math.min(11, Math.floor(L * 8))
          }
        }
      }

      for (let r = 0; r < rows; r++) {
        let line = ""
        for (let c = 0; c < cols; c++) {
          const n = lum[r * cols + c] ?? -1
          line += n < 0 ? " " : (ramp[Math.min(n, ramp.length - 1)] ?? " ")
        }
        ctx.fillText(line, 0, r * setup.cellH)
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
