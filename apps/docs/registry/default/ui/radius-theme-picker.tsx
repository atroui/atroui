"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"

import {
  RADIUS_THEMES,
  applyRadiusTheme,
  readStoredRadiusTheme,
  type RadiusThemeId,
} from "@/lib/radius-themes"
import { cn } from "@/lib/utils"

/** Active segment indicator — inset radius accounts for the 1px control border. */
const PILL_CLASS =
  "absolute inset-0 rounded-[calc(var(--atro-control-radius)-1px)] bg-background shadow-sm"

const PILL_TWEEN = {
  duration: 0.24,
  ease: [0.32, 0.72, 0, 1],
} as const

/**
 * Radius axis — Soft | Mira | Sharp. Soft-rect segmented chrome (Family Values).
 * Orthogonal to ColorThemePicker (accent) and ThemeToggle (light/dark).
 */
export function RadiusThemePicker({ className }: { className?: string }) {
  const [theme, setTheme] = useState<RadiusThemeId>("mira")
  const [mounted, setMounted] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const stored = readStoredRadiusTheme()
    setTheme(stored)
    applyRadiusTheme(stored)
    setMounted(true)
  }, [])

  const select = (id: RadiusThemeId) => {
    setTheme(id)
    applyRadiusTheme(id)
  }

  const current =
    RADIUS_THEMES.find((t) => t.id === theme) ?? RADIUS_THEMES[1]!

  return (
    <div
      role="radiogroup"
      aria-label="Corner radius"
      className={cn(
        "touch-manipulation inline-flex items-stretch overflow-hidden rounded-[var(--atro-control-radius)] border border-border-subtle bg-muted",
        className,
      )}
    >
      {RADIUS_THEMES.map((option) => {
        const isActive = mounted && theme === option.id
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`${option.label} (${option.value})`}
            title={`${option.label}: ${option.description}`}
            onClick={() => select(option.id)}
            className={cn(
              "motion-safe-transition relative inline-flex min-h-9 min-w-[3.25rem] items-center justify-center px-2.5 text-[0.8125rem] font-medium text-muted-foreground",
              isActive && "text-foreground",
              !isActive && "hover:bg-foreground/[0.08] hover:text-foreground",
            )}
          >
            {isActive &&
              (reduce ? (
                <span className={PILL_CLASS} aria-hidden />
              ) : (
                <motion.span
                  layoutId={mounted ? "atro-radius-pill" : undefined}
                  className={PILL_CLASS}
                  transition={PILL_TWEEN}
                  aria-hidden
                />
              ))}
            <span className="relative">{option.label}</span>
          </button>
        )
      })}
      <span className="sr-only">Radius: {current.label}</span>
    </div>
  )
}
