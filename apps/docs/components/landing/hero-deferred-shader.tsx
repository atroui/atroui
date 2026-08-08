"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

/**
 * Production WebGL palette — deferred so LCP stays on SSR text + CSS bloom.
 * Skipped for reduced-motion, Save-Data, and very slow networks.
 * Mobile loads a lower-density canvas after a longer idle delay.
 */
const ShaderLayer = dynamic(
  () => import("./hero-shader-canvas").then((m) => m.HeroShaderCanvas),
  { ssr: false, loading: () => null }
)

type ShaderPlan =
  | { ok: false }
  | { ok: true; mobile: boolean; delayMs: number }

function planShader(): ShaderPlan {
  if (typeof window === "undefined") return { ok: false }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return { ok: false }
  }
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string }
  }
  if (nav.connection?.saveData) return { ok: false }
  if (
    nav.connection?.effectiveType === "2g" ||
    nav.connection?.effectiveType === "slow-2g"
  ) {
    return { ok: false }
  }
  const mobile = window.matchMedia("(max-width: 768px)").matches
  return {
    ok: true,
    mobile,
    // Give mobile LCP more headroom before WebGL mounts
    delayMs: mobile ? 1400 : 600,
  }
}

export function HeroDeferredShader() {
  const [ready, setReady] = useState(false)
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const plan = planShader()
    if (!plan.ok) return

    let cancelled = false
    setMobile(plan.mobile)

    const enable = () => {
      if (!cancelled) setReady(true)
    }

    const ric = window.requestIdleCallback
    let idleId: number | undefined

    const timeoutId = setTimeout(() => {
      if (typeof ric === "function") {
        idleId = ric(enable, { timeout: plan.mobile ? 2000 : 1200 })
      } else {
        enable()
      }
    }, plan.delayMs)

    return () => {
      cancelled = true
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId)
      }
      clearTimeout(timeoutId)
    }
  }, [])

  if (!ready) return null

  return (
    <div
      className="landing-hero-shader pointer-events-none absolute inset-0"
      aria-hidden
    >
      <ShaderLayer pixelDensity={mobile ? 0.55 : 1} />
    </div>
  )
}
