"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

/**
 * Deferred WebGL wash — never on the critical path.
 * CSS atmosphere paints first; this mounts after idle on capable desktop only.
 */
const ShaderLayer = dynamic(
  () => import("./hero-shader-canvas").then((m) => m.HeroShaderCanvas),
  { ssr: false, loading: () => null }
)

function shouldLoadShader(): boolean {
  if (typeof window === "undefined") return false
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false
  if (window.matchMedia("(max-width: 768px)").matches) return false
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string }
  }
  if (nav.connection?.saveData) return false
  if (nav.connection?.effectiveType === "2g" || nav.connection?.effectiveType === "slow-2g") {
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

    if (typeof ric === "function") {
      idleId = ric(enable, { timeout: 2200 })
    } else {
      timeoutId = setTimeout(enable, 1200)
    }

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
      className="landing-hero-shader pointer-events-none absolute inset-0 opacity-40"
      aria-hidden
    >
      <ShaderLayer />
    </div>
  )
}
