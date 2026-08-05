"use client"

import Link from "next/link"
import { HeroDigitalSuccess } from "@/components/blocks/hero-digital-success"

const inside = [
  {
    title: "Primitives",
    body: "Button, Card, forms, theme - the small reusable pieces.",
    href: "/docs/components/ui-button",
  },
  {
    title: "Sections",
    body: "Home bands, site chrome, CTAs - page modules from production.",
    href: "/docs/components/home-who",
  },
  {
    title: "Tools",
    body: "OG workspace, thumbnail, scope - often need host APIs.",
    href: "/docs/components/og-og-examples",
  },
  {
    title: "Headless",
    body: "Analytics, JSON-LD, reviews - no visible UI.",
    href: "/docs/components/seo-json-ld",
  },
] as const

export function LandingHero() {
  return (
    <div className="bg-black text-white">
      <HeroDigitalSuccess />

      <section className="relative border-t border-white/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 80% 0%, rgba(11,123,255,0.18), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-8 py-16 md:px-16 lg:px-24 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <p className="ms-stamp">Inside</p>
              <h2 className="ds-display mt-5 text-3xl sm:text-4xl lg:text-5xl">
                What you&rsquo;ll{" "}
                <span className="ds-gradient-text">find</span>
              </h2>
              <p className="mt-4 max-w-sm text-base font-light leading-relaxed text-neutral-300">
                A React / Next.js component library and dark-first design
                system - primitives, sections, tools, and headless SEO modules.
              </p>
            </div>

            <ul className="md-glass divide-y divide-white/10 lg:col-span-7">
              {inside.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="group flex flex-col gap-1 px-5 py-5 transition-colors hover:bg-white/5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="text-lg font-medium tracking-tight group-hover:text-sky-300">
                      {item.title}
                    </span>
                    <span className="max-w-sm text-sm font-light text-neutral-400 sm:text-right">
                      {item.body}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-8 py-16 sm:flex-row sm:items-end sm:justify-between md:px-16 lg:px-24 lg:py-20">
          <div className="max-w-lg">
            <p className="ms-stamp">atroui.com</p>
            <h2 className="ds-display mt-5 text-3xl sm:text-4xl">
              The home of{" "}
              <span className="ds-gradient-text">AtroUI</span>
            </h2>
            <p className="mt-4 text-sm font-light leading-relaxed text-neutral-400">
              AtroUI is the React component catalog at{" "}
              <span className="text-neutral-200">atroui.com</span> - install via{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[12px] text-neutral-200">
                npm i atroui
              </code>
              . Dark-first tokens, production sections, and docs for Next.js
              apps. Related work lives on{" "}
              <a
                href="https://www.iamk.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-300/90 underline underline-offset-2 hover:text-sky-200"
              >
                iamk.xyz
              </a>{" "}
              and{" "}
              <a
                href="https://www.makershot.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-300/90 underline underline-offset-2 hover:text-sky-200"
              >
                makershot.tech
              </a>
              .
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/docs" className="ms-cta-ghost text-sm">
              Read the docs
            </Link>
            <Link href="/docs/installation" className="ms-cta text-sm">
              Install AtroUI
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-8 py-6 sm:flex-row sm:items-center sm:justify-between md:px-16 lg:px-24">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} AtroUI · atroui.com - React component
            library
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-neutral-500">
            <a
              href="https://www.npmjs.com/package/atroui"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-neutral-300"
            >
              npm
            </a>
            <a
              href="https://github.com/atroui/atroui"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-neutral-300"
            >
              GitHub
            </a>
            <a
              href="https://www.iamk.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-neutral-300"
            >
              iamk.xyz
            </a>
            <a
              href="https://www.makershot.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-neutral-300"
            >
              makershot.tech
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
