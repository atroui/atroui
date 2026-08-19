"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import {
  applyCompanionPalette,
  clampContrast,
  clearCompanionPalette,
  companionDark,
  sampleLightSwatch,
} from "@/lib/adaptive-theme"
import { cn } from "@/lib/utils"

/**
 * Adaptive light/dark switch.
 * Samples :root light tokens, builds an OKLCH companion, applies it on night.
 */
export function ThemeAdapt({
  className,
  adapt = true,
  minContrast = 4.5,
}: {
  className?: string
  /** When true, night mode uses a generated companion instead of only .dark. */
  adapt?: boolean
  minContrast?: number
}) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [companionOn, setCompanionOn] = useState(false)
  const floor = clampContrast(minContrast)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement

    const apply = () => {
      const dark =
        root.classList.contains("dark") || resolvedTheme === "dark"
      if (!adapt || !dark) {
        clearCompanionPalette(root)
        setCompanionOn(false)
        return
      }
      const light = sampleLightSwatch()
      if (!light) return
      applyCompanionPalette(root, companionDark(light, "adaptive", floor))
      setCompanionOn(true)
    }

    apply()
    const obs = new MutationObserver(apply)
    obs.observe(root, { attributes: true, attributeFilter: ["class"] })
    return () => {
      obs.disconnect()
    }
  }, [adapt, floor, mounted, resolvedTheme])

  const isDark = mounted && resolvedTheme === "dark"
  const next = isDark ? "light" : "dark"
  const label = mounted
    ? `Switch to ${next} mode${companionOn ? ". Companion dark from light tokens." : ""}`
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
      {companionOn ? (
        <p className="max-w-[8.75rem] text-[11px] leading-snug text-muted-foreground">
          Companion from light tokens.
        </p>
      ) : null}
    </div>
  )
}
