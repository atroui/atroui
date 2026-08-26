"use client"

import * as React from "react"
import { Check, Palette, X } from "lucide-react"
import { useTheme } from "next-themes"
import posthog from "posthog-js"
import { OverlayShell } from "@/components/overlay-shell"
import {
  SITE_THEMES,
  resolveSiteTheme,
  type SiteThemeId,
} from "@/lib/site-themes"
import { cn } from "@/lib/utils"

function useSiteTheme() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const active = resolveSiteTheme(theme ?? resolvedTheme)

  function pick(id: SiteThemeId) {
    setTheme(id)
    posthog.capture("theme_selected", { theme: id, source: "landing" })
  }

  return { mounted, active, pick }
}

function ThemeSwatch({
  ground,
  raised,
  accent,
  className,
}: {
  ground: string
  raised: string
  accent: string
  className?: string
}) {
  return (
    <span className={cn("wf-theme-swatch", className)} aria-hidden>
      <span style={{ background: ground }} />
      <span style={{ background: raised }} />
      <span style={{ background: accent }} />
    </span>
  )
}

export function ThemeRail() {
  const { mounted, active, pick } = useSiteTheme()

  return (
    <div className="wf-theme-rail">
      <p className="wf-theme-rail-label">Themes</p>
      {SITE_THEMES.map((sheet) => {
        const current = mounted && active === sheet.id
        return (
          <button
            key={sheet.id}
            type="button"
            className="wf-theme-rail-item"
            aria-pressed={current}
            onClick={() => pick(sheet.id)}
          >
            <span
              className="wf-theme-rail-dot"
              style={{ background: sheet.preview.accent }}
              aria-hidden
            />
            {sheet.label}
          </button>
        )
      })}
    </div>
  )
}

export function ThemeTrayButton() {
  const [open, setOpen] = React.useState(false)
  const { mounted, active, pick } = useSiteTheme()
  const current = SITE_THEMES.find((item) => item.id === active)

  return (
    <>
      <button
        type="button"
        className="inline-flex size-11 items-center justify-center text-foreground"
        aria-label="Themes"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <Palette className="size-4" aria-hidden />
      </button>
      <OverlayShell
        open={open}
        onClose={() => setOpen(false)}
        side="right"
        label="Themes"
        trapFocus
        className="min-[1200px]:hidden"
        panelClassName="w-[min(18rem,calc(100vw-2.5rem))] border-[var(--line)] bg-background p-5 pt-[max(1.25rem,env(safe-area-inset-top))]"
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="text-[15px] font-medium">Themes</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="inline-flex size-11 items-center justify-center"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="flex flex-col gap-1">
          {SITE_THEMES.map((sheet) => {
            const selected = mounted && active === sheet.id
            return (
              <button
                key={sheet.id}
                type="button"
                className={cn(
                  "flex h-11 items-center gap-3 rounded-[8px] px-2 text-left text-[15px]",
                  selected ? "text-foreground" : "text-muted-foreground"
                )}
                aria-pressed={selected}
                onClick={() => {
                  pick(sheet.id)
                  setOpen(false)
                }}
              >
                <ThemeSwatch {...sheet.preview} className="wf-theme-swatch-sm" />
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-foreground">
                    {sheet.label}
                  </span>
                  <span className="block text-[12px] text-muted-foreground">
                    {sheet.hint}
                  </span>
                </span>
                {selected ? (
                  <Check className="size-3.5 shrink-0" aria-hidden />
                ) : null}
              </button>
            )
          })}
        </div>
        {current ? (
          <p className="mt-6 text-[12px] leading-5 text-muted-foreground">
            {current.kind === "dark" ? "Dark" : "Light"} sheet.
          </p>
        ) : null}
      </OverlayShell>
    </>
  )
}
