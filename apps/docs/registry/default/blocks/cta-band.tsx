import Link from "next/link"
import { ArrowRight } from "lucide-react"

/**
 * Edit CONTENT to match your offer. Headline + primary/ghost CTAs over a
 * soft brand wash. No motion deps.
 * After install this file lives in your repo.
 */
const CONTENT = {
  stamp: "Limited slots · 2 per quarter",
  headlineBefore: "Have something to ship",
  headlineAccent: "this month",
  headlineAfter: "?",
  lede: "Tell us the outcome you want. We'll reply within 48 hours with a fixed scope and a fixed price.",
  primaryCta: { label: "Start a project", href: "/contact" },
  secondaryCta: { label: "See pricing", href: "/pricing" },
  footnote: "No retainers. No hourly theater. You own everything we build.",
}

export function CtaBand() {
  return (
    <section className="border-t border-border-subtle bg-background text-foreground">
      <div className="border-b border-border-subtle">
        <div className="relative mx-auto max-w-7xl overflow-hidden border-x border-border-subtle">
          {/* Quiet brand wash — radial, no blur-orb soup */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 55% at 50% 0%, color-mix(in oklch, var(--brand) 10%, transparent), transparent 70%)",
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, color-mix(in oklch, var(--brand) 55%, transparent), transparent)",
              }}
            />
          </div>

          <div className="relative flex flex-col items-center px-6 py-14 text-center sm:px-10 sm:py-20">
            <p className="atro-chip">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden />
              {CONTENT.stamp}
            </p>
            <h2 className="mt-5 max-w-2xl text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
              {CONTENT.headlineBefore}{" "}
              <span className="italic text-brand">{CONTENT.headlineAccent}</span>
              {CONTENT.headlineAfter}
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              {CONTENT.lede}
            </p>
            <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Link
                href={CONTENT.primaryCta.href}
                className="atro-btn justify-center"
              >
                {CONTENT.primaryCta.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href={CONTENT.secondaryCta.href}
                className="atro-btn-ghost justify-center"
              >
                {CONTENT.secondaryCta.label}
              </Link>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              {CONTENT.footnote}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
