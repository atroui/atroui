"use client"

/**
 * Quiet accent strip on the landing hero — one axis tease that recolors the room.
 * Full addiction loop lives on /themes.
 */

import { useEffect, useState } from "react"
import {
  COLOR_THEMES,
  applyColorTheme,
  readStoredColorTheme,
  type ColorThemeId,
} from "atroui/lib/theme"
import { TransitionLink } from "@/components/view-transitions"
import { cn } from "@/lib/utils"

export function LandingAxisStrip({ className }: { className?: string }) {
  const [accent, setAccent] = useState<ColorThemeId>("mira")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const next = readStoredColorTheme()
    setAccent(next)
    applyColorTheme(next)
    setMounted(true)
  }, [])

  const select = (id: ColorThemeId) => {
    setAccent(id)
    applyColorTheme(id)
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4",
        className,
      )}
    >
      <div
        role="radiogroup"
        aria-label="Accent theme"
        className="flex items-center gap-1.5"
      >
        {COLOR_THEMES.map((option) => {
          const active = mounted && accent === option.id
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={option.label}
              title={option.label}
              onClick={() => select(option.id)}
              className={cn(
                "size-6 rounded-[calc(var(--atro-control-radius)-2px)] ring-1 transition-[box-shadow,transform] duration-160 ease-out",
                active
                  ? "scale-105 ring-2 ring-foreground/80"
                  : "ring-border-subtle hover:ring-foreground/40",
              )}
              style={{ background: option.swatch }}
            />
          )
        })}
      </div>
      <p className="font-mono text-[11px] tracking-wide text-muted-foreground">
        Flip an accent.{" "}
        <TransitionLink
          href="/themes"
          transitionTypes={[]}
          className="text-foreground underline decoration-border underline-offset-[0.18em] transition-colors hover:decoration-foreground"
        >
          Open Theme Studio
        </TransitionLink>
      </p>
    </div>
  )
}
