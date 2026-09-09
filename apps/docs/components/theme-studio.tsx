"use client"

/**
 * Theme Studio — one composition in the ToolRoom stage.
 * Family Values: gradual revelation (controls in the rail, sample on the stage),
 * soft-rect chrome, careful delight (Copy CSS is the one primary action).
 */

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  COLOR_THEMES,
  CopyButton,
  RADIUS_THEMES,
  RadiusThemePicker,
  SURFACE_THEMES,
  ThemeToggle,
  applyColorTheme,
  applyRadiusTheme,
  applySurfaceTheme,
  buildThemeExportCss,
  readStoredColorTheme,
  readStoredRadiusTheme,
  readStoredSurfaceTheme,
  type ColorThemeId,
  type RadiusThemeId,
  type SurfaceThemeId,
} from "atroui"
import {
  TYPE_FACES,
  applyTypeBody,
  applyTypeDisplay,
  readStoredTypeBody,
  readStoredTypeDisplay,
  typeFaceMeta,
  type TypeFaceId,
} from "atroui/lib/type-themes"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function ThemeStudio() {
  const [accent, setAccent] = useState<ColorThemeId>("mira")
  const [surface, setSurface] = useState<SurfaceThemeId>("mira")
  const [typeDisplay, setTypeDisplay] = useState<TypeFaceId>("serif")
  const [typeBody, setTypeBody] = useState<TypeFaceId>("sans")
  const [radius, setRadius] = useState<RadiusThemeId>("mira")
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
      {/* Left rail — controls only */}
      <aside className="flex w-full shrink-0 flex-col gap-6 border-b border-border-subtle bg-muted/30 p-4 md:w-[240px] md:border-b-0 md:border-r">
        <section className="space-y-2">
          <p className="ds-mono-label">Accent</p>
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
        </section>

        <section className="space-y-2">
          <p className="ds-mono-label">Surface</p>
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
        </section>

        <section className="space-y-2">
          <p className="ds-mono-label">Display</p>
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
        </section>

        <section className="space-y-2">
          <p className="ds-mono-label">Body</p>
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
        </section>

        <section className="space-y-2">
          <p className="ds-mono-label">Radius</p>
          <RadiusThemePicker className="w-full [&_button]:min-w-0 [&_button]:flex-1" />
        </section>

        <section className="space-y-2">
          <p className="ds-mono-label">Appearance</p>
          <div className="flex flex-col gap-1.5">
            <ThemeToggle />
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Site-wide light / dark / system.
            </p>
          </div>
        </section>

        <div className="mt-auto space-y-2 border-t border-border-subtle pt-4">
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
      </aside>

      {/* Main stage — one live sample composition */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-6 bg-background p-6 sm:p-8 md:p-10">
        <div className="mx-auto w-full max-w-md space-y-5">
          <div className="space-y-2">
            <h2 className="ds-headline text-2xl tracking-tight text-foreground sm:text-[1.75rem]">
              Your product, in this skin
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Accent, surface, display, body, and radius apply across the site.
              Copy the CSS when it feels right.
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
