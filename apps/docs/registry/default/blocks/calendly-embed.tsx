"use client"

import { ExternalLink } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import { getBrand } from "@/lib/brand"

/**
 * Edit CONTENT for fallback copy and default Calendly URL.
 * Prefers CONTENT.url, then NEXT_PUBLIC_CALENDLY_URL.
 * Theme colors track the host CSS vars (Mira) — no foreign blue/black hex.
 */
const CONTENT = {
  url: "",
  stamp: "Scheduler",
  emptyTitle: "Calendly isn't connected yet",
  emptyBody:
    "Set CONTENT.url or NEXT_PUBLIC_CALENDLY_URL - or email us and we'll find a slot.",
  emailCtaPrefix: "Email",
  iframeTitleSuffix: "Book a 15-minute intro call",
  /** Mira indigo fallbacks when CSS vars are unavailable (SSR / iframe). */
  primaryColor: "7c6bf0",
  darkBg: "242428",
  lightBg: "ffffff",
  darkText: "fafafa",
  lightText: "171717",
}

export type CalendlyEmbedProps = {
  url?: string
}

/** Read a CSS color and return 6-char hex without # (Calendly iframe params). */
function cssToHex(value: string, fallback: string): string {
  const v = value.trim()
  if (!v) return fallback
  const hex = /^#?([0-9a-f]{6})$/i.exec(v)
  if (hex) return hex[1]!.toLowerCase()
  const short = /^#?([0-9a-f]{3})$/i.exec(v)
  if (short) {
    const [r, g, b] = short[1]!.split("")
    return `${r}${r}${g}${g}${b}${b}`.toLowerCase()
  }
  const rgb = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i.exec(v)
  if (rgb) {
    const to = (n: string) =>
      Math.max(0, Math.min(255, Math.round(Number(n))))
        .toString(16)
        .padStart(2, "0")
    return `${to(rgb[1]!)}${to(rgb[2]!)}${to(rgb[3]!)}`
  }
  return fallback
}

function themeHex(varName: string, fallback: string): string {
  const probe = document.createElement("span")
  probe.style.color = `var(${varName})`
  probe.style.position = "fixed"
  probe.style.left = "-9999px"
  document.documentElement.appendChild(probe)
  const computed = getComputedStyle(probe).color
  probe.remove()
  return cssToHex(computed, fallback)
}

export function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  const calendlyUrl =
    url || CONTENT.url || process.env.NEXT_PUBLIC_CALENDLY_URL || ""
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [palette, setPalette] = useState({
    primary: CONTENT.primaryColor,
    bg: CONTENT.darkBg,
    text: CONTENT.darkText,
  })
  const brand = getBrand()

  useEffect(() => {
    setMounted(true)
    const root = document.documentElement
    const sync = () => {
      const dark = root.classList.contains("dark")
      setIsDark(dark)
      setPalette({
        primary: themeHex("--brand", CONTENT.primaryColor),
        bg: themeHex(
          "--background",
          dark ? CONTENT.darkBg : CONTENT.lightBg
        ),
        text: themeHex(
          "--foreground",
          dark ? CONTENT.darkText : CONTENT.lightText
        ),
      })
    }
    sync()
    const obs = new MutationObserver(sync)
    obs.observe(root, { attributes: true, attributeFilter: ["class"] })
    return () => obs.disconnect()
  }, [])

  const src = useMemo(() => {
    if (!calendlyUrl) return ""
    try {
      const u = new URL(calendlyUrl)
      const params = new URLSearchParams({
        hide_gdpr_banner: "1",
        hide_landing_page_details: "1",
        hide_event_type_details: "0",
        primary_color: palette.primary,
        background_color: palette.bg,
        text_color: palette.text,
      })
      u.search = u.search
        ? `${u.search}&${params.toString()}`
        : `?${params.toString()}`
      return u.toString()
    } catch {
      return ""
    }
  }, [calendlyUrl, palette])

  if (!calendlyUrl || !src) {
    return (
      <div className="flex flex-col gap-4 border border-border-subtle bg-background px-4 py-10 sm:px-6 sm:py-14">
        <p className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
          {CONTENT.stamp}
        </p>
        <h3 className="text-xl font-medium text-foreground">
          {CONTENT.emptyTitle}
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          {CONTENT.emptyBody}
        </p>
        <a
          href={`mailto:${brand.email}`}
          className="inline-flex h-11 w-fit items-center gap-2 rounded-[var(--atro-control-radius,0.375rem)] bg-foreground px-5 text-sm font-medium text-background"
        >
          {CONTENT.emailCtaPrefix} {brand.email}
          <ExternalLink className="size-3.5" aria-hidden />
        </a>
      </div>
    )
  }

  return (
    <div className="overflow-hidden border border-border-subtle bg-background">
      {!mounted ? (
        <div
          className="flex h-[min(720px,75dvh)] min-h-[420px] items-center justify-center bg-muted/30"
          aria-hidden
        >
          <div className="h-full w-full animate-pulse bg-muted/40" />
        </div>
      ) : (
        <iframe
          src={src}
          title={`${CONTENT.iframeTitleSuffix} with ${brand.name}`}
          loading="lazy"
          className="block h-[min(720px,75dvh)] min-h-[420px] w-full border-0"
          data-theme={isDark ? "dark" : "light"}
        />
      )}
    </div>
  )
}
