"use client"

/**
 * Theme Studio — one composition in the ToolRoom stage.
 * Family Values: gradual revelation (one axis at a time in the rail, sample on
 * the stage), soft-rect chrome, careful delight (Copy CSS is the one primary action).
 */

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import {
  CopyButton,
  RadiusThemePicker,
  ThemeToggle,
} from "atroui"
import {
  COLOR_THEMES,
  RADIUS_THEMES,
  SURFACE_THEMES,
  TYPE_FACES,
  applyColorTheme,
  applyRadiusTheme,
  applySurfaceTheme,
  applyTypeBody,
  applyTypeDisplay,
  buildThemeExportCss,
  readStoredColorTheme,
  readStoredRadiusTheme,
  readStoredSurfaceTheme,
  readStoredTypeBody,
  readStoredTypeDisplay,
  typeFaceMeta,
  type ColorThemeId,
  type RadiusThemeId,
  type SurfaceThemeId,
  type TypeFaceId,
} from "atroui/lib/theme"
import { Check } from "lucide-react"
import { layoutTween, switchLayoutTween } from "@/lib/motion"
import { cn } from "@/lib/utils"

type AxisId = "accent" | "surface" | "type" | "radius"

const AXES: { id: AxisId; label: string }[] = [
  { id: "accent", label: "Accent" },
  { id: "surface", label: "Surface" },
  { id: "type", label: "Type" },
  { id: "radius", label: "Radius" },
]

