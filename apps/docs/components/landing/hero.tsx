"use client"

/**
 * Landing hero — adapted from ui-layouts "AI Infrastructure" hero.
 * Full-viewport ShaderGradient backdrop + sequential blur-in reveal
 * (atroui TimelineAnimation), centered pill → headline → subhead → CTAs →
 * "works with" strip. Branded for AtroUI; skips WebGL under reduced motion.
 */

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import type { Variants } from "motion/react"
import { ArrowRight } from "lucide-react"
import { TimelineAnimation } from "atroui"
import { TransitionLink } from "@/components/view-transitions"
import { catalogNavItems } from "@/lib/navigation"

const HeroShader = dynamic(
  () =>
    import("@/components/landing/hero-shader-canvas").then(
      (m) => m.HeroShaderCanvas
    ),
  { ssr: false, loading: () => null }
)

const worksWith = ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "TypeScript"]

/** Snappier take on the template's blur-in stagger. */
const reveal: Variants = {
  visible: (i: number) => ({
    filter: "blur(0px)",
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
  hidden: { filter: "blur(12px)", y: 12, opacity: 0 },
}

export function AtroHero() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const count = catalogNavItems.length
  const [showShader, setShowShader] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string }
    }
    if (nav.connection?.saveData) return
    if (["2g", "slow-2g"].includes(nav.connection?.effectiveType ?? "")) return
    setShowShader(true)
  }, [])

  return (
    <section
      ref={timelineRef}
      className="relative flex min-h-[calc(100svh-3.5rem)] w-full flex-col overflow-hidden bg-black text-white"
    >
      {showShader ? (
        <div className="landing-hero-shader pointer-events-none absolute inset-0" aria-hidden>
          <HeroShader pixelDensity={1} />
        </div>
      ) : null}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_42%,transparent,rgba(0,0,0,0.6))]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl grow flex-col items-center justify-center px-4 pb-16 pt-20 text-center">
        <TimelineAnimation
          timelineRef={timelineRef}
          animationNum={1}
          customVariants={reveal}
          className="flex items-center gap-2 rounded-2xl border border-brand/40 bg-brand/15 p-1 pr-3 text-sm backdrop-blur-lg"
        >
          <span className="rounded-lg bg-brand px-2 py-0.5 text-xs font-medium text-black">
            New
          </span>
          <span className="text-neutral-100">
            {count} components on the shadcn registry
          </span>
        </TimelineAnimation>

        <TimelineAnimation
          as="h1"
          timelineRef={timelineRef}
          animationNum={2}
          customVariants={reveal}
          className="ds-headline my-6 text-5xl font-medium leading-[1.05] tracking-tight text-white md:text-7xl"
        >
          Own the UI.
          <br />
          Borrow the <span className="ds-sketch text-brand-hover">API.</span>
        </TimelineAnimation>

        <TimelineAnimation
          as="p"
          timelineRef={timelineRef}
          animationNum={3}
          customVariants={reveal}
          className="ds-lede max-w-xl text-neutral-300"
        >
          {count}+ production React &amp; Next.js sections on the official shadcn
          registry. The source lands in your repo; your keys stay in your env.
          No lock-in.
        </TimelineAnimation>

        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
          <TimelineAnimation
            as="div"
            timelineRef={timelineRef}
            animationNum={4}
            customVariants={reveal}
          >
            <TransitionLink
              href="/docs/components"
              transitionTypes={[]}
              className="ms-cta h-12 px-6"
            >
              Browse components
              <ArrowRight className="size-4" aria-hidden />
            </TransitionLink>
          </TimelineAnimation>
          <TimelineAnimation
            as="div"
            timelineRef={timelineRef}
            animationNum={5}
            customVariants={reveal}
          >
            <TransitionLink
              href="/docs"
              transitionTypes={[]}
              className="inline-flex h-12 items-center rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              Read the docs
            </TransitionLink>
          </TimelineAnimation>
        </div>
      </div>

      <div className="relative z-10 pb-14">
        <TimelineAnimation
          as="p"
          timelineRef={timelineRef}
          animationNum={6}
          customVariants={reveal}
          className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-400"
        >
          Works with your stack
        </TimelineAnimation>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4">
          {worksWith.map((name, i) => (
            <TimelineAnimation
              key={name}
              as="span"
              timelineRef={timelineRef}
              animationNum={7 + i}
              customVariants={reveal}
              className="text-lg font-medium text-neutral-300"
            >
              {name}
            </TimelineAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
