"use client"

import * as React from "react"
import { ThemeAdapt } from "atroui/components/ui/theme-adapt"
import {
  companionDark,
  contrastRatio,
  parseHex,
  rgbToCss,
  type ThemeSwatch,
} from "atroui/lib/adaptive-theme"
import { cn } from "@/lib/utils"

type Stage = "light" | "naive" | "adaptive"

type PaletteDef = {
  id: string
  name: string
  kicker: string
  headline: string
  body: string
  cta: string
  light: ThemeSwatch
}

function swatch(hex: {
  background: string
  foreground: string
  muted: string
  brand: string
}): ThemeSwatch {
  const background = parseHex(hex.background)
  const foreground = parseHex(hex.foreground)
  const muted = parseHex(hex.muted)
  const brand = parseHex(hex.brand)
  if (!background || !foreground || !muted || !brand) {
    throw new Error("Palette hex must be #RRGGBB")
  }
  return { background, foreground, muted, brand }
}

const PALETTES: PaletteDef[] = [
  {
    id: "paper",
    name: "Kiln",
    kicker: "Studio notes",
    headline: "Cone 6 this Thursday",
    body: "Hold at peak twenty minutes. The glaze notes sit in muted type. Lose those and the firing is guesswork.",
    cta: "Open schedule",
    light: swatch({
      background: "#F4F1EA",
      foreground: "#1C1915",
      muted: "#9A948A",
      brand: "#C45C26",
    }),
  },
  {
    id: "mint",
    name: "Uptime",
    kicker: "Status",
    headline: "99.98% this week",
    body: "Incident copy and helper lines are the first to vanish when the canvas goes near-black.",
    cta: "View incidents",
    light: swatch({
      background: "#E8F4F1",
      foreground: "#12332E",
      muted: "#7A9A94",
      brand: "#0F766E",
    }),
  },
  {
    id: "lilac",
    name: "Dusk",
    kicker: "Reading list",
    headline: "Three essays tonight",
    body: "Captions carry the author. Flatten the violet and the list reads as generic chrome.",
    cta: "Start with one",
    light: swatch({
      background: "#F3EEF8",
      foreground: "#23182C",
      muted: "#8E7FA0",
      brand: "#7C3AED",
    }),
  },
  {
    id: "ink",
    name: "Edition",
    kicker: "City desk",
    headline: "6am print run",
    body: "The red masthead is the identity. Grey it in dark mode and it is any other paper.",
    cta: "Read the lead",
    light: swatch({
      background: "#F7F4EC",
      foreground: "#1A1A1A",
      muted: "#8B8678",
      brand: "#C41E3A",
    }),
  },
]

const STAGES: { id: Stage; label: string }[] = [
  { id: "light", label: "Light" },
  { id: "naive", label: "Naive dark" },
  { id: "adaptive", label: "Adapt" },
]

function colorsFor(light: ThemeSwatch, stage: Stage): ThemeSwatch {
  if (stage === "light") return light
  return companionDark(light, stage)
}

function MiniSite({
  palette,
  stage,
}: {
  palette: PaletteDef
  stage: Stage
}) {
  const c = colorsFor(palette.light, stage)
  const mutedRatio = contrastRatio(c.muted, c.background)
  const passes = mutedRatio >= 4.5

  return (
    <section className="flex min-w-[220px] flex-1 snap-start flex-col">
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <p className="ms-stamp text-[12px] text-muted-foreground">{STAGES.find((s) => s.id === stage)?.label}</p>
        <p
          className={cn(
            "font-mono text-[10px] tabular-nums tracking-tight",
            passes ? "text-muted-foreground" : "text-brand"
          )}
        >
          {mutedRatio.toFixed(1)}:1 {passes ? "AA" : "fail"}
        </p>
      </div>
      <div
        className="flex min-h-[220px] flex-col rounded-lg border border-border-subtle p-4 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
        style={{
          backgroundColor: rgbToCss(c.background),
          color: rgbToCss(c.foreground),
        }}
      >
        <p
          className="font-mono text-[10px] font-medium tracking-[0.16em] uppercase"
          style={{ color: rgbToCss(c.muted) }}
        >
          {palette.kicker}
        </p>
        <h3 className="ds-display mt-3 text-[28px] leading-none">
          {palette.headline}
        </h3>
        <p
          className="mt-3 flex-1 text-[13px] leading-relaxed"
          style={{ color: rgbToCss(c.muted) }}
        >
          {palette.body}
        </p>
        <span
          className="mt-4 inline-flex w-fit rounded-lg px-2.5 py-1.5 text-[12px] font-medium"
          style={{
            backgroundColor: rgbToCss(c.brand),
            color: "#fff",
          }}
        >
          {palette.cta}
        </span>
      </div>
    </section>
  )
}

export function DemoThemeAdapt() {
  const [activeId, setActiveId] = React.useState(PALETTES[0]!.id)
  const palette = PALETTES.find((p) => p.id === activeId) ?? PALETTES[0]!

  return (
    <div className="flex w-full flex-col gap-5 p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="ms-stamp mb-1 text-[12px]">Palettes</p>
          <div
            role="radiogroup"
            aria-label="Light palette"
            className="flex flex-wrap gap-1.5"
          >
            {PALETTES.map((item) => {
              const selected = item.id === activeId
              return (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setActiveId(item.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[13px]",
                    selected
                      ? "border-brand/50 bg-brand/10 text-foreground"
                      : "border-border-subtle text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span
                    className="size-2.5 rounded-[2px]"
                    style={{ backgroundColor: rgbToCss(item.light.brand) }}
                    aria-hidden
                  />
                  {item.name}
                </button>
              )
            })}
          </div>
        </div>
        <ThemeAdapt />
      </div>

      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-3 md:overflow-visible">
        {STAGES.map((stage) => (
          <MiniSite key={stage.id} palette={palette} stage={stage.id} />
        ))}
      </div>
    </div>
  )
}
