"use client"

import { useRef } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"

/**
 * Edit CONTENT / CARDS for your showcase. Apple-style horizontal cards
 * with scroll buttons and snap scrolling. No motion deps.
 * After install this file lives in your repo.
 */
const CONTENT = {
  stamp: "Showcase",
  headlineBefore: "Built with",
  headlineAccent: "this kit",
  headlineAfter: ".",
  lede: "Replace these cards with your customers' launches.",
  prevLabel: "Scroll showcase left",
  nextLabel: "Scroll showcase right",
}

const CARDS = [
  {
    tag: "SaaS",
    title: "Northline billing portal",
    detail: "Self-serve upgrades with usage meters and dunning handled.",
    stat: "+22% expansion",
    href: "/work",
  },
  {
    tag: "AI tool",
    title: "Fieldwork triage copilot",
    detail: "Grounded ticket answers with one-click human handoff.",
    stat: "−40% handle time",
    href: "/work",
  },
  {
    tag: "Commerce",
    title: "Kiln storefront",
    detail: "Editorial PDPs on a 90+ Lighthouse storefront.",
    stat: "3.1× conversion",
    href: "/work",
  },
  {
    tag: "Devtools",
    title: "Orbit status pages",
    detail: "Incident comms your customers actually read.",
    stat: "99.99% uptime",
    href: "/work",
  },
  {
    tag: "Fintech",
    title: "Meridian onboarding",
    detail: "KYC flow that feels like a welcome, not an audit.",
    stat: "+31% activation",
    href: "/work",
  },
]

const STEP = 320

function prefersReducedMotion() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function ShowcaseCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({
      left: dir * STEP,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    })
  }

  return (
    <section className="border-t border-border-subtle bg-background text-foreground">
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle px-6 py-12 sm:px-10 sm:py-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                {CONTENT.stamp}
              </p>
              <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
                {CONTENT.headlineBefore}{" "}
                <span className="italic text-brand">
                  {CONTENT.headlineAccent}
                </span>
                {CONTENT.headlineAfter}
              </h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                {CONTENT.lede}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => scroll(-1)}
                aria-label={CONTENT.prevLabel}
                className="inline-flex size-10 items-center justify-center rounded-[var(--atro-control-radius,var(--radius))] border border-border-subtle text-foreground transition-colors hover:bg-muted active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <ArrowLeft className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                aria-label={CONTENT.nextLabel}
                className="inline-flex size-10 items-center justify-center rounded-[var(--atro-control-radius,var(--radius))] border border-border-subtle text-foreground transition-colors hover:bg-muted active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <ArrowRight className="size-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle py-8 sm:py-10">
          <div
            ref={trackRef}
            role="region"
            aria-label="Customer showcase"
            tabIndex={0}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring sm:px-10"
          >
            {CARDS.map((card, i) => (
              <article
                key={card.title}
                className="group w-72 shrink-0 snap-start overflow-hidden rounded-[var(--atro-panel-radius,var(--radius))] border border-border-subtle bg-card sm:w-80"
              >
                <div
                  aria-hidden
                  className="flex aspect-[4/3] flex-col justify-between bg-gradient-to-br from-muted via-card to-[color-mix(in_oklch,var(--brand)_22%,transparent)] p-5 ring-1 ring-inset ring-border-subtle"
                >
                  <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                    {card.tag} · {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="text-2xl font-medium tracking-tight tabular-nums text-foreground">
                    {card.stat}
                  </p>
                </div>
                <div className="p-5">
                  <h3 className="text-[15px] font-medium tracking-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {card.detail}
                  </p>
                  <Link
                    href={card.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand"
                  >
                    View case study
                    <ArrowUpRight
                      className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
