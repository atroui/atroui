"use client"

import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react"

export type ShaderProgress = {
  /** 0–1 */
  value: number
  label: string
}

/** Fallbacks match Mira `--brand` when CSS vars are unavailable. */
const BRAND_FALLBACK = {
  soft: "#c4b5fd",
  mid: "#8b5cf6",
  deep: "#6d28d9",
}

function readBrandShaderColors(el: HTMLElement | null) {
  if (!el || typeof window === "undefined") return BRAND_FALLBACK
  const brand = getComputedStyle(el).getPropertyValue("--brand").trim()
  if (!brand) return BRAND_FALLBACK
  // ShaderGradient expects parseable colors; hex `--brand` is safest.
  if (brand.startsWith("#")) {
    return {
      soft: BRAND_FALLBACK.soft,
      mid: BRAND_FALLBACK.mid,
      deep: brand,
    }
  }
  return BRAND_FALLBACK
}

class ShaderErrorBoundary extends Component<
  { children: ReactNode; onFail: () => void },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    this.props.onFail()
  }

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

/**
 * Digital Success sphere. Warms under the gate; onReady after settled paint frames.
 * Callbacks are ref-stable — progress updates must not restart the paint loop.
 * Deep stop follows `--brand` when it is a hex token.
 */
export function HeroShaderCanvas({
  pixelDensity = 1,
  onReady,
  onProgress,
}: {
  pixelDensity?: number
  onReady?: () => void
  onProgress?: (progress: ShaderProgress) => void
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const readyRef = useRef(false)
  const onReadyRef = useRef(onReady)
  const onProgressRef = useRef(onProgress)
  onReadyRef.current = onReady
  onProgressRef.current = onProgress
  const [colors, setColors] = useState(BRAND_FALLBACK)

  useEffect(() => {
    setColors(readBrandShaderColors(rootRef.current))
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    let cancelled = false
    let raf = 0
    let painted = 0
    let reportedMount = false
    let reportedFrame = false
    let afterFrameTimer: number | undefined

    const finish = () => {
      if (cancelled || readyRef.current) return
      readyRef.current = true
      if (afterFrameTimer !== undefined) window.clearTimeout(afterFrameTimer)
      onProgressRef.current?.({ value: 1, label: "Ready" })
      onReadyRef.current?.()
    }

    const tick = () => {
      if (cancelled) return
      const canvas = root.querySelector("canvas")
      if (canvas && canvas.width > 0 && canvas.height > 0) {
        if (!reportedMount) {
          reportedMount = true
          onProgressRef.current?.({ value: 0.7, label: "Warming GPU" })
        }
        painted += 1
        if (!reportedFrame && painted >= 2) {
          reportedFrame = true
          onProgressRef.current?.({ value: 0.88, label: "First frame" })
          afterFrameTimer = window.setTimeout(finish, 180)
        }
        if (painted >= 3) {
          finish()
          return
        }
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    const failsafe = window.setTimeout(finish, 8000)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      window.clearTimeout(failsafe)
      if (afterFrameTimer !== undefined) window.clearTimeout(afterFrameTimer)
    }
  }, [])

  const failShader = () => {
    if (readyRef.current) return
    readyRef.current = true
    onProgressRef.current?.({ value: 1, label: "Ready" })
    onReadyRef.current?.()
  }

  return (
    <div ref={rootRef} className="absolute inset-0">
      <ShaderErrorBoundary onFail={failShader}>
        <Suspense fallback={null}>
          <ShaderGradientCanvas
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            lazyLoad={false}
            pixelDensity={pixelDensity}
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
              color1={colors.soft}
              color2={colors.mid}
              color3={colors.deep}
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
      </ShaderErrorBoundary>
    </div>
  )
}
