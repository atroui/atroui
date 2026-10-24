import * as React from "react"
import { cn } from "@/lib/utils"

export type AsciiSparkProps = {
  /** Series, lowest first or not — bars are value-driven, time-free. */
  data?: number[]
  /** Ceiling for bar height. Defaults to the series max. */
  max?: number
  /** Accessible one-line summary. Defaults to first → last. */
  label?: string
  className?: string
}

const BARS = "▁▂▃▄▅▆▇█"

/**
 * ASCII Spark — a series compressed to block-element bars (▁ through █).
 * Zero animation, zero JS state: it is just text, so a values-only series
 * works server-side. Sits inline with trailing prose or headline numbers.
 */
export function AsciiSpark({
  data = [4, 9, 7, 12, 10, 15, 11, 18, 13, 17, 22, 19],
  max,
  label,
  className,
}: AsciiSparkProps) {
  const series = data
  const top = Math.max(1, max ?? Math.max(...series))
  const bars = React.useMemo(
    () =>
      series
        .map((v) =>
          BARS[
            Math.min(
              BARS.length - 1,
              Math.max(0, Math.round((v / top) * (BARS.length - 1)))
            )
          ]
        )
        .join(""),
    [series, top]
  )
  const summary =
    label ??
    `${series[0]} → ${series[series.length - 1]} over ${series.length} points`

  return (
    <pre
      aria-label={summary}
      role="img"
      title={summary}
      className={cn(
        "m-0 inline-block select-none whitespace-pre font-mono text-[13px] leading-none text-primary",
        className
      )}
    >
      {bars}
    </pre>
  )
}
