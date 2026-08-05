"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { LogoMark } from "@/components/logo-mark"
import { HeroShaderBackground } from "@/components/blocks/hero-shader-background"

const navLinks = [
  { label: "Catalog", href: "/docs/components" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
  { label: "Install", href: "/docs/installation" },
] as const

const catalogBands = [
  { title: "Primitives", body: "Button, Card, forms, theme" },
  { title: "Sections", body: "Home bands, chrome, CTAs" },
  { title: "Tools", body: "OG, thumbnail, scope" },
  { title: "Headless", body: "Analytics, JSON-LD, reviews" },
] as const

/**
 * Owns mobile menu state so toggling the drawer does not re-render the
 * WebGL shader sibling (R3F Provider crashes on null event targets).
 */
function HeroMobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  return (
    <>
      <button
        type="button"
        className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white md:hidden"
        aria-expanded={menuOpen}
        aria-controls="hero-mobile-nav"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen(true)}
      >
        <Menu className="size-4" aria-hidden />
      </button>

      <div
        className={`fixed inset-0 z-50 md:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-250 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        />
        <nav
          id="hero-mobile-nav"
          aria-label="Mobile"
          className={`absolute inset-y-0 right-0 flex w-[min(18rem,calc(100vw-2.5rem))] flex-col border-l border-white/10 bg-black/40 p-4 pt-[max(1.25rem,env(safe-area-inset-top))] text-white shadow-[0_0_40px_color-mix(in_oklch,var(--color-brand)_25%,transparent)] backdrop-blur-2xl transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] sm:p-5 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_45%_at_100%_0%,color-mix(in_oklch,var(--color-brand)_22%,transparent),transparent_60%)]"
          />

          <div className="relative z-10 mb-6 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <LogoMark className="h-7 w-7 shrink-0 text-white" />
              <span className="truncate text-base font-medium tracking-tight">
                AtroUI
              </span>
            </div>
            <button
              type="button"
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>

          <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain pb-[max(1rem,env(safe-area-inset-bottom))]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-full px-3 py-2.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-auto pt-5">
              <Link
                href="/docs/components"
                onClick={() => setMenuOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black shadow-[0_0_20px_rgba(11,123,255,0.35)]"
              >
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                Browse catalog
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export function HeroDigitalSuccess() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-black text-white">
      <HeroShaderBackground />

      <header className="relative z-20 px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 md:px-10">
        <div className="flex items-center justify-between gap-3 py-3 md:py-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <LogoMark className="h-7 w-7 shrink-0 text-white sm:h-8 sm:w-8" />
            <span className="truncate text-base font-medium tracking-tight sm:text-lg">
              AtroUI
            </span>
          </div>

          <nav
            className="hidden items-center gap-6 text-sm font-medium text-white md:flex lg:gap-10 xl:gap-12"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-white/80"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href="/docs/components"
              className="hidden items-center gap-2 rounded-full bg-neutral-800 px-5 py-2.5 text-sm font-medium text-white sm:inline-flex md:px-6 md:py-3 lg:px-8 lg:py-4"
            >
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              <span className="hidden lg:inline">Browse catalog</span>
              <span className="lg:hidden">Browse</span>
            </a>

            <HeroMobileMenu />
          </div>
        </div>
      </header>

      <div className="relative z-10 flex grow flex-col justify-center px-4 py-10 sm:px-8 md:px-16 md:py-14 lg:px-24">
        <h1 className="flex max-w-[18ch] flex-col gap-y-1 pb-8 text-[clamp(2.5rem,11vw,4.5rem)] font-medium leading-[1.02] tracking-tight sm:max-w-none sm:pb-10 sm:text-[clamp(3rem,9vw,5.5rem)] xl:flex-row xl:items-baseline xl:gap-x-8 xl:text-[clamp(3.5rem,6.5vw,7rem)]">
          AtroUI
          <span className="block bg-linear-to-r from-white via-sky-300 to-blue-400 bg-clip-text pb-2 text-transparent xl:inline-block xl:pb-4">
            Component catalog
          </span>
        </h1>

        <div className="flex flex-col items-stretch gap-8 sm:items-start lg:flex-row lg:items-center lg:gap-10">
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <a
              href="/docs/components"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 text-base font-medium text-black shadow-[0_0_20px_rgba(11,123,255,0.35)] sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
            >
              Browse catalog
            </a>
            <a
              href="/docs"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-base font-medium backdrop-blur-md sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
            >
              Read the docs
            </a>
          </div>
          <p className="max-w-md text-base font-light leading-relaxed text-neutral-100 sm:text-lg md:text-xl">
            AtroUI is a React component library and dark-first design system for
            Next.js - primitives, sections, tools, and SEO modules. Home:{" "}
            atroui.com.
          </p>
        </div>
      </div>

      <div className="relative z-10 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 sm:px-8 md:p-12">
        <div className="ml-auto grid w-full max-w-3xl grid-cols-2 gap-x-6 gap-y-4 rounded-lg bg-black/25 p-4 backdrop-blur-lg sm:gap-x-10 md:max-w-none md:grid-cols-4 md:p-5">
          {catalogBands.map((band) => (
            <div key={band.title}>
              <p className="mb-1 text-sm text-white">{band.title}</p>
              <p className="text-xs leading-snug text-neutral-300">{band.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
