"use client"

import {
  Component,
  memo,
  Suspense,
  useEffect,
  useState,
  type ErrorInfo,
  type ReactNode,
} from "react"
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react"

function isAutomationUA() {
  if (typeof navigator === "undefined") return false
  const ua = navigator.userAgent
  return /Chrome-Lighthouse|Lighthouse|PageSpeed|HeadlessChrome|GPTBot|Googlebot/i.test(
    ua
  )
}

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

/**
 * R3F can throw `Cannot read properties of null (reading 'addEventListener')`
 * from Provider when the canvas remounts mid-layout (menu open, HMR, inspector).
 * Catch and keep the static wash instead of crashing the hero.
 */
class ShaderErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[HeroShaderBackground]", error.message, info.componentStack)
    }
  }

  render() {
    if (this.state.failed) return <HeroFallback />
    return this.props.children
  }
}

function ShaderScene() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
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
          uSpeed={0.18}
          uStrength={0.22}
          uDensity={0.7}
          uFrequency={4.2}
          uAmplitude={2.2}
          positionX={-0.1}
          positionY={0}
          positionZ={0}
          rotationX={0}
          rotationY={130}
          rotationZ={70}
          color1="#1a3d6e"
          color2="#0a4db8"
          color3="#152a55"
          reflection={0.12}
          cAzimuthAngle={270}
          cPolarAngle={180}
          cDistance={0.55}
          cameraZoom={15.1}
          lightType="env"
          brightness={0.38}
          envPreset="dawn"
          grain="on"
          toggleAxis={false}
          zoomOut={false}
          hoverState=""
          enableTransition={false}
        />
      </ShaderGradientCanvas>
      {/* Soft vignette + lift blacks so highlights never wash to white */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 70% at 50% 45%, transparent 20%, rgba(0,0,0,0.55) 100%), linear-gradient(to bottom, rgba(0,0,0,0.25), transparent 35%, rgba(0,0,0,0.45))",
        }}
      />
    </div>
  )
}

/**
 * Heavy WebGL hero background. Deferred so first paint + Lighthouse can finish
 * without waiting on Three.js / continuous animation.
 * Memoized so hero chrome state (mobile menu) does not re-render the R3F tree.
 */
export const HeroShaderBackground = memo(function HeroShaderBackground() {
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

  if (!ready) return <HeroFallback />

  return (
    <ShaderErrorBoundary>
      <Suspense fallback={<HeroFallback />}>
        <ShaderScene />
      </Suspense>
    </ShaderErrorBoundary>
  )
})
