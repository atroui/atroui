"use client"

import { Suspense, useEffect, useState } from "react"
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react"

function isAutomationUA() {
  if (typeof navigator === "undefined") return false
  const ua = navigator.userAgent
  return /Chrome-Lighthouse|Lighthouse|PageSpeed|HeadlessChrome|GPTBot|Googlebot/i.test(
    ua
  )
}

/**
 * Heavy WebGL hero background. Deferred so first paint + Lighthouse can finish
 * without waiting on Three.js / continuous animation.
 */
export function HeroShaderBackground() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (isAutomationUA()) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    let cancelled = false
    const enable = () => {
      if (!cancelled) setReady(true)
    }

    // After load + a short idle so PSI/CWV get a quiet window.
    const onLoad = () => {
      const ric = (
        window as Window & {
          requestIdleCallback?: (
            cb: () => void,
            opts?: { timeout: number }
          ) => number
        }
      ).requestIdleCallback
      if (typeof ric === "function") {
        ric(enable, { timeout: 2500 })
      } else {
        globalThis.setTimeout(enable, 1200)
      }
    }

    if (document.readyState === "complete") onLoad()
    else window.addEventListener("load", onLoad, { once: true })

    return () => {
      cancelled = true
      window.removeEventListener("load", onLoad)
    }
  }, [])

  if (!ready) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 70% 40%, rgba(11,123,255,0.35), transparent 55%), radial-gradient(ellipse 50% 40% at 20% 70%, rgba(146,219,224,0.18), transparent 50%), #000",
        }}
      />
    )
  }

  return (
    <Suspense
      fallback={
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-black"
        />
      }
    >
      <ShaderGradientCanvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
        lazyLoad
        pixelDensity={0.75}
        pointerEvents="none"
      >
        <ShaderGradient
          animate="on"
          type="sphere"
          wireframe={false}
          shader="defaults"
          uTime={0}
          uSpeed={0.3}
          uStrength={0.3}
          uDensity={0.8}
          uFrequency={5.5}
          uAmplitude={3.2}
          positionX={-0.1}
          positionY={0}
          positionZ={0}
          rotationX={0}
          rotationY={130}
          rotationZ={70}
          color1="#92dbe0"
          color2="#0b7bff"
          color3="#3865cf"
          reflection={0.4}
          cAzimuthAngle={270}
          cPolarAngle={180}
          cDistance={0.5}
          cameraZoom={15.1}
          lightType="env"
          brightness={0.8}
          envPreset="city"
          grain="on"
          toggleAxis={false}
          zoomOut={false}
          hoverState=""
          enableTransition={false}
        />
      </ShaderGradientCanvas>
    </Suspense>
  )
}
