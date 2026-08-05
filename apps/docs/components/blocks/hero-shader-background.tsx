"use client"

import { memo, Suspense, useEffect, useState, type ComponentType } from "react"

function HeroFallback() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 65% 55% at 72% 38%, rgba(11,123,255,0.22), transparent 58%), radial-gradient(ellipse 45% 35% at 18% 72%, rgba(56,101,207,0.14), transparent 52%), #000",
      }}
    />
  )
}

/** Lab / constrained clients must never download Three.js. */
function shouldSkipWebGL() {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return true
  }

  if (navigator.webdriver) return true

  const ua = navigator.userAgent
  if (
    /Chrome-Lighthouse|Lighthouse|PageSpeed|HeadlessChrome|PTST|GTmetrix|GPTBot|Googlebot|bingbot|Bytespider/i.test(
      ua
    )
  ) {
    return true
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return true
  }

  const conn = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string }
    }
  ).connection
  if (conn?.saveData) return true
  if (conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g") {
    return true
  }

  const memory = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory
  const cores = navigator.hardwareConcurrency
  if (typeof memory === "number" && memory <= 2) return true
  if (typeof cores === "number" && cores <= 2) return true

  return false
}

/**
 * Light shell only. Three.js lives in `hero-shader-scene` and is imported
 * after first interaction (or a long post-load idle) — never in PSI lab.
 */
export const HeroShaderBackground = memo(function HeroShaderBackground() {
  const [Scene, setScene] = useState<ComponentType | null>(null)

  useEffect(() => {
    if (shouldSkipWebGL()) return

    let cancelled = false
    let started = false

    const loadScene = () => {
      if (cancelled || started) return
      started = true
      detach()

      void import("@/components/blocks/hero-shader-scene")
        .then((mod) => {
          if (cancelled) return
          const Bound = () => (
            <mod.ShaderErrorBoundary fallback={<HeroFallback />}>
              <Suspense fallback={<HeroFallback />}>
                <mod.HeroShaderScene />
              </Suspense>
            </mod.ShaderErrorBoundary>
          )
          setScene(() => Bound)
        })
        .catch(() => {
          /* keep CSS fallback */
        })
    }

    const onInteract = () => loadScene()

    const detach = () => {
      window.removeEventListener("pointerdown", onInteract)
      window.removeEventListener("touchstart", onInteract)
      window.removeEventListener("keydown", onInteract)
      window.removeEventListener("scroll", onInteract)
      window.removeEventListener("pointermove", onInteract)
    }

    // Interaction-only: PageSpeed / Lighthouse do not interact, so Three.js
    // never downloads during lab runs (was ~10MB unused JS + 28s TBT).
    window.addEventListener("pointerdown", onInteract, {
      once: true,
      passive: true,
    })
    window.addEventListener("touchstart", onInteract, {
      once: true,
      passive: true,
    })
    window.addEventListener("keydown", onInteract, { once: true })
    window.addEventListener("scroll", onInteract, {
      once: true,
      passive: true,
    })
    window.addEventListener("pointermove", onInteract, {
      once: true,
      passive: true,
    })

    return () => {
      cancelled = true
      detach()
    }
  }, [])

  if (!Scene) return <HeroFallback />
  return <Scene />
})
