"use client"

import { ArrowRight, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

/**
 * Edit CONTENT to change the sticky scroll CTA copy and thresholds.
 * Simplified vs the docs package demo (no analytics experiment wiring).
 */
const CONTENT = {
  stamp: "Free intro",
  headline: "Ready to ship?",
  body: "Book a 15-min intro - no pitch deck.",
  cta: "Book a call",
  href: "/contact#book",
  hideOn: ["/contact"],
  showAtPct: 28,
  hideAtPct: 94,
  dismissKey: "atroui_cta_dismissed",
}

export type ContextualCtaProps = {
  /** Docs / demos: skip scroll gating and render inline. */
  preview?: boolean
}

export function ContextualCta({ preview = false }: ContextualCtaProps) {
  const pathname = usePathname()
  const [visible, setVisible] = useState(preview)
  const [dismissed, setDismissed] = useState(false)
  const [ready, setReady] = useState(preview)

  useEffect(() => {
    if (preview) return
    try {
      if (sessionStorage.getItem(CONTENT.dismissKey) === "1") {
        setDismissed(true)
      }
    } catch {
      /* ignore */
    }
    setReady(true)
  }, [preview])

  useEffect(() => {
    if (preview || !ready || dismissed) return

    const onScroll = () => {
      const denom =
        document.documentElement.scrollHeight - window.innerHeight
      if (denom <= 0) {
        setVisible(false)
        return
      }
      const pct = (window.scrollY / denom) * 100
      setVisible(pct >= CONTENT.showAtPct && pct < CONTENT.hideAtPct)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [dismissed, ready, pathname, preview])

  const onHiddenPath =
    !preview &&
    CONTENT.hideOn.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`),
    )

  if (!ready || dismissed || !visible || onHiddenPath) return null

  const dismiss = () => {
    setDismissed(true)
    if (preview) return
    try {
      sessionStorage.setItem(CONTENT.dismissKey, "1")
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      className={
        preview
          ? "relative w-full pb-3"
          : "fixed inset-x-0 bottom-0 z-40 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      }
      role="complementary"
      aria-label="Suggested action"
    >
      <div className="mx-auto max-w-lg px-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] sm:max-w-xl sm:px-4">
        <div className="flex items-stretch border border-border-subtle bg-background shadow-[0_16px_48px_-24px_rgba(0,0,0,0.35)]">
          <div
            aria-hidden
            className="w-1 shrink-0 bg-[var(--color-brand,#0b7bff)]"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-3 p-3.5 sm:flex-row sm:items-center sm:gap-4 sm:p-4">
            <div className="min-w-0 flex-1">
              <p className="mb-1.5 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                {CONTENT.stamp}
              </p>
              <p className="text-sm font-medium tracking-tight text-foreground">
                {CONTENT.headline}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {CONTENT.body}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={CONTENT.href}
                className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full bg-foreground px-3.5 text-sm font-medium text-background sm:flex-none"
              >
                {CONTENT.cta}
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
              <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss suggestion"
                className="inline-flex size-9 shrink-0 items-center justify-center border border-border-subtle text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
