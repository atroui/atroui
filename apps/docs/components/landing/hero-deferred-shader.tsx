"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

/**
 * WebGL sphere — loads under the gate, reports stage progress, onReady when painted.
 * Skipped for reduced-motion / Save-Data / slow-2g.
 */

const ShaderLayer = dynamic(
  () => import("./hero-shader-canvas").then((m) => m.HeroShaderCanvas),
  { ssr: false, loading: () => null }
)

export type ShaderProgress = {
  /** 0–1 */
  value: number
  label: string
}

type ShaderPlan =
  | { ok: false }
  | { ok: true; mobile: boolean }

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
  return {
    ok: true,
    mobile: window.matchMedia("(max-width: 768px)").matches,
  }
}

export function HeroDeferredShader({
  onReady,
  onSkip,
  onProgress,
  active,
}: {
  onReady: () => void
  onSkip: () => void
  onProgress?: (progress: ShaderProgress) => void
  active: boolean
}) {
  const [mobile, setMobile] = useState(false)
  const [mount, setMount] = useState(false)
  const onReadyRef = useRef(onReady)
  const onSkipRef = useRef(onSkip)
  const onProgressRef = useRef(onProgress)
  onReadyRef.current = onReady
  onSkipRef.current = onSkip
  onProgressRef.current = onProgress

  useEffect(() => {
    if (!active) return

    const plan = planShader()
    if (!plan.ok) {
      onProgressRef.current?.({ value: 1, label: "Ready" })
      onSkipRef.current()
      return
    }

    setMobile(plan.mobile)
    onProgressRef.current?.({ value: 0.12, label: "Fetching sphere" })

    let cancelled = false

    void import("./hero-shader-canvas").then(() => {
      if (cancelled) return
      onProgressRef.current?.({ value: 0.45, label: "Compiling" })
      setMount(true)
    })

    return () => {
      cancelled = true
    }
  }, [active])

  if (!mount) return null

  return (
    <div
      className="landing-hero-shader pointer-events-none absolute inset-0"
      aria-hidden
    >
      <ShaderLayer
        pixelDensity={mobile ? 0.55 : 1}
        onProgress={(p) => onProgressRef.current?.(p)}
        onReady={() => onReadyRef.current()}
      />
    </div>
  )
}
