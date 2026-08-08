"use client"

import { ExternalLink } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import { getBrand } from "@/lib/brand"

/**
 * Edit CONTENT for fallback copy and default Calendly URL.
 * Prefers CONTENT.url, then NEXT_PUBLIC_CALENDLY_URL.
 */
const CONTENT = {
  url: "",
  stamp: "Scheduler",
  emptyTitle: "Calendly isn't connected yet",
  emptyBody:
    "Set CONTENT.url or NEXT_PUBLIC_CALENDLY_URL - or email us and we'll find a slot.",
  emailCtaPrefix: "Email",
  iframeTitleSuffix: "Book a 15-minute intro call",
  primaryColor: "0b7bff",
  darkBg: "0a0a0a",
  lightBg: "ffffff",
  darkText: "fafafa",
  lightText: "0a0a0a",
}

export type CalendlyEmbedProps = {
  url?: string
}

export function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  const calendlyUrl =
    url || CONTENT.url || process.env.NEXT_PUBLIC_CALENDLY_URL || ""
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const brand = getBrand()

  useEffect(() => {
    setMounted(true)
    const root = document.documentElement
    const sync = () => setIsDark(root.classList.contains("dark"))
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
        primary_color: CONTENT.primaryColor,
        background_color: isDark ? CONTENT.darkBg : CONTENT.lightBg,
        text_color: isDark ? CONTENT.darkText : CONTENT.lightText,
      })
      u.search = u.search
        ? `${u.search}&${params.toString()}`
        : `?${params.toString()}`
      return u.toString()
    } catch {
      return ""
    }
  }, [calendlyUrl, isDark])

  if (!calendlyUrl || !src) {
    return (
      <div className="flex flex-col gap-4 border border-border-subtle px-4 py-10 sm:px-6 sm:py-14">
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
          className="inline-flex h-11 w-fit items-center gap-2 rounded-lg bg-foreground px-5 text-sm font-medium text-background"
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
        />
      )}
    </div>
  )
}
