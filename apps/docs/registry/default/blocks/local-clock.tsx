"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/** Defaults — edit timezone props after install. */
const CONTENT = {
  timezone: "America/New_York",
  timezoneLabel: "ET",
}

export function LocalClock({
  timezone = CONTENT.timezone,
  timezoneLabel = CONTENT.timezoneLabel,
  className,
}: {
  timezone?: string
  timezoneLabel?: string
  className?: string
} = {}) {
  const [now, setNow] = React.useState<Date | null>(null)

  React.useEffect(() => {
    const tick = () => setNow(new Date())
    tick()
    const timer = window.setInterval(tick, 30_000)
    return () => window.clearInterval(timer)
  }, [])

  const time = now
    ? new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(now)
    : "—:—"

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-mono text-[11.5px] text-muted-foreground tabular-nums",
        className
      )}
      aria-label={`Local time in ${timezoneLabel}: ${time}`}
      title={`${timezoneLabel} · ${timezone}`}
    >
      <span className="text-foreground">{time}</span>
      <span className="text-muted-foreground/70">{timezoneLabel}</span>
    </span>
  )
}
