"use client"

import { Suspense } from "react"
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react"

/**
 * Exact Digital Success / atroui.com WebGL palette.
 * Mounted only after idle via HeroDeferredShader — never on the LCP path.
 * Params match the previous production HeroDigitalSuccess sphere.
 */
export function HeroShaderCanvas() {
  return (
    <Suspense fallback={null}>
      <ShaderGradientCanvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        lazyLoad
        pixelDensity={1}
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
