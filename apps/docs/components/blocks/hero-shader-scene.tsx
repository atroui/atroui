"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react"

/**
 * Isolated WebGL scene. Imported only after the light hero shell decides
 * it is safe to load Three.js (never during PageSpeed / Lighthouse lab).
 */
export function HeroShaderScene() {
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

export class ShaderErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[HeroShaderScene]", error.message, info.componentStack)
    }
  }

  render() {
    if (this.state.failed) return this.props.fallback
    return this.props.children
  }
}
