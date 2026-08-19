"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import {
  clampContrast,
  ensureContrast,
  parseRgb,
  rgbToCss,
  type Rgb,
} from "@/lib/adaptive-theme"
import { cn } from "@/lib/utils"

const TOKEN_KEYS = ["--foreground", "--muted-foreground"] as const

function readTokenRgb(token: string): Rgb | null {
  const probe = document.createElement("span")
  probe.style.color = `var(${token})`
  probe.setAttribute("aria-hidden", "true")
  try {
    document.documentElement.appendChild(probe)
    return parseRgb(getComputedStyle(probe).color)
  } finally {
    probe.remove()
  }
}

function readBackgroundRgb(): Rgb | null {
  const probe = document.createElement("span")
  probe.style.backgroundColor = "var(--background)"
  probe.setAttribute("aria-hidden", "true")
  try {
    document.documentElement.appendChild(probe)
    return parseRgb(getComputedStyle(probe).backgroundColor)
  } finally {
    probe.remove()
  }
}

function clearOverrides(root: HTMLElement) {
  for (const key of TOKEN_KEYS) {
    root.style.removeProperty(key)
  }
  root.removeAttribute("data-theme-adapt")
}

/**
 * Adaptive light/dark switch.
 * Family Values: gradual revelation (note only after a repair),
 * fluidity (hairline frame travels), careful delight (paper vs ink fields).
 */
export function ThemeAdapt({
  className,
  adapt = true,
  minContrast = 4.5,
}: {
  className?: string
  /** Lift --foreground / --muted-foreground to WCAG AA against --background. */
  adapt?: boolean
  minContrast?: number
}) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [repaired, setRepaired] = useState(false)
  const floor = clampContrast(minContrast)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    if (!adapt) {
      clearOverrides(root)
      setRepaired(false)
      return
    }

    const apply = () => {
      clearOverrides(root)
      const bg = readBackgroundRgb()
      if (!bg) return
      let didRepair = false
      for (const key of TOKEN_KEYS) {
        const fg = readTokenRgb(key)
        if (!fg) continue
        const next = ensureContrast(fg, bg, floor)
        if (next.repaired) {
          root.style.setProperty(key, rgbToCss(next.rgb))
          didRepair = true
        }
      }
      if (didRepair) root.setAttribute("data-theme-adapt", "repaired")
      setRepaired(didRepair)
    }

    apply()
    const obs = new MutationObserver(apply)
    obs.observe(root, { attributes: true, attributeFilter: ["class"] })
    return () => {
      obs.disconnect()
      clearOverrides(root)
    }
  }, [adapt, floor, mounted, resolvedTheme])

  const isDark = mounted && resolvedTheme === "dark"
  const next = isDark ? "light" : "dark"
  const label = mounted
    ? `Switch to ${next} mode${repaired ? ". Type contrast was lifted." : ""}`
    : "Switch appearance"

  return (
    <div className={cn("inline-flex flex-col items-stretch gap-1", className)}>
      <button
        type="button"
        aria-label={label}
        title={label}
        onClick={() => setTheme(next)}
        className={cn(
          "relative isolate flex h-9 w-[8.75rem] overflow-hidden rounded-lg border border-border-subtle",
          "outline-none focus-visible:ring-2 focus-visible:ring-brand/50",
          "active:scale-[0.98] motion-reduce:active:scale-100"
        )}
      >
        <span
          className="flex w-1/2 items-center justify-center bg-[#efeae1] text-[#161412]"
          aria-hidden
        >
          <span className="font-mono text-[10px] font-medium tracking-[0.18em]">
            DAY
          </span>
        </span>
        <span
          className="flex w-1/2 items-center justify-center bg-[#0e0e0f] text-[#eceae4]"
          aria-hidden
        >
          <span className="font-mono text-[10px] font-medium tracking-[0.18em]">
            NIGHT
          </span>
        </span>
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-px bottom-px w-[calc(50%-2px)] rounded-md",
            "ring-1 ring-brand/80",
            "transition-[left] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
            "motion-reduce:transition-none"
          )}
          style={{ left: isDark ? "calc(50% + 1px)" : "1px" }}
        />
      </button>
      {repaired ? (
        <p className="max-w-[8.75rem] text-[11px] leading-snug text-muted-foreground">
          Type lifted to AA.
        </p>
      ) : null}
    </div>
  )
}
