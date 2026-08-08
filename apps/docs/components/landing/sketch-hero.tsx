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

const catalogBands = [
  {
    title: "Registry",
    body: "Own the UI in your repo",
    href: "/docs/registry",
  },
  {
    title: "Host APIs",
    body: "UI + hardened routes. You bring the keys.",
    href: "/docs/host-api",
  },
  {
    title: "Blocks",
    body: "Home bands, chrome, CTAs",
    href: "/docs/components/home-who",
  },
  {
    title: "Headless",
    body: "Analytics, JSON-LD, reviews",
    href: "/docs/components/seo-json-ld",
  },
] as const

/**
 * Landing hero — chalkboard mural + notebook artifact.
 * SSR chalk sphere holds the frame; WebGL fades in as underpainting upgrade.
 */
export function LandingSketchHero() {
  return (
    <section className="landing-sketch-hero relative flex min-h-svh flex-col overflow-hidden bg-black text-white">
      {/*
        Chalkboard mural — intentional when WebGL is delayed/off.
        Not soft orbs (those read as AI-default). The sphere is drawn.
      */}
      <div className="landing-hero-atmosphere" aria-hidden>
        <div className="landing-hero-board" />
        <div className="landing-hero-dust" />
        <svg
          className="landing-hero-chalk"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hatched chalk sphere — silhouette of the product WebGL orb */}
          <g className="landing-hero-chalk-sphere">
            <ellipse
              cx="720"
              cy="430"
              rx="268"
              ry="252"
              stroke="#0b7bff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="3 7 1 5"
              opacity="0.55"
            />
            <ellipse
              cx="718"
              cy="428"
              rx="248"
              ry="232"
              stroke="#92dbe0"
              strokeWidth="1.4"
              strokeDasharray="2 9 4 6"
              opacity="0.4"
            />
            <path
              d="M470 430 C490 280, 620 210, 720 205 S950 280, 970 430 S850 650, 720 655 S490 580, 470 430"
              stroke="#3865cf"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="5 8 2 6"
              opacity="0.5"
            />
            {/* Contour meridians — imperfect, chalky */}
            <path
              d="M720 205 C640 300, 620 380, 720 430 S800 560, 720 655"
              stroke="#92dbe0"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.35"
            />
            <path
              d="M720 205 C800 300, 820 380, 720 430 S640 560, 720 655"
              stroke="#0b7bff"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.32"
            />
            <path
              d="M490 360 C580 330, 680 320, 780 340 S920 390, 950 430"
              stroke="#92dbe0"
              strokeWidth="1.1"
              strokeLinecap="round"
              opacity="0.28"
            />
            <path
              d="M500 520 C600 560, 700 570, 800 550 S920 490, 960 450"
              stroke="#3865cf"
              strokeWidth="1.1"
              strokeLinecap="round"
              opacity="0.28"
            />
            {/* Cross-hatch fill (chalk pressure) */}
            <path
              d="M560 300 L640 380 M590 280 L680 370 M630 265 L720 360 M680 255 L760 350 M720 250 L800 345 M760 255 L840 360 M800 270 L870 380 M540 360 L620 450 M570 390 L660 490 M610 420 L700 520 M660 450 L750 545 M710 470 L800 555 M760 490 L850 560"
              stroke="#0b7bff"
              strokeWidth="0.9"
              strokeLinecap="round"
              opacity="0.18"
            />
          </g>

          {/* Margin chalk marks — board edge language, not floating decor */}
          <path
            className="landing-hero-chalk-stroke"
            d="M48 90 C120 60, 160 140, 220 100"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="4 8 2 6"
          />
          <path
            className="landing-hero-chalk-stroke landing-hero-chalk-stroke--late"
            d="M980 120 L1040 95 M1060 140 L1110 118 M1020 170 L1085 155"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            className="landing-hero-chalk-stroke"
            d="M70 680 C140 720, 200 640, 280 700"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeDasharray="3 9"
          />
          <text
            className="landing-hero-chalk-label"
            x="86"
            y="740"
            fill="currentColor"
          >
            own the files
          </text>
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

      <div className="relative z-10 px-5 pb-6 pt-2 sm:px-10 sm:pb-8 md:px-16 lg:px-24">
        <ul className="landing-hero-bands grid grid-cols-2 gap-x-6 gap-y-5 sm:gap-x-8 md:grid-cols-4 md:gap-x-10">
          {catalogBands.map((band) => (
            <li key={band.href}>
              <Link
                href={band.href}
                className="group block transition-colors"
              >
                <p className="ds-sketch text-lg text-white transition-colors group-hover:text-sky-200 sm:text-xl">
                  {band.title}
                </p>
                <p className="mt-1 text-[12px] leading-snug text-white/55 sm:text-[13px]">
                  {band.body}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
