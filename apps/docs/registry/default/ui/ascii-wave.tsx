"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ASCII_RAMPS, rampAt, resolveAsciiRamp, useAsciiTick } from "@/lib/ascii-rig"

export type AsciiWaveProps = {
  /** Grid width in character cells. */
  cols?: number
  /** Grid height in lines. */
  rows?: number
  /** Field speed multiplier. */
  speed?: number
  /** Luminance ramp, dim → bright. A literal string or a rig ramp name. */
  chars?: string
  /** Accessible description of the decorative field. */
  label?: string
  className?: string
}

const DEFAULT_RAMP = ASCII_RAMPS.classic

function clampInt(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Math.round(v)))
}

/**
 * ASCII Wave — a pure function-field: every visible cell is
 * f(x, y, t) — two travelling sines over a diagonal carrier — mapped
 * through a luminance ramp. Rendered as one text node per frame.
 */
export function AsciiWave({
  cols: colsProp = 56,
  rows: rowsProp = 16,
  speed = 1,
  chars,
  label = "Interference wave of characters",
  className,
}: AsciiWaveProps) {
  const cols = clampInt(colsProp, 16, 160)
  const rows = clampInt(rowsProp, 4, 64)
  const ramp = resolveAsciiRamp(chars ?? DEFAULT_RAMP)
  const hostRef = React.useRef<HTMLDivElement>(null)
  const [frame, setFrame] = React.useState("") // first paint: static frame

  const draw = React.useCallback(
    (t: number) => {
      const out: string[] = []
      for (let r = 0; r < rows; r++) {
        let line = ""
        for (let c = 0; c < cols; c++) {
          const v =
            0.5 +
            (Math.sin(c * 0.55 + t * 1.3 * speed) +
              Math.sin(r * 0.42 - t * 0.9 * speed) +
              Math.sin((c + r) * 0.18 + t * 0.55 * speed)) /
              3
          line += rampAt(ramp, Math.min(1, Math.max(0, v)))
        }
        out.push(line)
      }
      // React bails out on identical values, so same-frame strings settle.
      setFrame(out.join("\n"))
    },
    [rows, cols, ramp, speed]
  )

  useAsciiTick(hostRef, draw, { fps: 16 })

  return (
    <div ref={hostRef} aria-label={label} role="img" className={cn("min-w-0", className)}>
      <pre
        aria-hidden="true"
        className="m-0 select-none whitespace-pre font-mono text-[11px] leading-[1.35] text-foreground/70"
      >
        {frame}
      </pre>
    </div>
  )
}
