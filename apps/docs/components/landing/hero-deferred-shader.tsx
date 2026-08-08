"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

/**
 * Production WebGL palette — deferred so LCP stays on SSR text + CSS bloom.
 * Desktop / capable networks only; skipped for reduced-motion, mobile, Save-Data.
 */
const ShaderLayer = dynamic(
  () => import("./hero-shader-canvas").then((m) => m.HeroShaderCanvas),
  { ssr: false, loading: () => null }
)

function shouldLoadShader(): boolean {
  if (typeof window === "undefined") return false
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false
  // Keep mobile on CSS bloom only — WebGL was the insights killer on phones
  if (window.matchMedia("(max-width: 768px)").matches) return false
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string }
  }
  if (nav.connection?.saveData) return false
  if (
    nav.connection?.effectiveType === "2g" ||
    nav.connection?.effectiveType === "slow-2g"
  ) {
    return false
  }
  return true
}

export function HeroDeferredShader() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!shouldLoadShader()) return

    let cancelled = false
    const enable = () => {
      if (!cancelled) setReady(true)
    }

    const ric = window.requestIdleCallback
    let idleId: number | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    // Past first paint / LCP, then idle — then bring the real sphere
    timeoutId = setTimeout(() => {
      if (typeof ric === "function") {
        idleId = ric(enable, { timeout: 1200 })
      } else {
        enable()
      }
    }, 600)

    return () => {
      cancelled = true
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId)
    }
  }, [])

  if (!ready) return null

  return (
    <div
      className="landing-hero-shader pointer-events-none absolute inset-0"
      aria-hidden
    >
      <ShaderLayer />
    </div>
  )
}
