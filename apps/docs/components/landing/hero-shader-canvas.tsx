"use client"

import { Suspense, useEffect, useRef } from "react"
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react"
import type { ShaderProgress } from "./hero-deferred-shader"

/**
 * Digital Success sphere. Warms under the gate; onReady after settled paint frames.
 * Callbacks are ref-stable — progress updates must not restart the paint loop.
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
          onProgressRef.current?.({ value: 0.78, label: "Warming GPU" })
        }
        painted += 1
        if (!reportedFrame && painted >= 2) {
          reportedFrame = true
          onProgressRef.current?.({ value: 0.92, label: "First frame" })
          // Don't rely only on more rAFs — open shortly after first real frame
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
    // Mount once — never rebind when parent progress re-renders
  }, [])

  return (
    <div ref={rootRef} className="absolute inset-0">
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
    </div>
  )
}
