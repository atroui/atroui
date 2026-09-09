import { ComponentDoc } from "@/components/component-doc"
import { DemoMagnetic } from "@/components/registry-demos"

export function MotionMagneticDoc() {
  return (
    <ComponentDoc
      registryName="magnetic"
      href="/docs/components/motion-magnetic"
      title="Magnetic"
      description="Mild pointer pull for media cards — intensity ≤0.35, range ≤80px."
      preview={<DemoMagnetic />}
      code={`import { Magnetic } from "atroui"
import { IMAGEORY } from "@/lib/imageory"

<Magnetic intensity={0.28} range={64}>
  <img src={IMAGEORY.landscape} alt="" />
</Magnetic>`}
      fullBleed={false}
      usage="Wrap media tiles only. Real-time pull on move; tween settle on leave. Reduced motion is static. Never default on Button or Menu."
      props={[
        {
          name: "intensity",
          type: "number",
          default: "0.25",
          description: "Pull strength. Clamped ≤0.35.",
        },
        {
          name: "range",
          type: "number",
          default: "48",
          description: "Active radius in px. Clamped ≤80.",
        },
      ]}
    />
  )
}
