"use client"

import { useEffect, useState } from "react"
import { Check } from "lucide-react"

import {
  COLOR_THEMES,
  applyColorTheme,
  readStoredColorTheme,
  type ColorThemeId,
} from "@/lib/color-themes"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

/**
 * Live accent theme list — click a swatch, whole site recolors immediately.
 * Orthogonal to ThemeToggle (light / system / dark). Soft-rect popover, not a pill row.
 * Careful delight: soft-rect mini chip preview beside each swatch.
 */
export function ColorThemePicker({ className }: { className?: string }) {
  const [theme, setTheme] = useState<ColorThemeId>("mira")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = readStoredColorTheme()
    setTheme(stored)
    applyColorTheme(stored)
    setMounted(true)
  }, [])

  const current =
    COLOR_THEMES.find((t) => t.id === theme) ?? COLOR_THEMES[0]!

  const select = (id: ColorThemeId) => {
    setTheme(id)
    applyColorTheme(id)
  }

  return (
    <Popover>
      <PopoverTrigger
        type="button"
        aria-label={`Accent theme: ${current.label}. Change theme.`}
        title={`Theme: ${current.label}`}
        className={cn(
          "motion-safe-transition inline-flex size-9 items-center justify-center rounded-[var(--atro-control-radius)] border border-border-subtle bg-muted text-foreground active:scale-[0.97]",
          className,
        )}
      >
        <span
          className="size-3.5 rounded-[3px] ring-1 ring-border-subtle"
          style={{
            background: mounted ? current.swatch : "var(--brand)",
          }}
          aria-hidden
        />
        <span className="sr-only">Themes</span>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[17rem] gap-0 p-0"
      >
        <PopoverHeader className="border-b border-border-subtle px-3 py-2.5">
          <PopoverTitle className="text-sm font-medium">Themes</PopoverTitle>
          <PopoverDescription className="text-xs text-muted-foreground">
            Recolor the whole site. Light / dark stays separate.
          </PopoverDescription>
        </PopoverHeader>
        <div
          role="radiogroup"
          aria-label="Accent theme"
          className="flex flex-col gap-0.5 p-1.5"
        >
          {COLOR_THEMES.map((option) => {
            const active = mounted && theme === option.id
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => select(option.id)}
                className={cn(
                  "motion-safe-transition flex w-full items-center gap-2.5 rounded-[var(--atro-control-radius)] px-2 py-1.5 text-left",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                )}
              >
                <span
                  className="size-4 shrink-0 rounded-[3px] ring-1 ring-border-subtle"
                  style={{ background: option.swatch }}
                  aria-hidden
                />
                <span
                  className="inline-flex h-5 shrink-0 items-center justify-center rounded-[3px] px-1.5 text-[10px] font-semibold tracking-tight text-white ring-1 ring-black/10"
                  style={{ background: option.swatch }}
                  aria-hidden
                >
                  Aa
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-foreground">
                    {option.label}
                  </span>
                  <span className="block text-[11px] text-muted-foreground">
                    {option.description}
                  </span>
                </span>
                {active ? (
                  <Check
                    className="size-3.5 shrink-0 text-brand"
                    strokeWidth={2.25}
                    aria-hidden
                  />
                ) : (
                  <span className="size-3.5 shrink-0" aria-hidden />
                )}
              </button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
