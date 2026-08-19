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

type Mode = "light" | "naive" | "adaptive"

type PaletteDef = {
  id: string
  name: string
  note: string
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
    name: "Warm paper",
    note: "Studio cream. Naive dark greys the terracotta.",
    light: swatch({
      background: "#F4F1EA",
      foreground: "#1C1915",
      muted: "#9A948A",
      brand: "#C45C26",
    }),
  },
  {
    id: "mint",
    name: "Cool SaaS",
    note: "Mint canvas. Naive dark loses the supporting line.",
    light: swatch({
      background: "#E8F4F1",
      foreground: "#12332E",
      muted: "#7A9A94",
      brand: "#0F766E",
    }),
  },
  {
    id: "lilac",
    name: "Dusk lilac",
    note: "Soft violet brand. Invert flattens the accent.",
    light: swatch({
      background: "#F3EEF8",
      foreground: "#23182C",
      muted: "#8E7FA0",
      brand: "#7C3AED",
    }),
  },
  {
    id: "ink",
    name: "Newsprint",
    note: "High-chroma red on bone. Dark needs the red to stay.",
    light: swatch({
      background: "#F7F4EC",
      foreground: "#1A1A1A",
      muted: "#8B8678",
      brand: "#C41E3A",
    }),
  },
]

function colorsFor(light: ThemeSwatch, mode: Mode): ThemeSwatch {
  if (mode === "light") return light
  return companionDark(light, mode)
}

function PaletteCard({ palette }: { palette: PaletteDef }) {
  const [mode, setMode] = React.useState<Mode>("light")
  const c = colorsFor(palette.light, mode)
  const mutedRatio = contrastRatio(c.muted, c.background)
  const passes = mutedRatio >= 4.5

  return (
    <article className="overflow-hidden rounded-lg border border-border-subtle">
      <div
        className="p-4"
        style={{
          backgroundColor: rgbToCss(c.background),
          color: rgbToCss(c.foreground),
        }}
      >
        <p
          className="text-[11px] font-medium tracking-wide"
          style={{ color: rgbToCss(c.muted) }}
        >
          {palette.name}
        </p>
        <p className="mt-1 text-[11px] leading-snug" style={{ color: rgbToCss(c.muted) }}>
          {palette.note}
        </p>
        <p className="mt-1.5 text-[15px] font-medium leading-snug">
          Scope the launch week
        </p>
        <p
          className="mt-1.5 text-[12.5px] leading-relaxed"
          style={{ color: rgbToCss(c.muted) }}
        >
          Supporting copy, captions, and helper text. This is what naive dark
          often hides.
        </p>
        <span
          className="mt-3 inline-flex rounded-md px-2.5 py-1 text-[11px] font-medium"
          style={{
            backgroundColor: rgbToCss(c.brand),
            color: "#fff",
          }}
        >
          Brand
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border-subtle bg-background px-3 py-2">
        <div
          role="radiogroup"
          aria-label={`${palette.name} appearance`}
          className="inline-flex overflow-hidden rounded-md border border-border-subtle"
        >
          {(
            [
              ["light", "Light"],
              ["naive", "Naive"],
              ["adaptive", "Adapt"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={mode === id}
              onClick={() => setMode(id)}
              className={cn(
                "px-2 py-1 text-[11px] text-muted-foreground",
                mode === id && "bg-primary text-primary-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <p
          className={cn(
            "font-mono text-[10px] tabular-nums",
            passes ? "text-muted-foreground" : "text-brand"
          )}
        >
          muted {mutedRatio.toFixed(1)}:1 {passes ? "AA" : "fail"}
        </p>
      </div>
    </article>
  )
}

export function DemoThemeAdapt() {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-[13px] leading-relaxed text-muted-foreground">
          Four designed light palettes. Switch each card to Naive dark vs
          Adapt. The ratio is live from the same helpers ThemeAdapt uses.
        </p>
        <ThemeAdapt />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {PALETTES.map((palette) => (
          <PaletteCard key={palette.id} palette={palette} />
        ))}
      </div>
    </div>
  )
}
