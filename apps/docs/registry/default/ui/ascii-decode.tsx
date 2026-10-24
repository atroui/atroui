"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useAsciiTick } from "@/lib/ascii-rig"

export type AsciiDecodeProps = {
  /** The message that resolves out of the scramble. */
  text?: string
  /** Cipher pool for unresolved characters. */
  charset?: string
  /** Total reveal time in ms. Longer = slower decrypt. */
  duration?: number
  /** Scramble forever — good for status lines. */
  loop?: boolean
  /** Accessible name for the decorative line. */
  label?: string
  className?: string
}

const DEFAULT_CHARSET = "!<>-_\\/[]{}=+*^?#"
const CHURN_PER_SEC = 18 // glyph churn speed inside the scramble
const DWELL = 0.9 // seconds of settled message before a loop restarts

function clampInt(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Math.round(v)))
}

/**
 * ASCII Decode — the decrypt resolve: the whole line starts scrambled in
 * the cipher pool and locks into the message left-to-right, each glyph
 * churning bit-stably per frame so it flickers deliberately, not randomly.
 */
export function AsciiDecode({
  text = "characters are pixels",
  charset = DEFAULT_CHARSET,
  duration = 1800,
  loop = false,
  label = "Decrypting text",
  className,
}: AsciiDecodeProps) {
  const message = text
  const len = message.length
  const hostRef = React.useRef<HTMLDivElement>(null)
  const cycleRef = React.useRef(0) // tick-time when the current cycle began
  const [frame, setFrame] = React.useState("")

  // Staggered lock-in times: most of the budget spread left-to-right,
  // a small random tail so the resolve edge stays organic.
  const delays = React.useMemo(() => {
    const total = Math.max(1, clampInt(duration, 200, 8000))
    return Array.from({ length: len }, (_, i) => {
      const p = len <= 1 ? 0 : i / (len - 1)
      return ((p * 0.86 + Math.random() * 0.14) * total) / 1000
    })
  }, [len, duration])

  useAsciiTick(
    hostRef,
    (t, dt) => {
      if (dt === 0) {
        // Reduced-motion static frame: the message, resolved.
        cycleRef.current = 0
        setFrame(message)
        return
      }
      const local = t - cycleRef.current
      if (local >= duration / 1000) {
        if (loop && cycleRef.current < t - DWELL) {
          cycleRef.current = t // next frame scrambles from the top
        } else {
          setFrame(message) // settled — state bails on identical value
        }
        return
      }
      const churn = Math.floor(local * CHURN_PER_SEC)
      let out = ""
      for (let i = 0; i < len; i++) {
        if (local >= (delays[i] ?? Infinity)) {
          out += message[i]
        } else {
          const seed = Math.abs(i * 31 + churn * 7 + ((i * (churn + 1)) % 13))
          out += charset[seed % charset.length]
        }
      }
      setFrame(out)
    },
    { fps: 18 }
  )

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label={label}
      className={cn("min-w-0", className)}
    >
      <pre
        aria-hidden="true"
        className="m-0 min-h-[1.35em] select-none whitespace-pre font-mono text-[13px] leading-[1.35] text-foreground/80"
      >
        {frame}
      </pre>
    </div>
  )
}
