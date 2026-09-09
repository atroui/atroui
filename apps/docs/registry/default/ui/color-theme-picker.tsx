"use client"

import { useEffect, useState, type CSSProperties, type ReactNode } from "react"

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

function AxisLabel({ children }: { children: ReactNode }) {
  return (
    <p className="ds-mono-label mb-2 text-[10px] tracking-[0.14em] text-muted-foreground/80">
      {children}
    </p>
  )
}

const chipBase =
  "motion-safe-transition relative inline-flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-[var(--atro-control-radius)] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-popover"

/**
 * Mini room mark — one paint layer (gradient / inset shadow), near-black
 * panels. Nested midtone fills crush on washed extended displays.
 */
function SurfaceChipPreview({
  swatch,
  panel,
  layout,
}: {
  swatch: string
  panel: string
  layout: (typeof SURFACE_THEMES)[number]["layout"]
}) {
  const style: CSSProperties =
    layout === "split"
      ? {
          backgroundImage: `linear-gradient(to right, ${swatch} 50%, ${panel} 50%)`,
        }
      : layout === "stack"
        ? {
            backgroundImage: `linear-gradient(to bottom, ${swatch} 55%, ${panel} 55%)`,
          }
        : layout === "frame"
          ? {
              backgroundColor: swatch,
              boxShadow: `inset 0 0 0 4px ${panel}`,
            }
          : layout === "inset"
            ? {
                backgroundColor: swatch,
                backgroundImage: `linear-gradient(${panel}, ${panel})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "14px 14px",
              }
            : {
                /* field — Ink */
                backgroundColor: panel,
                backgroundImage: `linear-gradient(${swatch}, ${swatch})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "14px 14px",
              }

  return <span className="absolute inset-0" style={style} aria-hidden />
}

/**
 * Unified Themes popover — Accent · Surface · Type · Radius.
 * Gradual revelation: one soft-rect control; inside, visual chips not
 * encyclopedia rows. Orthogonal to ThemeToggle (light / system / dark).
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
  const currentSurface =
    SURFACE_THEMES.find((t) => t.id === surface) ?? SURFACE_THEMES[0]!
  const currentType =
    TYPE_THEMES.find((t) => t.id === type) ?? TYPE_THEMES[0]!
  const currentRadius =
    RADIUS_THEMES.find((t) => t.id === radius) ?? RADIUS_THEMES[1]!

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

  const reading = mounted
    ? `${currentAccent.label} · ${currentSurface.label} · ${currentType.label} · ${currentRadius.label}`
    : "…"

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
        className="w-[15.5rem] gap-0 overflow-hidden p-0"
      >
        <PopoverHeader className="space-y-1 border-b border-border-subtle px-3.5 pb-2.5 pt-3">
          <PopoverTitle className="font-heading text-[0.9375rem] font-medium tracking-[-0.02em]">
            Themes
          </PopoverTitle>
          <p
            className="truncate text-[11px] tabular-nums text-muted-foreground"
            aria-live="polite"
          >
            {reading}
          </p>
        </PopoverHeader>

        <div className="flex flex-col gap-4 px-3.5 py-3.5">
          {/* Accent — color is the affordance */}
          <section>
            <AxisLabel>Accent</AxisLabel>
            <div
              role="radiogroup"
              aria-label="Accent"
              className="flex flex-wrap gap-1.5"
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
                    onClick={() => selectAccent(option.id)}
                    className={cn(
                      chipBase,
                      "ring-1 ring-inset ring-border-subtle",
                      active &&
                        "ring-2 ring-brand ring-offset-2 ring-offset-popover",
                    )}
                    style={{ background: option.swatch }}
                  />
                )
              })}
            </div>
          </section>

          {/* Surface — room chips */}
          <section>
            <AxisLabel>Surface</AxisLabel>
            <div
              role="radiogroup"
              aria-label="Surface"
              className="flex flex-wrap gap-1.5"
            >
              {SURFACE_THEMES.map((option) => {
                const active = mounted && surface === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    aria-label={option.label}
                    title={option.label}
                    onClick={() => selectSurface(option.id)}
                    className={cn(
                      chipBase,
                      "ring-1 ring-inset ring-border-subtle",
                      active &&
                        "ring-2 ring-foreground/55 ring-offset-2 ring-offset-popover",
                    )}
                  >
                    <SurfaceChipPreview
                      swatch={option.swatch}
                      panel={option.panel}
                      layout={option.layout}
                    />
                  </button>
                )
              })}
            </div>
          </section>

          {/* Type — glyph samples */}
          <section>
            <AxisLabel>Type</AxisLabel>
            <div
              role="radiogroup"
              aria-label="Type"
              className="flex flex-wrap gap-1.5"
            >
              {TYPE_THEMES.map((option) => {
                const active = mounted && type === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    aria-label={option.label}
                    title={option.label}
                    onClick={() => selectType(option.id)}
                    className={cn(
                      chipBase,
                      "bg-muted/60 text-[13px] leading-none text-foreground ring-1 ring-inset ring-border-subtle",
                      active &&
                        "bg-muted text-foreground ring-2 ring-foreground/55 ring-offset-2 ring-offset-popover",
                    )}
                    style={{ fontFamily: option.remaps["font-heading"] }}
                  >
                    {option.sample}
                  </button>
                )
              })}
            </div>
          </section>

          {/* Radius — corner previews */}
          <section>
            <AxisLabel>Radius</AxisLabel>
            <div
              role="radiogroup"
              aria-label="Radius"
              className="flex flex-wrap gap-1.5"
            >
              {RADIUS_THEMES.map((option) => {
                const active = mounted && radius === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    aria-label={option.label}
                    title={option.label}
                    onClick={() => selectRadius(option.id)}
                    className={cn(
                      chipBase,
                      "bg-transparent ring-1 ring-inset ring-border-subtle",
                      active &&
                        "ring-2 ring-foreground/55 ring-offset-2 ring-offset-popover",
                    )}
                  >
                    <span
                      className="size-4 border border-foreground/35 bg-muted"
                      style={{ borderRadius: option.value }}
                      aria-hidden
                    />
                  </button>
                )
              })}
            </div>
          </section>
        </div>
      </PopoverContent>
    </Popover>
  )
}
