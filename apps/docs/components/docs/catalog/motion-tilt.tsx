import { ComponentDoc } from "@/components/component-doc"
import { DemoTilt } from "@/components/registry-demos"

export function MotionTiltDoc() {
  return (
    <ComponentDoc
      registryName="tilt"
      href="/docs/components/motion-tilt"
      title="Tilt"
      description="Mild 3D media tilt toward the pointer — rotationFactor ≤6–8°."
      preview={<DemoTilt />}
      code={`import { Tilt } from "atroui"
import { IMAGEORY } from "@/lib/imageory"

<Tilt rotationFactor={6}>
  <img src={IMAGEORY.sky} alt="" />
</Tilt>`}
      fullBleed={false}
      usage="Opt-in on media / PreviewCard only. Tween settle on leave; reduced motion skips tilt."
      props={[
        {
          name: "rotationFactor",
          type: "number",
          default: "6",
          description: "Max rotate in degrees. Clamped ≤8.",
        },
        {
          name: "perspective",
          type: "number",
          default: "800",
          description: "CSS perspective in px.",
        },
      ]}
    />
  )
}
