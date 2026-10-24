"use client"

import {
  useEffect,
  useState,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
} from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import {
  COLOR_THEMES,
  applyColorTheme,
  readStoredColorTheme,
  type ColorThemeId,
} from "@/lib/color-themes"
import {
  RADIUS_THEMES,
  applyRadiusTheme,
  readStoredRadiusTheme,
  type RadiusThemeId,
} from "@/lib/radius-themes"
import {
  SURFACE_THEMES,
  applySurfaceTheme,
  readStoredSurfaceTheme,
  type SurfaceThemeId,
} from "@/lib/surface-themes"
import {
  TYPE_FACES,
  applyTypeBody,
  applyTypeDisplay,
  readStoredTypeBody,
  readStoredTypeDisplay,
  typeFaceMeta,
  type TypeFaceId,
} from "@/lib/type-themes"
import { layoutTween, switchLayoutTween } from "@/lib/motion"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./popover"

type AxisId = "accent" | "surface" | "type" | "radius"

const AXES: { id: AxisId; label: string }[] = [
  { id: "accent", label: "Accent" },
  { id: "surface", label: "Surface" },
  { id: "type", label: "Type" },
  { id: "radius", label: "Radius" },
]

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
                backgroundColor: panel,
                backgroundImage: `linear-gradient(${swatch}, ${swatch})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "14px 14px",
              }

  return <span className="absolute inset-0" style={style} aria-hidden />
}

function ChipShell({
  active,
  layoutId,
  reduce,
  tone = "brand",
  className,
  style,
  children,
  ...props
}: {
  active: boolean
  layoutId: string
  reduce: boolean | null
  /** Accent chips use brand ring; room / type / radius stay neutral. */
  tone?: "brand" | "neutral"
  className?: string
  style?: CSSProperties
  children?: ReactNode
} & Omit<ComponentProps<"button">, "className" | "style" | "children" | "type">) {
  const ringTone =
    tone === "brand" ? "ring-brand" : "ring-foreground/55"

  return (
    <button
      type="button"
      className={cn(
        "relative inline-flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-[var(--atro-control-radius)] outline-none transition-transform duration-150 ease-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-popover active:scale-[0.94]",
        "ring-1 ring-inset ring-border-subtle",
        className,
      )}
      style={style}
      {...props}
    >
      {children}
      {active ? (
        reduce ? (
          <span
            className={cn(
              "pointer-events-none absolute inset-0 rounded-[var(--atro-control-radius)] ring-2 ring-offset-2 ring-offset-popover",
              ringTone,
            )}
            aria-hidden
          />
        ) : (
          <motion.span
            layoutId={layoutId}
            className={cn(
              "pointer-events-none absolute inset-0 rounded-[var(--atro-control-radius)] ring-2 ring-offset-2 ring-offset-popover",
              ringTone,
            )}
            transition={switchLayoutTween}
            aria-hidden
          />
        )
      ) : null}
    </button>
  )
}

/**
 * Unified Themes popover — Accent · Surface · Type · Radius.
 * Gradual revelation: one axis at a time; selection ring travels; reading morphs.
 * Orthogonal to ThemeToggle (light / system / dark).
 */
export function ColorThemePicker({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const [accent, setAccent] = useState<ColorThemeId>("mira")
  const [surface, setSurface] = useState<SurfaceThemeId>("mira")
  const [typeDisplay, setTypeDisplay] = useState<TypeFaceId>("serif")
  const [typeBody, setTypeBody] = useState<TypeFaceId>("sans")
  const [radius, setRadius] = useState<RadiusThemeId>("mira")
  const [axis, setAxis] = useState<AxisId>("accent")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const storedAccent = readStoredColorTheme()
    const storedSurface = readStoredSurfaceTheme()
    const storedDisplay = readStoredTypeDisplay()
    const storedBody = readStoredTypeBody()
    const storedRadius = readStoredRadiusTheme()
    setAccent(storedAccent)
    setSurface(storedSurface)
    setTypeDisplay(storedDisplay)
    setTypeBody(storedBody)
    setRadius(storedRadius)
    applyColorTheme(storedAccent)
    applySurfaceTheme(storedSurface)
    applyTypeDisplay(storedDisplay)
    applyTypeBody(storedBody)
    applyRadiusTheme(storedRadius)
    setMounted(true)
  }, [])

  const currentAccent =
    COLOR_THEMES.find((t) => t.id === accent) ?? COLOR_THEMES[0]!
  const currentSurface =
    SURFACE_THEMES.find((t) => t.id === surface) ?? SURFACE_THEMES[0]!
  const currentDisplay = typeFaceMeta(typeDisplay)
  const currentBody = typeFaceMeta(typeBody)
  const currentRadius =
    RADIUS_THEMES.find((t) => t.id === radius) ?? RADIUS_THEMES[1]!

  const typeReading = `${currentDisplay.label} · ${currentBody.label}`

  const axisValue =
    axis === "accent"
      ? currentAccent.label
      : axis === "surface"
        ? currentSurface.label
        : axis === "type"
          ? typeReading
          : currentRadius.label

  const reading = mounted
    ? `${currentAccent.label} · ${currentSurface.label} · ${typeReading} · ${currentRadius.label}`
    : "…"

  const selectAccent = (id: ColorThemeId) => {
    setAccent(id)
    applyColorTheme(id)
  }
  const selectSurface = (id: SurfaceThemeId) => {
    setSurface(id)
    applySurfaceTheme(id)
  }
  const selectDisplay = (id: TypeFaceId) => {
    setTypeDisplay(id)
    applyTypeDisplay(id)
  }
  const selectBody = (id: TypeFaceId) => {
    setTypeBody(id)
    applyTypeBody(id)
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
        className="w-[15.5rem] gap-0 overflow-hidden p-0"
      >
        <PopoverHeader className="space-y-1 border-b border-border-subtle px-3.5 pb-2.5 pt-3">
          <PopoverTitle className="font-heading text-[0.9375rem] font-medium tracking-[-0.02em]">
            Themes
          </PopoverTitle>
          <div className="relative h-[1.125rem] overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={reading}
                className="truncate text-[11px] tabular-nums text-muted-foreground"
                aria-live="polite"
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -4 }}
                transition={layoutTween}
              >
                {reading}
              </motion.p>
            </AnimatePresence>
          </div>
        </PopoverHeader>

        {/* Axis switcher — one focus at a time */}
        <div
          role="tablist"
          aria-label="Theme axis"
          className="flex gap-0.5 border-b border-border-subtle px-2 py-1.5"
        >
          {AXES.map((item) => {
            const selected = axis === item.id
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setAxis(item.id)}
                className={cn(
                  "relative flex-1 rounded-[calc(var(--atro-control-radius)-1px)] px-1 py-1.5 text-[11px] font-medium tracking-tight outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                  selected
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {selected && !reduce ? (
                  <motion.span
                    layoutId="themes-axis-pill"
                    className="absolute inset-0 rounded-[calc(var(--atro-control-radius)-1px)] bg-muted"
                    transition={switchLayoutTween}
                    aria-hidden
                  />
                ) : null}
                {selected && reduce ? (
                  <span
                    className="absolute inset-0 rounded-[calc(var(--atro-control-radius)-1px)] bg-muted"
                    aria-hidden
                  />
                ) : null}
                <span className="relative z-[1]">{item.label}</span>
              </button>
            )
          })}
        </div>

        <div className="px-3.5 py-3">
          <div className="mb-2.5 flex items-baseline justify-between gap-2">
            <p className="ds-mono-label text-[10px] tracking-[0.14em] text-muted-foreground/80">
              {AXES.find((a) => a.id === axis)?.label}
            </p>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={`${axis}-${axisValue}`}
                className="text-[11px] text-muted-foreground"
                initial={reduce ? false : { opacity: 0, x: 4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -4 }}
                transition={layoutTween}
              >
                {mounted ? axisValue : "…"}
              </motion.p>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={axis}
              role="tabpanel"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -4 }}
              transition={layoutTween}
            >
              {axis === "accent" ? (
                <div
                  role="radiogroup"
                  aria-label="Accent"
                  className="flex flex-wrap gap-1.5"
                >
                  {COLOR_THEMES.map((option) => {
                    const active = mounted && accent === option.id
                    return (
                      <ChipShell
                        key={option.id}
                        active={active}
                        layoutId="themes-chip-accent"
                        reduce={reduce}
                        role="radio"
                        aria-checked={active}
                        aria-label={option.label}
                        title={option.label}
                        onClick={() => selectAccent(option.id)}
                        style={{ background: option.swatch }}
                      />
                    )
                  })}
                </div>
              ) : null}

              {axis === "surface" ? (
                <div
                  role="radiogroup"
                  aria-label="Surface"
                  className="flex flex-wrap gap-1.5"
                >
                  {SURFACE_THEMES.map((option) => {
                    const active = mounted && surface === option.id
                    return (
                      <ChipShell
                        key={option.id}
                        active={active}
                        layoutId="themes-chip-surface"
                        reduce={reduce}
                        tone="neutral"
                        role="radio"
                        aria-checked={active}
                        aria-label={option.label}
                        title={option.label}
                        onClick={() => selectSurface(option.id)}
                      >
                        <SurfaceChipPreview
                          swatch={option.swatch}
                          panel={option.panel}
                          layout={option.layout}
                        />
                      </ChipShell>
                    )
                  })}
                </div>
              ) : null}

              {axis === "type" ? (
                <div className="flex flex-col gap-3.5">
                  <div>
                    <p className="mb-1.5 text-[10px] font-medium tracking-wide text-muted-foreground">
                      Display
                    </p>
                    <div
                      role="radiogroup"
                      aria-label="Display type"
                      className="flex flex-wrap gap-1.5"
                    >
                      {TYPE_FACES.map((option) => {
                        const active = mounted && typeDisplay === option.id
                        return (
                          <ChipShell
                            key={option.id}
                            active={active}
                            layoutId="themes-chip-type-display"
                            reduce={reduce}
                            tone="neutral"
                            role="radio"
                            aria-checked={active}
                            aria-label={`Display ${option.label}`}
                            title={`Display · ${option.label}`}
                            onClick={() => selectDisplay(option.id)}
                            className="bg-muted/60 text-[13px] leading-none text-foreground"
                            style={{ fontFamily: option.host }}
                          >
                            {option.sample}
                          </ChipShell>
                        )
                      })}
                    </div>
                  </div>
                  <div>
                    <p className="mb-1.5 text-[10px] font-medium tracking-wide text-muted-foreground">
                      Body
                    </p>
                    <div
                      role="radiogroup"
                      aria-label="Body type"
                      className="flex flex-wrap gap-1.5"
                    >
                      {TYPE_FACES.map((option) => {
                        const active = mounted && typeBody === option.id
                        return (
                          <ChipShell
                            key={option.id}
                            active={active}
                            layoutId="themes-chip-type-body"
                            reduce={reduce}
                            tone="neutral"
                            role="radio"
                            aria-checked={active}
                            aria-label={`Body ${option.label}`}
                            title={`Body · ${option.label}`}
                            onClick={() => selectBody(option.id)}
                            className="bg-muted/60 text-[12px] leading-none text-foreground"
                            style={{ fontFamily: option.host }}
                          >
                            {option.sample === "Aa" ? "ag" : option.sample}
                          </ChipShell>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ) : null}

              {axis === "radius" ? (
                <div
                  role="radiogroup"
                  aria-label="Radius"
                  className="flex flex-wrap gap-1.5"
                >
                  {RADIUS_THEMES.map((option) => {
                    const active = mounted && radius === option.id
                    return (
                      <ChipShell
                        key={option.id}
                        active={active}
                        layoutId="themes-chip-radius"
                        reduce={reduce}
                        tone="neutral"
                        role="radio"
                        aria-checked={active}
                        aria-label={option.label}
                        title={option.label}
                        onClick={() => selectRadius(option.id)}
                      >
                        <span
                          className="size-4 border border-foreground/35 bg-muted"
                          style={{ borderRadius: option.value }}
                          aria-hidden
                        />
                      </ChipShell>
                    )
                  })}
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </PopoverContent>
    </Popover>
  )
}
