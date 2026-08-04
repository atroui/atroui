"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import { LandingNav } from "@/components/landing-nav"

const showcase = [
  {
    src: "/examples/blog-post-cover.png",
    alt: "Editorial blog OG example",
  },
  {
    src: "/examples/product-launch.png",
    alt: "Product launch OG example",
  },
  {
    src: "/examples/indie-revenue-update.png",
    alt: "Indie revenue OG example",
  },
  {
    src: "/examples/open-source-banner.png",
    alt: "Open source OG example",
  },
] as const

const ease = [0.23, 1, 0.32, 1] as const

export function LandingHero() {
  return (
    <div className="min-h-[100svh] bg-background text-foreground">
      <LandingNav />

      {/* Hero — one composition: brand, line, CTA, dominant visual */}
      <section className="relative overflow-hidden border-b border-border-subtle">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% -10%, color-mix(in oklch, var(--color-brand) 18%, transparent), transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl border-x border-border-subtle">
          <div className="ms-shell-pad flex flex-col items-start py-16 sm:py-20 lg:py-24">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="ms-stamp ms-stamp-brush"
            >
              Personal catalog
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease }}
              className="ds-display mt-6 max-w-[12ch] text-5xl text-foreground sm:text-6xl lg:text-7xl"
            >
              Meridian
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12, ease }}
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base"
            >
              Components I ship across my projects — starting with Makershot /
              ogsaas. Not a generic UI kit.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link href="/docs/components" className="ms-cta">
                Browse catalog
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/docs" className="ms-cta-ghost text-sm">
                Read the docs
              </Link>
            </motion.div>
          </div>

          {/* Dominant visual — real OG assets from the catalog */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22, ease }}
            className="border-t border-border-subtle"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {showcase.map((item, i) => (
                <div
                  key={item.src}
                  className={
                    i % 2 === 0
                      ? "border-border-subtle border-b lg:border-b-0 lg:border-r"
                      : "border-border-subtle border-b lg:border-b-0 lg:border-r lg:last:border-r-0"
                  }
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={1200}
                    height={630}
                    className="aspect-[1200/630] h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* One job: what lives in the catalog */}
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <div className="ms-shell-pad grid gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <p className="ms-stamp">Inside</p>
              <h2 className="ds-headline mt-4 text-2xl text-foreground sm:text-3xl">
                What you&rsquo;ll find
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Production UI extracted from real apps — primitives, marketing
                sections, and host-bound tools.
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
                  body: "OG workspace, planner, scope — need host APIs to run live.",
                  href: "/docs/components/og-og-examples",
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

      {/* Closing band — personal + studio */}
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
                Sourced from Makershot. Links in the demos point back to the
                studio — that&rsquo;s intentional.
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
