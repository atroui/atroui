"use client"

import { useEffect, useState } from "react"
import { Check } from "lucide-react"

import {
  COLOR_THEMES,
  applyColorTheme,
  readStoredColorTheme,
  type ColorThemeId,
} from "../../lib/color-themes"
import {
  RADIUS_THEMES,
  applyRadiusTheme,
  readStoredRadiusTheme,
  type RadiusThemeId,
} from "../../lib/radius-themes"
import {
  SURFACE_THEMES,
  applySurfaceTheme,
  readStoredSurfaceTheme,
  type SurfaceThemeId,
} from "../../lib/surface-themes"
import {
  TYPE_THEMES,
  applyTypeTheme,
  readStoredTypeTheme,
  type TypeThemeId,
} from "../../lib/type-themes"
import { cn } from "../../lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./popover"

/**
 * Soft-rect constellation — live accent in the lead cell; companions hint
 * Surface / Type / Radius without stealing chrome weight from ThemeToggle.
 */
function ThemesTriggerIcon({
  accent,
  mounted,
}: {
  accent: string
  mounted: boolean
}) {
  const lead = mounted ? accent : "var(--brand)"
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      className="size-4"
      aria-hidden
    >
      <rect x="1" y="1" width="6.2" height="6.2" rx="1.6" fill={lead} />
      <rect
        x="8.8"
        y="1"
        width="6.2"
        height="6.2"
        rx="1.6"
        fill="currentColor"
        className="opacity-[0.22]"
      />
      <rect
        x="1"
        y="8.8"
        width="6.2"
        height="6.2"
        rx="1.6"
        fill="currentColor"
        className="opacity-[0.38]"
      />
      <rect
        x="8.8"
        y="8.8"
        width="6.2"
        height="6.2"
        rx="1.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.15"
        className="opacity-[0.55]"
      />
    </svg>
  )
}

/**
 * Unified Themes popover — Accent · Surface · Type · Radius.
 * Gradual revelation: one soft-rect control, sections inside. Orthogonal to
 * ThemeToggle (light / system / dark). Trigger: soft-rect mark + live accent.
 */
export function ColorThemePicker({ className }: { className?: string }) {
  const [accent, setAccent] = useState<ColorThemeId>("mira")
  const [surface, setSurface] = useState<SurfaceThemeId>("mira")
  const [type, setType] = useState<TypeThemeId>("mira")
  const [radius, setRadius] = useState<RadiusThemeId>("mira")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const storedAccent = readStoredColorTheme()
    const storedSurface = readStoredSurfaceTheme()
    const storedType = readStoredTypeTheme()
    const storedRadius = readStoredRadiusTheme()
    setAccent(storedAccent)
    setSurface(storedSurface)
    setType(storedType)
    setRadius(storedRadius)
    applyColorTheme(storedAccent)
    applySurfaceTheme(storedSurface)
    applyTypeTheme(storedType)
    applyRadiusTheme(storedRadius)
    setMounted(true)
  }, [])

  const currentAccent =
    COLOR_THEMES.find((t) => t.id === accent) ?? COLOR_THEMES[0]!

  const selectAccent = (id: ColorThemeId) => {
    setAccent(id)
    applyColorTheme(id)
  }

  const selectSurface = (id: SurfaceThemeId) => {
    setSurface(id)
    applySurfaceTheme(id)
  }

  const selectType = (id: TypeThemeId) => {
    setType(id)
    applyTypeTheme(id)
  }

  const selectRadius = (id: RadiusThemeId) => {
    setRadius(id)
    applyRadiusTheme(id)
  }

  return (
    <Popover>
      <PopoverTrigger
        type="button"
        aria-label={`Themes. Accent: ${currentAccent.label}. Open theme axes.`}
        title={`Themes · ${currentAccent.label}`}
        className={cn(
          "motion-safe-transition inline-flex size-9 items-center justify-center rounded-[var(--atro-control-radius)] border border-border-subtle bg-muted text-foreground hover:bg-foreground/[0.06] active:scale-[0.97]",
          className,
        )}
      >
        <ThemesTriggerIcon accent={currentAccent.swatch} mounted={mounted} />
        <span className="sr-only">Themes</span>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[18rem] max-h-[70vh] gap-0 overflow-y-auto p-0"
      >
        <PopoverHeader className="border-b border-border-subtle px-3 py-2.5">
          <PopoverTitle className="text-sm font-medium">Themes</PopoverTitle>
          <PopoverDescription className="text-xs text-muted-foreground">
            Accent, surface, type, and radius. Light / dark stays separate.
          </PopoverDescription>
        </PopoverHeader>

        {/* Accent */}
        <section className="border-b border-border-subtle p-1.5">
          <p className="ds-mono-label px-2 pb-1.5 pt-1">Accent</p>
          <div
            role="radiogroup"
            aria-label="Accent theme"
            className="flex flex-col gap-0.5"
          >
            {COLOR_THEMES.map((option) => {
              const active = mounted && accent === option.id
              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => selectAccent(option.id)}
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
        </section>

        {/* Surface */}
        <section className="border-b border-border-subtle p-1.5">
          <p className="ds-mono-label px-2 pb-1.5 pt-1">Surface</p>
          <div
            role="radiogroup"
            aria-label="Surface theme"
            className="flex flex-col gap-0.5"
          >
            {SURFACE_THEMES.map((option) => {
              const active = mounted && surface === option.id
              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => selectSurface(option.id)}
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
        </section>

        {/* Type */}
        <section className="border-b border-border-subtle p-1.5">
          <p className="ds-mono-label px-2 pb-1.5 pt-1">Type</p>
          <div
            role="radiogroup"
            aria-label="Type theme"
            className="flex flex-col gap-0.5"
          >
            {TYPE_THEMES.map((option) => {
              const active = mounted && type === option.id
              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => selectType(option.id)}
                  className={cn(
                    "motion-safe-transition flex w-full items-center gap-2.5 rounded-[var(--atro-control-radius)] px-2 py-1.5 text-left",
                    active
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                  )}
                >
                  <span
                    className="inline-flex size-8 shrink-0 items-center justify-center rounded-[3px] bg-muted text-sm font-medium text-foreground ring-1 ring-border-subtle"
                    style={{
                      fontFamily: option.remaps["font-heading"],
                    }}
                    aria-hidden
                  >
                    {option.sample}
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
        </section>

        {/* Radius */}
        <section className="p-1.5">
          <p className="ds-mono-label px-2 pb-1.5 pt-1">Radius</p>
          <div
            role="radiogroup"
            aria-label="Corner radius"
            className="flex flex-col gap-0.5"
          >
            {RADIUS_THEMES.map((option) => {
              const active = mounted && radius === option.id
              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => selectRadius(option.id)}
                  className={cn(
                    "motion-safe-transition flex w-full items-center gap-2.5 rounded-[var(--atro-control-radius)] px-2 py-1.5 text-left",
                    active
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                  )}
                >
                  <span
                    className="size-4 shrink-0 border border-border-subtle bg-muted"
                    style={{ borderRadius: option.value }}
                    aria-hidden
                  />
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
        </section>
      </PopoverContent>
    </Popover>
  )
}
