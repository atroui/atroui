"use client"

import { useTheme } from "next-themes"
import { useLayoutEffect, useState } from "react"

import {
  applyCompanionPalette,
  clampContrast,
  clearCompanionPalette,
  companionDark,
  sampleLightSwatch,
} from "@/lib/adaptive-theme"
import { cn } from "@/lib/utils"

function syncCompanion(adapt: boolean, dark: boolean, floor: number) {
  const root = document.documentElement
  if (!adapt || !dark) {
    clearCompanionPalette(root)
    return false
  }
  const light = sampleLightSwatch()
  if (!light) return false
  applyCompanionPalette(root, companionDark(light, "adaptive", floor))
  return true
}

/**
 * Adaptive light/dark switch.
 * DAY and NIGHT are separate choices. Night applies an OKLCH companion
 * from light :root tokens before paint.
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
  const isDark = mounted && resolvedTheme === "dark"

  useLayoutEffect(() => {
    setMounted(true)
  }, [])

  useLayoutEffect(() => {
    if (!mounted) return
    const dark = document.documentElement.classList.contains("dark")
    setCompanionOn(syncCompanion(adapt, dark, floor))
    const obs = new MutationObserver(() => {
      const nowDark = document.documentElement.classList.contains("dark")
      setCompanionOn(syncCompanion(adapt, nowDark, floor))
    })
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => obs.disconnect()
  }, [adapt, floor, mounted, resolvedTheme])

  const choose = (mode: "light" | "dark") => {
    if (mode === "dark") {
      const light = sampleLightSwatch()
      setTheme("dark")
      if (adapt && light) {
        applyCompanionPalette(
          document.documentElement,
          companionDark(light, "adaptive", floor)
        )
        setCompanionOn(true)
      }
      return
    }
    clearCompanionPalette(document.documentElement)
    setCompanionOn(false)
    setTheme("light")
  }

  return (
    <div className={cn("inline-flex flex-col items-stretch gap-1", className)}>
      <div
        role="radiogroup"
        aria-label="Appearance"
        className="relative isolate flex h-9 w-40 overflow-hidden rounded-lg border border-border-subtle"
      >
        <button
          type="button"
          role="radio"
          aria-checked={!isDark}
          aria-label="Day mode"
          onClick={() => choose("light")}
          className={cn(
            "flex w-1/2 items-center justify-center bg-[#efeae1] text-[#161412]",
            "outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/50"
          )}
        >
          <span className="font-mono text-[10px] font-medium tracking-[0.1em]">
            DAY
          </span>
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={isDark}
          aria-label="Night mode, companion palette from light tokens"
          onClick={() => choose("dark")}
          className={cn(
            "flex w-1/2 items-center justify-center bg-[#0e0e0f] text-[#eceae4]",
            "outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/50"
          )}
        >
          <span className="font-mono text-[10px] font-medium tracking-[0.1em]">
            NIGHT
          </span>
        </button>
        {mounted ? (
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
        ) : null}
      </div>
      {companionOn ? (
        <p className="max-w-40 text-[11px] leading-snug text-muted-foreground">
          Companion from light tokens.
        </p>
      ) : null}
    </div>
  )
}
