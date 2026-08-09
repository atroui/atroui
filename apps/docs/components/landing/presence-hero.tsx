"use client"

/**
 * Presence hero — industry gate pattern.
 * Full hero + sphere warm under an opaque gate with real stage progress.
 * One overlay fade when ready — temperament intact, no piecemeal assemble.
 */

import { useCallback, useEffect, useRef, useState } from "react"
import { Github, Star } from "lucide-react"
import { useReducedMotion } from "motion/react"
import { LogoMark } from "@/components/logo-mark"
import {
  HeroDeferredShader,
  type ShaderProgress,
} from "@/components/landing/hero-deferred-shader"
import { HeroMobileNav } from "@/components/landing/hero-mobile-nav"
import { LiveInstall } from "@/components/landing/live-install"
import {
  SharedBrand,
  SharedOwnCta,
  TransitionLink,
} from "@/components/view-transitions"
import { cn } from "@/lib/utils"

const GITHUB_REPO = "https://github.com/atroui/atroui"

const navLinks = [
  { label: "Catalog", href: "/docs/components" },
  { label: "Registry", href: "/docs/registry" },
  { label: "Host APIs", href: "/docs/host-api" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
] as const

export function PresenceHero() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(() => Boolean(reduce))
  const [gateGone, setGateGone] = useState(() => Boolean(reduce))
  const [progress, setProgress] = useState<ShaderProgress>({
    value: 0,
    label: "Preparing",
  })
  const displayRef = useRef(0)
  const [displayPct, setDisplayPct] = useState(0)

  const finish = useCallback(() => {
    setProgress({ value: 1, label: "Ready" })
    displayRef.current = 100
    setDisplayPct(100)
    // Yield past GPU hitch, then one gate fade into the finished hero
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.setTimeout(() => setOpen(true), 120)
      })
    })
  }, [])

  const onProgress = useCallback((p: ShaderProgress) => {
    setProgress((prev) =>
      p.value >= prev.value ? p : prev
    )
  }, [])

  // Smooth the bar toward the latest stage (honest ceiling, no fake 100%)
  useEffect(() => {
    if (open || reduce) {
      setDisplayPct(100)
      displayRef.current = 100
      return
    }
    const target = Math.min(progress.value, 0.97) * 100
    let raf = 0
    const tick = () => {
      const cur = displayRef.current
      const next = cur + (target - cur) * 0.12
      displayRef.current = next
      setDisplayPct(next)
      if (Math.abs(target - next) > 0.15) {
        raf = requestAnimationFrame(tick)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [progress.value, open, reduce])

  useEffect(() => {
    if (!open) return
    setDisplayPct(100)
    const t = window.setTimeout(() => setGateGone(true), 900)
    return () => window.clearTimeout(t)
  }, [open])

  const pct = Math.round(displayPct)

  return (
    <section
      className={cn(
        "presence-hero relative flex min-h-svh flex-col overflow-hidden bg-black text-white",
        open && "presence-hero--open"
      )}
      aria-busy={!open}
      aria-label={open ? "AtroUI" : "Loading AtroUI"}
    >
      <div className="presence-hero-void pointer-events-none absolute inset-0" aria-hidden />

      {/* Sphere warms under the gate at full underpainting strength */}
      <HeroDeferredShader
        active
        onReady={finish}
        onSkip={finish}
        onProgress={onProgress}
      />

      {/* Finished hero — always in place; revealed when gate lifts */}
      <div
        className={cn(
          "presence-hero-stage relative z-10 flex min-h-svh flex-col",
          !open && "presence-hero-stage--sealed"
        )}
      >
        <div className="md:hidden">
          <HeroMobileNav />
        </div>
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
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/15 bg-white/4 px-3.5 text-sm font-medium text-white transition hover:border-white/25 hover:bg-white/8"
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
                  className="inline-flex items-center gap-2.5 rounded-lg bg-white px-6 py-3 text-[15px] font-medium text-black shadow-[0_0_20px_rgba(11,123,255,0.28)] transition hover:bg-white/90 sm:px-7 sm:py-3.5 sm:text-base"
                >
                  Own the UI
                </TransitionLink>
              </SharedOwnCta>
              <TransitionLink
                href="/docs/host-api"
                className="inline-flex items-center rounded-lg border border-white/18 px-6 py-3 text-[15px] font-medium text-white/85 transition hover:border-white/30 hover:text-white sm:px-7 sm:py-3.5 sm:text-base"
              >
                Host APIs
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>

      {/* Gate — opaque until sphere is lit; one fade, then unmount */}
      {!gateGone ? (
        <div
          className={cn(
            "presence-gate absolute inset-0 z-50 flex flex-col items-center justify-center px-5",
            open && "presence-gate--out"
          )}
          aria-hidden={open}
          {...(open ? { inert: true } : {})}
        >
          <div className="flex w-full max-w-sm flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-3 text-center">
              <LogoMark className="h-10 w-10 text-white" />
              <p className="ds-sketch text-3xl tracking-tight text-white">AtroUI</p>
            </div>

            <div className="w-full space-y-3" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={progress.label}>
              <div className="presence-gate-track h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="presence-gate-fill h-full rounded-full bg-[color:var(--ds-cyan,#92dbe0)]"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex items-center justify-between gap-3 font-mono text-[10px] tracking-[0.14em] text-white/40 uppercase">
                <span>{progress.label}</span>
                <span>{pct}%</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
