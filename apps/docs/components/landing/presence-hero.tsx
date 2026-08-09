"use client"

/**
 * Presence hero — industry gate pattern.
 * Full hero + sphere warm under an opaque gate with real stage progress.
 * Progress bar is DOM-driven (no React setState per frame) so 0→100 stays smooth.
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
import { LiveInstall, PresenceCopyBtn } from "@/components/landing/live-install"
import {
  SharedBrand,
  SharedOwnCta,
  TransitionLink,
} from "@/components/view-transitions"
import { cn } from "@/lib/utils"

const GITHUB_REPO = "https://github.com/atroui/atroui"
const ATROUI_CLI_CMD = "npx @atroui/cli@latest add home-hero"

const navLinks = [
  { label: "Catalog", href: "/docs/components" },
  { label: "Registry", href: "/docs/registry" },
  { label: "Host APIs", href: "/docs/host-api" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
] as const

const STAGE_COPY: Record<string, string> = {
  Preparing: "Preparing",
  "Fetching sphere": "Loading",
  Compiling: "Building",
  "Warming GPU": "Warming",
  "First frame": "Almost",
  Ready: "Ready",
}

/** Frame-rate independent ease (ms time-constant). */
function damp(current: number, target: number, lambda: number, dtMs: number) {
  return current + (target - current) * (1 - Math.exp(-dtMs / lambda))
}

export function PresenceHero() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(() => Boolean(reduce))
  const [gateGone, setGateGone] = useState(() => Boolean(reduce))
  const [label, setLabel] = useState("Preparing")
  const [labelKey, setLabelKey] = useState(0)

  const fillRef = useRef<HTMLDivElement>(null)
  const pctRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  const milestoneRef = useRef(0.02)
  const displayRef = useRef(0)
  const openRef = useRef(open)
  const finishingRef = useRef(false)
  const startRef = useRef(0)
  openRef.current = open

  const paintBar = useCallback((pct: number) => {
    const clamped = Math.max(0, Math.min(100, pct))
    if (fillRef.current) {
      fillRef.current.style.transform = `scaleX(${clamped / 100})`
    }
    if (pctRef.current) {
      pctRef.current.textContent = `${Math.round(clamped)}%`
    }
    if (barRef.current) {
      barRef.current.setAttribute("aria-valuenow", String(Math.round(clamped)))
    }
  }, [])

  const finish = useCallback(() => {
    if (finishingRef.current) return
    finishingRef.current = true
    milestoneRef.current = 1
    setLabel("Ready")
    setLabelKey((k) => k + 1)
    window.setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.setTimeout(() => setOpen(true), 200)
        })
      })
    }, 320)
  }, [])

  const onProgress = useCallback(
    (p: ShaderProgress) => {
      if (p.value > milestoneRef.current) {
        milestoneRef.current = Math.min(p.value, 0.94)
      }
      const next = STAGE_COPY[p.label] ?? p.label
      setLabel((prev) => {
        if (prev === next) return prev
        setLabelKey((k) => k + 1)
        return next
      })
      if (p.value >= 1) finish()
    },
    [finish]
  )

  useEffect(() => {
    if (reduce) {
      displayRef.current = 100
      paintBar(100)
      return
    }

    startRef.current = performance.now()
    let raf = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min(40, now - last)
      last = now

      const elapsed = (now - startRef.current) / 1000
      // Time floor = continuous motion even while the main thread is busy
      const timeFloor = Math.min(0.9, elapsed / 2.4)
      let target = Math.max(milestoneRef.current, timeFloor)

      if (finishingRef.current || openRef.current) {
        target = 1
      } else {
        target = Math.min(target, 0.94)
      }

      const lambda = finishingRef.current || openRef.current ? 85 : 150
      const next = damp(displayRef.current, target * 100, lambda, dt)
      displayRef.current = next
      paintBar(next)

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduce, paintBar])

  useEffect(() => {
    if (!open) return
    displayRef.current = 100
    paintBar(100)
    const t = window.setTimeout(() => setGateGone(true), 1100)
    return () => window.clearTimeout(t)
  }, [open, paintBar])

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

      <HeroDeferredShader
        active
        onReady={finish}
        onSkip={finish}
        onProgress={onProgress}
      />

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
          <div className="mx-auto flex w-full max-w-3xl items-start gap-6 sm:gap-8 md:max-w-4xl">
            <div className="flex min-w-0 flex-1 flex-col items-start">
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

            {/* Quiet right rail — fills dead space without reshaping the stack */}
            <aside
              className="presence-hero-rail hidden w-[8.75rem] shrink-0 flex-col self-stretch border-l border-white/10 pl-5 pt-3 sm:flex sm:w-[9.5rem] md:w-[10.5rem] md:pl-6"
              aria-label="Also install with AtroUI CLI"
            >
              <p className="font-mono text-[10px] tracking-[0.16em] text-white/40 uppercase">
                Also
              </p>
              <p className="ds-sketch mt-4 text-[1.35rem] leading-[1.15] tracking-tight text-white">
                No shadcn?
              </p>
              <p className="mt-2.5 text-[12px] leading-relaxed text-white/45">
                Same registry JSON. First-party CLI.
              </p>
              <div className="mt-auto space-y-2 pt-8">
                <p className="font-mono text-[10px] tracking-[0.12em] text-white/35 uppercase">
                  Try
                </p>
                <div className="flex items-start gap-0.5 rounded-lg border border-white/12 bg-white/[0.03] py-1.5 pr-1 pl-2.5 transition hover:border-white/22 hover:bg-white/[0.06]">
                  <TransitionLink
                    href="/docs/installation"
                    className="min-w-0 flex-1 py-1 font-mono text-[10px] leading-snug text-[color:var(--ds-cyan,#92dbe0)] transition hover:text-white"
                  >
                    npx @atroui/cli
                    <span className="mt-0.5 block text-white/40">
                      add home-hero
                    </span>
                  </TransitionLink>
                  <PresenceCopyBtn
                    text={ATROUI_CLI_CMD}
                    label="Copy AtroUI CLI command"
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {!gateGone ? (
        <div
          className={cn(
            "presence-gate absolute inset-0 z-50 flex flex-col items-center justify-center px-5",
            open && "presence-gate--out"
          )}
          aria-hidden={open}
          {...(open ? { inert: true } : {})}
        >
          <div className="presence-gate-inner flex w-full max-w-xs flex-col items-center gap-9 sm:max-w-sm">
            <div className="presence-gate-brand flex flex-col items-center gap-3 text-center">
              <LogoMark className="h-10 w-10 text-white" />
              <p className="ds-sketch text-3xl tracking-tight text-white">AtroUI</p>
            </div>

            <div
              ref={barRef}
              className="w-full space-y-3.5"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={0}
              aria-label={label}
            >
              <div className="presence-gate-track h-px w-full overflow-hidden bg-white/12">
                <div
                  ref={fillRef}
                  className="presence-gate-fill h-full origin-left bg-[color:var(--ds-cyan,#92dbe0)]"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
              <div className="flex items-center justify-between gap-3 font-mono text-[10px] tracking-[0.16em] text-white/45 uppercase">
                <span key={labelKey} className="presence-gate-label">
                  {label}
                </span>
                <span ref={pctRef} className="tabular-nums text-white/35">
                  0%
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
