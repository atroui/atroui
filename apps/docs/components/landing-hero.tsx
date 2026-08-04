"use client"

import Link from "next/link"
import { HeroDigitalSuccess } from "@/components/blocks/hero-digital-success"

export function LandingHero() {
  return (
    <div className="bg-background text-foreground">
      <HeroDigitalSuccess />

      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <div className="ms-shell-pad grid gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <p className="ms-stamp">Inside</p>
              <h2 className="ds-headline mt-4 text-2xl text-foreground sm:text-3xl">
                What you&rsquo;ll find
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Production UI extracted from real apps — primitives, sections,
                tools, and headless modules.
              </p>
            </div>

            <ul className="divide-y divide-border-subtle border border-border-subtle lg:col-span-7">
              {[
                {
                  title: "Primitives",
                  body: "Button, Card, forms, theme — the small reusable pieces.",
                  href: "/docs/components/ui-button",
                },
                {
                  title: "Sections",
                  body: "Home bands, site chrome, CTAs — editorial page modules.",
                  href: "/docs/components/home-who",
                },
                {
                  title: "Tools",
                  body: "OG workspace, thumbnail, scope — often need host APIs.",
                  href: "/docs/components/og-og-examples",
                },
                {
                  title: "Headless",
                  body: "Analytics, JSON-LD, reviews — no visible UI.",
                  href: "/docs/components/seo-json-ld",
                },
              ].map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="group flex flex-col gap-1 px-5 py-5 transition-colors hover:bg-muted/40 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="ds-headline text-lg text-foreground group-hover:text-brand">
                      {item.title}
                    </span>
                    <span className="max-w-sm text-sm text-muted-foreground sm:text-right">
                      {item.body}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <div className="ms-shell-pad flex flex-col gap-6 py-14 sm:flex-row sm:items-end sm:justify-between sm:py-16">
            <div className="max-w-md">
              <p className="ms-stamp">Studio</p>
              <h2 className="ds-display mt-4 text-3xl text-foreground sm:text-4xl">
                Built by{" "}
                <span className="ds-display-italic text-brand">Koustav</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Sourced from real production work. Links in demos point back to
                the studio — that&rsquo;s intentional.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <a
                href="https://makershot.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="bam-link"
              >
                makershot.tech
              </a>
              <a
                href="https://www.iamk.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="bam-link"
              >
                iamk.xyz
              </a>
              <Link href="/docs/installation" className="bam-link">
                Install Meridian
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <p className="ms-shell-pad py-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Meridian — personal component catalog
          </p>
        </div>
      </footer>
    </div>
  )
}