export function ThemeStudio() {
  const reduce = useReducedMotion()
  const [accent, setAccent] = useState<ColorThemeId>("mira")
  const [surface, setSurface] = useState<SurfaceThemeId>("mira")
  const [typeDisplay, setTypeDisplay] = useState<TypeFaceId>("serif")
  const [typeBody, setTypeBody] = useState<TypeFaceId>("sans")
  const [radius, setRadius] = useState<RadiusThemeId>("mira")
  const [axis, setAxis] = useState<AxisId>("accent")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const nextAccent = readStoredColorTheme()
    const nextSurface = readStoredSurfaceTheme()
    const nextDisplay = readStoredTypeDisplay()
    const nextBody = readStoredTypeBody()
    const nextRadius = readStoredRadiusTheme()
    setAccent(nextAccent)
    setSurface(nextSurface)
    setTypeDisplay(nextDisplay)
    setTypeBody(nextBody)
    setRadius(nextRadius)
    applyColorTheme(nextAccent)
    applySurfaceTheme(nextSurface)
    applyTypeDisplay(nextDisplay)
    applyTypeBody(nextBody)
    applyRadiusTheme(nextRadius)
    setMounted(true)

    // RadiusThemePicker is uncontrolled — mirror data-radius for export footer.
    const root = document.documentElement
    const syncRadius = () => setRadius(readStoredRadiusTheme())
    const mo = new MutationObserver(syncRadius)
    mo.observe(root, { attributes: true, attributeFilter: ["data-radius"] })
    return () => mo.disconnect()
  }, [])

  const accentMeta =
    COLOR_THEMES.find((t) => t.id === accent) ?? COLOR_THEMES[0]!
  const surfaceMeta =
    SURFACE_THEMES.find((t) => t.id === surface) ?? SURFACE_THEMES[0]!
  const displayMeta = typeFaceMeta(typeDisplay)
  const bodyMeta = typeFaceMeta(typeBody)
  const radiusMeta =
    RADIUS_THEMES.find((t) => t.id === radius) ?? RADIUS_THEMES[1]!

  const typeReading = `${displayMeta.label} · ${bodyMeta.label}`

  const axisValue =
    axis === "accent"
      ? accentMeta.label
      : axis === "surface"
        ? surfaceMeta.label
        : axis === "type"
          ? typeReading
          : radiusMeta.label

  const exportCss = useMemo(
    () =>
      buildThemeExportCss({
        accent,
        radius,
        surface,
        typeDisplay,
        typeBody,
      }),
    [accent, radius, surface, typeDisplay, typeBody],
  )

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

  return (
    <div className="flex min-h-[28rem] flex-col md:flex-row">
      {/* Left rail — one axis at a time; Appearance + Copy always on */}
      <aside className="flex w-full shrink-0 flex-col border-b border-border-subtle bg-muted/30 md:w-[260px] md:border-b-0 md:border-r">
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
                aria-controls={`theme-studio-panel-${item.id}`}
                id={`theme-studio-tab-${item.id}`}
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
                    layoutId="theme-studio-axis-pill"
                    className="absolute inset-0 rounded-[calc(var(--atro-control-radius)-1px)] bg-background ring-1 ring-border-subtle"
                    transition={switchLayoutTween}
                    aria-hidden
                  />
                ) : null}
                {selected && reduce ? (
                  <span
                    className="absolute inset-0 rounded-[calc(var(--atro-control-radius)-1px)] bg-background ring-1 ring-border-subtle"
                    aria-hidden
                  />
                ) : null}
                <span className="relative z-[1]">{item.label}</span>
              </button>
            )
          })}
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-4 p-4">
          <div className="flex items-baseline justify-between gap-2">
            <p className="ds-mono-label text-[10px] tracking-[0.14em] text-muted-foreground/80">
              {AXES.find((a) => a.id === axis)?.label}
            </p>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={`${axis}-${axisValue}`}
                className="truncate text-[11px] text-muted-foreground"
                aria-live="polite"
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
              id={`theme-studio-panel-${axis}`}
              aria-labelledby={`theme-studio-tab-${axis}`}
              className="min-h-0 flex-1"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -4 }}
              transition={layoutTween}
            >
              {axis === "accent" ? (
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
                            ? "bg-background text-foreground ring-1 ring-border-subtle"
                            : "text-muted-foreground hover:bg-background/70 hover:text-foreground",
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
              ) : null}

              {axis === "surface" ? (
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
                            ? "bg-background text-foreground ring-1 ring-border-subtle"
                            : "text-muted-foreground hover:bg-background/70 hover:text-foreground",
                        )}
                      >
                        <span
                          className="relative size-4 shrink-0 overflow-hidden rounded-[3px] ring-1 ring-border-subtle"
                          style={
                            option.layout === "split"
                              ? {
                                  backgroundImage: `linear-gradient(to right, ${option.swatch} 50%, ${option.panel} 50%)`,
                                }
                              : option.layout === "stack"
                                ? {
                                    backgroundImage: `linear-gradient(to bottom, ${option.swatch} 55%, ${option.panel} 55%)`,
                                  }
                                : option.layout === "frame"
                                  ? {
                                      backgroundColor: option.swatch,
                                      boxShadow: `inset 0 0 0 2px ${option.panel}`,
                                    }
                                  : option.layout === "inset"
                                    ? {
                                        backgroundColor: option.swatch,
                                        backgroundImage: `linear-gradient(${option.panel}, ${option.panel})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        backgroundSize: "8px 8px",
                                      }
                                    : {
                                        backgroundColor: option.panel,
                                        backgroundImage: `linear-gradient(${option.swatch}, ${option.swatch})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        backgroundSize: "8px 8px",
                                      }
                          }
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
              ) : null}

              {axis === "type" ? (
                <div className="flex flex-col gap-5">
                  <div className="space-y-2">
                    <p className="text-[10px] font-medium tracking-wide text-muted-foreground">
                      Display
                    </p>
                    <div
                      role="radiogroup"
                      aria-label="Display type"
                      className="flex flex-col gap-0.5"
                    >
                      {TYPE_FACES.map((option) => {
                        const active = mounted && typeDisplay === option.id
                        return (
                          <button
                            key={option.id}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => selectDisplay(option.id)}
                            className={cn(
                              "motion-safe-transition flex w-full items-center gap-2.5 rounded-[var(--atro-control-radius)] px-2 py-1.5 text-left",
                              active
                                ? "bg-background text-foreground ring-1 ring-border-subtle"
                                : "text-muted-foreground hover:bg-background/70 hover:text-foreground",
                            )}
                          >
                            <span
                              className="inline-flex size-8 shrink-0 items-center justify-center rounded-[3px] bg-background text-sm font-medium text-foreground ring-1 ring-border-subtle"
                              style={{ fontFamily: option.host }}
                              aria-hidden
                            >
                              {option.sample}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-medium text-foreground">
                                {option.label}
                              </span>
                              <span className="block text-[11px] text-muted-foreground">
                                Headlines · {option.description}
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
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-medium tracking-wide text-muted-foreground">
                      Body
                    </p>
                    <div
                      role="radiogroup"
                      aria-label="Body type"
                      className="flex flex-col gap-0.5"
                    >
                      {TYPE_FACES.map((option) => {
                        const active = mounted && typeBody === option.id
                        return (
                          <button
                            key={option.id}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => selectBody(option.id)}
                            className={cn(
                              "motion-safe-transition flex w-full items-center gap-2.5 rounded-[var(--atro-control-radius)] px-2 py-1.5 text-left",
                              active
                                ? "bg-background text-foreground ring-1 ring-border-subtle"
                                : "text-muted-foreground hover:bg-background/70 hover:text-foreground",
                            )}
                          >
                            <span
                              className="inline-flex size-8 shrink-0 items-center justify-center rounded-[3px] bg-background text-[12px] font-medium text-foreground ring-1 ring-border-subtle"
                              style={{ fontFamily: option.host }}
                              aria-hidden
                            >
                              {option.sample === "Aa" ? "ag" : option.sample}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-medium text-foreground">
                                {option.label}
                              </span>
                              <span className="block text-[11px] text-muted-foreground">
                                UI · copy · {option.description}
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
                  </div>
                </div>
              ) : null}

              {axis === "radius" ? (
                <RadiusThemePicker className="w-full [&_button]:min-w-0 [&_button]:flex-1" />
              ) : null}
            </motion.div>
          </AnimatePresence>

          <div className="mt-auto space-y-3 border-t border-border-subtle pt-4">
            <div className="flex items-center justify-between gap-3">
              <p className="ds-mono-label text-[10px] tracking-[0.14em] text-muted-foreground/80">
                Appearance
              </p>
              <ThemeToggle />
            </div>
            <CopyButton
              value={exportCss}
              idleLabel="Copy CSS"
              className="w-full justify-center"
              variant="default"
            />
            <p className="font-mono text-[10px] leading-relaxed text-muted-foreground">
              {mounted ? (
                <>
                  {accentMeta.label} · {surfaceMeta.label} · {displayMeta.label}/
                  {bodyMeta.label} · {radiusMeta.label}
                </>
              ) : (
                "…"
              )}
            </p>
          </div>
        </div>
      </aside>

      {/* Main stage — one live sample composition */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-6 bg-background p-6 sm:p-8 md:p-10">
        <div className="mx-auto w-full max-w-md space-y-5">
          <div className="space-y-2">
            <h2 className="ds-headline text-2xl tracking-tight text-foreground sm:text-[1.75rem]">
              Your product, in this skin
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Tune one axis at a time. The stage stays live — copy CSS when it
              feels right.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className="atro-btn">
              Primary action
            </button>
            <button type="button" className="atro-btn-ghost">
              Ghost
            </button>
          </div>

          <p className="text-[13px] leading-relaxed text-muted-foreground">
            Muted note — secondary copy tracks{" "}
            <code className="rounded-[calc(var(--radius)-2px)] bg-muted px-1 py-0.5 font-mono text-[11px] text-foreground">
              --muted-foreground
            </code>
            .
          </p>

          <label className="block space-y-1.5">
            <span className="ds-mono-label">Field</span>
            <input
              type="text"
              readOnly
              defaultValue="soft-rect input"
              className="flex h-[var(--atro-control-height,2.25rem)] w-full min-w-0 rounded-[var(--atro-control-radius,var(--radius))] border border-border-subtle bg-background px-3 text-sm text-foreground outline-none"
            />
          </label>

          <p>
            <Link href="/docs/theming" className="bam-link text-sm">
              Theming guide
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
