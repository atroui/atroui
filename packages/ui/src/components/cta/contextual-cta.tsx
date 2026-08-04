"use client";

import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  CTA_EXPERIMENT,
  getExperimentVariant,
  trackEvent,
} from "../../lib/analytics";
import { cn } from "../../lib/utils";

type CTAConfig = {
  id: string;
  stamp: string;
  headline: string;
  body: string;
  cta: string;
  href: string;
  /** Hide only when already on the CTA destination. */
  hideOn: string[];
};

const SCROLL_CTAS: Record<string, CTAConfig> = {
  book_call: {
    id: "book_call",
    stamp: "Free intro",
    headline: "Ready to ship?",
    body: "Book a 15-min intro — no pitch deck.",
    cta: "Book a call",
    href: "/contact#book",
    hideOn: ["/contact"],
  },
  try_planner: {
    id: "try_planner",
    stamp: "2 min",
    headline: "Not sure which package?",
    body: "Get an instant recommendation from the planner.",
    cta: "Try the planner",
    href: "/planner",
    hideOn: ["/planner"],
  },
};

/** Show once the user has scrolled this far (percent of page). */
const SHOW_AT_PCT = 28;
/** Tuck away near the very bottom so it doesn't cover the footer CTA. */
const HIDE_AT_PCT = 94;

const DISMISS_KEY = "ms_cta_dismissed";

type ContextualCTAProps = {
  /**
   * Docs / Storybook only: skip scroll + session dismiss gating and render
   * inline so the chrome is visible inside a preview canvas.
   */
  preview?: boolean;
};

export function ContextualCTA({ preview = false }: ContextualCTAProps) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(preview);
  const [dismissed, setDismissed] = useState(false);
  const [ready, setReady] = useState(preview);
  const [activeCTA, setActiveCTA] = useState<CTAConfig>(SCROLL_CTAS.book_call!);

  useEffect(() => {
    if (preview) return;

    const variant = getExperimentVariant(CTA_EXPERIMENT);
    setActiveCTA(SCROLL_CTAS[variant] ?? SCROLL_CTAS.book_call!);

    try {
      const raw = sessionStorage.getItem(DISMISS_KEY);
      if (raw === "1") setDismissed(true);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, [preview]);

  useEffect(() => {
    if (preview || !ready || dismissed) return;

    const onScroll = () => {
      const denom =
        document.documentElement.scrollHeight - window.innerHeight;
      if (denom <= 0) {
        setVisible(false);
        return;
      }
      const pct = (window.scrollY / denom) * 100;
      setVisible(pct >= SHOW_AT_PCT && pct < HIDE_AT_PCT);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed, ready, pathname, preview]);

  const onHiddenPath =
    !preview &&
    activeCTA.hideOn.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`),
    );

  if (!ready || dismissed || !visible || onHiddenPath) return null;

  const dismiss = () => {
    if (preview) {
      setDismissed(true);
      return;
    }
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      className={cn(
        preview
          ? "relative w-full"
          : "fixed inset-x-0 bottom-0 z-40",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        "animate-in fade-in slide-in-from-bottom-3 duration-300",
      )}
      role="complementary"
      aria-label="Suggested action"
    >
      <div className="mx-auto max-w-lg px-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] sm:max-w-xl sm:px-4">
        <div className="flex items-stretch border border-border-subtle bg-background shadow-[0_16px_48px_-24px_color-mix(in_oklch,var(--foreground)_45%,transparent)]">
          <div aria-hidden className="w-1 shrink-0 bg-brand" />

          <div className="flex min-w-0 flex-1 flex-col gap-3 p-3.5 sm:flex-row sm:items-center sm:gap-4 sm:p-4">
            <div className="min-w-0 flex-1">
              <p className="ms-stamp mb-1.5">{activeCTA.stamp}</p>
              <p className="text-sm font-medium tracking-tight text-foreground">
                {activeCTA.headline}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {activeCTA.body}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={activeCTA.href}
                onClick={() =>
                  trackEvent("cta_click", {
                    variant: activeCTA.id,
                    placement: "scroll",
                  })
                }
                className="ms-cta h-9 flex-1 justify-center px-3.5 text-sm sm:flex-none"
              >
                {activeCTA.cta}
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
              <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss suggestion"
                className="inline-flex size-9 shrink-0 items-center justify-center border border-border-subtle text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-[0.97]"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
