"use client"

import { Suspense } from "react"
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react"

/** Low-impact ambient sphere — only loaded after idle via HeroDeferredShader. */
export function HeroShaderCanvas() {
  return (
    <Suspense fallback={null}>
      <ShaderGradientCanvas
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        lazyLoad
        pixelDensity={0.7}
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
          uDensity={0.65}
          uFrequency={5.5}
          uAmplitude={2.4}
          positionX={-0.1}
          positionY={0}
          positionZ={0}
          rotationX={0}
          rotationY={130}
          rotationZ={70}
          color1="#92dbe0"
          color2="#0b7bff"
          color3="#3865cf"
          reflection={0.25}
          cAzimuthAngle={270}
          cPolarAngle={180}
          cDistance={0.5}
          cameraZoom={15.1}
          lightType="env"
          brightness={0.65}
          envPreset="city"
          grain="off"
          toggleAxis={false}
          zoomOut={false}
          hoverState=""
          enableTransition={false}
        />
      </ShaderGradientCanvas>
    </Suspense>
  )
}
