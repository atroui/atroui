import Link from "next/link"
import { Github, Star } from "lucide-react"
import { LogoMark } from "@/components/logo-mark"
import { HeroSketchMark } from "@/components/hero-sketch-mark"
import { HeroDeferredShader } from "@/components/landing/hero-deferred-shader"
import { HeroMobileNav } from "@/components/landing/hero-mobile-nav"
import {
  HeroChalkConnector,
  HeroNotebook,
} from "@/components/landing/hero-notebook"

const GITHUB_REPO = "https://github.com/atroui/atroui"

const navLinks = [
  { label: "Catalog", href: "/docs/components" },
  { label: "Registry", href: "/docs/registry" },
  { label: "Host APIs", href: "/docs/host-api" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
] as const

const marginNotes = [
  { title: "Registry", href: "/docs/registry" },
  { title: "Host APIs", href: "/docs/host-api" },
  { title: "Blocks", href: "/docs/components/home-who" },
  { title: "Indie", href: "/docs/components/personal-hero" },
] as const

/**
 * Landing hero — chalkboard + notebook artifact (A) + light chalk mural (B).
 * Critical text + CSS atmosphere are server-rendered (instant LCP).
 */
export function LandingSketchHero() {
  return (
    <section className="landing-sketch-hero relative flex min-h-svh flex-col overflow-hidden bg-black text-white">
      <div className="landing-hero-atmosphere" aria-hidden>
        <div className="landing-hero-orb landing-hero-orb--cyan" />
        <div className="landing-hero-orb landing-hero-orb--brand" />
        <div className="landing-hero-orb landing-hero-orb--ink" />
        <div className="landing-hero-grain bg-grain" />
        <svg
          className="landing-hero-scribbles"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="landing-hero-scribble landing-hero-scribble--a"
            d="M80 120 C220 40, 340 200, 480 90 S760 40, 920 160"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="6 10 3 8"
          />
          <path
            className="landing-hero-scribble landing-hero-scribble--b"
            d="M1080 640 C920 720, 780 560, 620 680 S280 760, 140 620"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeDasharray="4 12 2 9"
          />
          <circle
            className="landing-hero-scribble landing-hero-scribble--dot"
            cx="1040"
            cy="180"
            r="18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="3 5"
          />
        </svg>
      </div>

      <HeroDeferredShader />

      <HeroMobileNav />

      <header className="relative z-10 hidden items-center justify-between px-8 py-5 md:flex lg:px-12">
        <Link href="/" className="flex items-center gap-2.5 text-white">
          <LogoMark className="h-8 w-8 text-white" />
          <span className="ds-sketch text-2xl tracking-tight">AtroUI</span>
        </Link>

        <nav
          className="flex items-center gap-10 text-sm font-medium tracking-wide text-white/75 lg:gap-12"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="ds-hero-nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Star AtroUI on GitHub"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
          >
            <Github className="size-3.5" aria-hidden />
            Star
            <Star className="size-3.5 opacity-80" aria-hidden />
          </a>
          <Link
            href="/docs/registry"
            className="group inline-flex h-11 items-center gap-2.5 rounded-full bg-white px-5 text-sm font-medium text-black shadow-[0_0_18px_rgba(11,123,255,0.35)] transition hover:bg-white/90"
          >
            <span
              className="size-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(146,219,224,0.9)] transition group-hover:scale-110"
              aria-hidden
            />
            Own the UI
          </Link>
        </div>
      </header>

      <div className="relative z-10 flex grow flex-col justify-center px-5 pb-10 pt-8 sm:px-10 sm:pb-14 md:px-16 lg:px-24">
        {/* Stage: stamp → couplet → notebook, linked by chalk path */}
        <div className="landing-hero-stage relative pt-6 sm:pt-8 lg:pt-10">
          <HeroChalkConnector />

          <p className="ms-stamp relative z-[1] mb-6 w-fit border-white/15 bg-white/5 text-white/90 sm:mb-8">
            studio catalog
          </p>

          <div className="relative z-[1] flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-14 xl:gap-20">
            <div className="flex min-w-0 max-w-xl flex-1 flex-col">
              <HeroSketchMark className="landing-hero-mark" />

              <div
                className="landing-hero-rule my-7 w-16 sm:my-8 sm:w-20"
                aria-hidden
              />

              <p className="landing-hero-lede max-w-md text-[1.05rem] leading-[1.55] text-neutral-300 sm:text-lg sm:leading-normal">
                Dark-first Next.js sections you copy into your repo, plus Host
                APIs for forms and AI.{" "}
                <span className="text-neutral-100">
                  Your keys stay in your env.
                </span>
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7 sm:gap-3.5">
                <Link
                  href="/docs/registry"
                  className="landing-hero-cta inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-[15px] font-medium text-black shadow-[0_0_20px_rgba(11,123,255,0.4)] transition hover:bg-white/90 sm:px-7 sm:py-3.5 sm:text-base"
                >
                  <span className="size-1.5 rounded-full bg-sky-400" aria-hidden />
                  Own the UI
                </Link>
                <Link
                  href="/docs/host-api"
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-[15px] font-medium text-white backdrop-blur-md transition hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base"
                >
                  Host APIs
                </Link>
              </div>
            </div>

            <HeroNotebook className="lg:mt-2 lg:max-w-sm lg:shrink-0 xl:max-w-md" />
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 px-5 py-5 sm:px-10 md:px-16 lg:px-24">
        <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-2 sm:gap-x-10">
          <li className="font-mono text-[10px] tracking-[0.14em] text-neutral-500 uppercase">
            Open
          </li>
          {marginNotes.map((note) => (
            <li key={note.href}>
              <Link
                href={note.href}
                className="ds-sketch text-lg text-neutral-300 transition-colors hover:text-sky-300 sm:text-xl"
              >
                {note.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
