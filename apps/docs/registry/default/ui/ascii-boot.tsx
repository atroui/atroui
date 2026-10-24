"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type AsciiBootProps = {
  /** Log lines, typed one character at a time, top to bottom. */
  lines?: string[]
  /** Milliseconds per character. */
  speed?: number
  /** Pause between lines, the way a real init would breathe. */
  lineDelay?: number
  /** Restart the sequence after it completes. */
  loop?: boolean
  /** Accessible one-line summary. */
  label?: string
  className?: string
}

const DEFAULT_LINES = [
  "[ OK ] init ascii/family",
  "[ OK ] mount ramps      .,-~:;=!*#$@",
  "[ OK ] load cell grid   1x2 monospace",
  "[ OK ] arm tick loop    16 fps · offscreen pause",
  ">> ready — 8 effects armed",
]

/**
 * ASCII Boot — an init-log typewriter. Types each line character by
 * character with a pause between lines; cursor pulses at the end.
 * Reduced motion prints the full log immediately.
 */
export function AsciiBoot({
  lines = DEFAULT_LINES,
  speed = 9,
  lineDelay = 260,
  loop = false,
  label = "Boot log",
  className,
}: AsciiBootProps) {
  const text = lines.join("\n")
  const reduceRef = React.useRef(false)
  const posRef = React.useRef(0)
  const [typed, setTyped] = React.useState(0)
  const complete = typed >= text.length

  React.useEffect(() => {
    reduceRef.current = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches
  })

  React.useEffect(() => {
    if (reduceRef.current) {
      posRef.current = text.length
      setTyped(text.length)
      return
    }
    let timer: ReturnType<typeof setTimeout> | undefined
    let cancelled = false

    const tick = () => {
      if (cancelled) return
      if (posRef.current >= text.length) {
        if (loop) {
          timer = setTimeout(() => {
            if (cancelled) return
            posRef.current = 0
            setTyped(0)
            timer = setTimeout(tick, speed)
          }, 2200)
        }
        return
      }
      const next = posRef.current + 1
      posRef.current = next
      setTyped(next)
      const ch = text[next - 1] ?? ""
      timer = setTimeout(tick, ch === "\n" ? lineDelay : speed)
    }

    timer = setTimeout(tick, speed)
    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
    }
  }, [text, speed, lineDelay, loop])

  return (
    <div
      role="img"
      aria-label={label}
      className={cn("min-w-0", className)}
    >
      <pre
        aria-hidden="true"
        className="m-0 select-none whitespace-pre font-mono text-[11px] leading-[1.7] text-foreground/70"
      >
        {text.slice(0, typed)}
        <span
          className={cn(
            "text-primary",
            complete && !reduceRef.current && "animate-pulse"
          )}
        >
          ▌
        </span>
      </pre>
    </div>
  )
}
