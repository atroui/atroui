"use client"

import * as React from "react"

const TOTAL_SEGMENTS = 24
const DAY_MS = 24 * 60 * 60 * 1000

/** Edit dates and labels after install. */
const CONTENT = {
  title: "Deadline",
  targetDate: "2026-12-31",
  startDate: "2026-01-01",
  unitLabel: "days",
  progressLabel: "to deadline",
}

function parseIso(iso: string) {
  return new Date(iso.length <= 10 ? `${iso}T00:00:00Z` : iso)
}

function daysBetween(fromIso: string, toIso: string) {
  return Math.round(
    (parseIso(toIso).getTime() - parseIso(fromIso).getTime()) / DAY_MS
  )
}

function daysFromNow(iso: string) {
  const now = new Date()
  const target = parseIso(iso)
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / DAY_MS))
}

function formatFullDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(parseIso(iso))
}

/** Inlined CountUp helper — self-contained registry block. */
function CountUp({
  value,
  duration = 1200,
  className,
  ariaLabel,
}: {
  value: number
  duration?: number
  className?: string
  ariaLabel?: string
}) {
  const ref = React.useRef<HTMLSpanElement | null>(null)
  const [display, setDisplay] = React.useState(0)
  const startedRef = React.useRef(false)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setDisplay(value)
      return
    }

    let raf = 0
    const start = () => {
      if (startedRef.current) return
      startedRef.current = true
      const t0 = performance.now()
      const from = 0
      const to = value
      const ease = (t: number) => 1 - Math.pow(1 - t, 4)

      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / duration)
        setDisplay(Math.round(from + (to - from) * ease(t)))
        if (t < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }

    if (typeof IntersectionObserver === "undefined") {
      start()
      return () => cancelAnimationFrame(raf)
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          start()
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(node)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration])

  return (
    <span
      ref={ref}
      className={className}
      aria-label={ariaLabel ?? String(value)}
    >
      {display}
    </span>
  )
}

export function DeadlineCountdown({
  title = CONTENT.title,
  targetDate = CONTENT.targetDate,
  startDate = CONTENT.startDate,
  unitLabel = CONTENT.unitLabel,
  progressLabel = CONTENT.progressLabel,
  className,
}: {
  title?: string
  targetDate?: string
  startDate?: string
  unitLabel?: string
  progressLabel?: string
  className?: string
} = {}) {
  const daysRemaining = daysFromNow(targetDate)
  const totalDays = Math.max(1, daysBetween(startDate, targetDate))
  const elapsed = Math.max(0, totalDays - daysRemaining)
  const percent = Math.min(100, Math.round((elapsed / totalDays) * 100))
  const filledSegments = Math.min(
    TOTAL_SEGMENTS,
    Math.round((elapsed / totalDays) * TOTAL_SEGMENTS)
  )

  return (
    <section className={className ?? "mx-auto max-w-[640px]"}>
      <div className="relative overflow-hidden rounded-[10px] border border-border-subtle bg-muted/40 p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-baseline gap-3">
            <CountUp
              value={daysRemaining}
              className="text-5xl font-medium tracking-tight tabular-nums text-[var(--color-brand,#0b7bff)] sm:text-6xl"
            />
            <div className="pb-1 sm:pb-2">
              <div className="text-[13px] font-medium text-foreground">
                {unitLabel}
              </div>
              <div className="text-[12px] text-muted-foreground">remaining</div>
            </div>
          </div>

          <div className="sm:text-right">
            <div className="font-mono text-[10.5px] tracking-[0.12em] text-muted-foreground uppercase">
              {title}
            </div>
            <div className="mt-1.5 text-[15px] font-medium tabular-nums text-foreground">
              {formatFullDate(targetDate)}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div
            className="flex items-center gap-[3px]"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            aria-label={`${title} progress`}
          >
            {Array.from({ length: TOTAL_SEGMENTS }).map((_, i) => {
              const filled = i < filledSegments
              return (
                <span
                  key={i}
                  className={
                    "h-[6px] flex-1 rounded-[1px] transition-colors duration-300 " +
                    (filled
                      ? "bg-[var(--color-brand,#0b7bff)]"
                      : "bg-border-subtle")
                  }
                />
              )
            })}
          </div>
          <div className="mt-2.5 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
            <span>
              {elapsed} / {totalDays} days
            </span>
            <span>
              {percent}% {progressLabel}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
