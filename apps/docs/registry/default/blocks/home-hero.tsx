import Link from "next/link"

import { getBrand } from "@/lib/brand"

/**
 * Edit this object to change copy, links, and CTA text.
 * After `npx shadcn add @atroui/home-hero`, this file lives in YOUR repo.
 */
const CONTENT = {
  stamp: "Component library",
  headline: "Ship dark-first UI without rebuilding chrome.",
  subhead:
    "Production sections and primitives you own. Install from the AtroUI registry, then edit this file.",
  primaryCta: { label: "Browse docs", href: "/docs" },
  secondaryCta: { label: "Install", href: "/docs/installation" },
}

export function HomeHero() {
  const brand = getBrand()

  return (
    <section className="border-b border-border-subtle bg-background text-foreground">
      <div className="mx-auto max-w-7xl border-x border-border-subtle">
        <div className="flex flex-col gap-8 px-6 py-16 sm:px-10 sm:py-24 lg:max-w-3xl">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            {CONTENT.stamp}
          </p>
          <h1 className="text-4xl font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {CONTENT.headline}
          </h1>
          <p className="max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            {CONTENT.subhead}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={CONTENT.primaryCta.href}
              className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              {CONTENT.primaryCta.label}
            </Link>
            <Link
              href={CONTENT.secondaryCta.href}
              className="inline-flex h-10 items-center justify-center rounded-full border border-border-subtle px-5 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              {CONTENT.secondaryCta.label}
            </Link>
          </div>
          <p className="font-mono text-[11px] text-muted-foreground">
            {brand.domain}
          </p>
        </div>
      </div>
    </section>
  )
}
