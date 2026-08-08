import { Github, Star } from "lucide-react"
import { LogoMark } from "@/components/logo-mark"
import { HeroDeferredShader } from "@/components/landing/hero-deferred-shader"
import { HeroMobileNav } from "@/components/landing/hero-mobile-nav"
import { LiveInstall } from "@/components/landing/live-install"
import {
  SharedBrand,
  SharedOwnCta,
  TransitionLink,
} from "@/components/view-transitions"

const GITHUB_REPO = "https://github.com/atroui/atroui"

const navLinks = [
  { label: "Catalog", href: "/docs/components" },
  { label: "Registry", href: "/docs/registry" },
  { label: "Host APIs", href: "/docs/host-api" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
] as const

/**
 * Benji-style hero — one thesis, one living signature (live install),
 * deferred Digital Success sphere as quiet underpainting only.
 * Nav stays quiet (mark · links · Star). One primary Own the UI below install.
 */
export function PresenceHero() {
  return (
    <section className="presence-hero relative flex min-h-svh flex-col overflow-hidden bg-black text-white">
      <div className="presence-hero-void pointer-events-none absolute inset-0" aria-hidden />

      <HeroDeferredShader />

      <HeroMobileNav />

      <header className="relative z-10 hidden items-center justify-between px-8 py-5 md:flex lg:px-12">
        <SharedBrand>
          <TransitionLink href="/" className="flex items-center gap-2.5 text-white">
            <LogoMark className="h-8 w-8 text-white" />
            <span className="ds-sketch text-2xl tracking-tight">AtroUI</span>
          </TransitionLink>
        </SharedBrand>

        <nav
          className="flex items-center gap-8 text-sm font-medium tracking-wide text-white/70 lg:gap-10"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              className="ds-hero-nav-link"
            >
              {link.label}
            </TransitionLink>
          ))}
        </nav>

        <a
          href={GITHUB_REPO}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Star AtroUI on GitHub"
          className="inline-flex h-10 items-center gap-2 border border-white/15 bg-white/[0.04] px-3.5 text-sm font-medium text-white transition hover:border-white/25 hover:bg-white/[0.08]"
        >
          <Github className="size-3.5" aria-hidden />
          Star
          <Star className="size-3.5 opacity-80" aria-hidden />
        </a>
      </header>

      <div className="relative z-10 flex grow flex-col justify-center px-5 pb-14 pt-10 sm:px-10 sm:pb-16 md:px-16 lg:px-24">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-start">
          <h1 className="ds-sketch">
            <span className="presence-hero-brand block text-[clamp(3.5rem,12vw,6rem)] font-medium leading-none tracking-tight text-white">
              AtroUI
            </span>
            <span className="mt-5 block max-w-[16ch] text-[clamp(1.65rem,4.5vw,2.5rem)] font-medium leading-[1.15] tracking-tight text-neutral-100 sm:mt-6">
              Own the UI.
              <br />
              <span className="ds-sketch-accent">Borrow the API.</span>
            </span>
          </h1>

          <p className="mt-5 max-w-[36ch] text-[1.05rem] leading-relaxed text-neutral-400 sm:mt-6 sm:text-lg">
            Files land in your repo. Keys stay in yours.
          </p>

          <LiveInstall className="mt-9 w-full sm:mt-10" />

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4">
            <SharedOwnCta>
              <TransitionLink
                href="/docs/registry"
                className="inline-flex items-center gap-2.5 bg-white px-6 py-3 text-[15px] font-medium text-black shadow-[0_0_20px_rgba(11,123,255,0.28)] transition hover:bg-white/90 sm:px-7 sm:py-3.5 sm:text-base"
              >
                Own the UI
              </TransitionLink>
            </SharedOwnCta>
            <TransitionLink
              href="/docs/host-api"
              className="inline-flex items-center border border-white/18 px-6 py-3 text-[15px] font-medium text-white/85 transition hover:border-white/30 hover:text-white sm:px-7 sm:py-3.5 sm:text-base"
            >
              Host APIs
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  )
}
