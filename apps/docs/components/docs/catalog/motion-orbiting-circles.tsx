import { ComponentDoc } from "@/components/component-doc"
import { DemoOrbitingCircles } from "@/components/registry-demos"

export function MotionOrbitingCirclesDoc() {
  return (
    <ComponentDoc
      registryName="orbiting-circles"
      href="/docs/components/motion-orbiting-circles"
      title="Orbiting Circles"
      description="Icons orbiting a center node. Stack two for integration art."
      preview={<DemoOrbitingCircles />}
      code={`import { OrbitingCircles } from "@/components/ui/orbiting-circles"

<div className="relative flex h-64 items-center justify-center">
  <span className="text-sm font-medium">Core</span>
  <OrbitingCircles radius={90} duration={20}>
    <span>A</span>
    <span>B</span>
    <span>C</span>
  </OrbitingCircles>
</div>`}
      fullBleed={false}
      usage="Give the stage a fixed height so the orbit has room. Stagger two rings with different radius and duration. Reduced motion renders a static ring."
      props={[
        {
          name: "radius",
          type: "number",
          default: "90",
          description: "Orbit radius in px.",
        },
        {
          name: "duration",
          type: "number",
          default: "20",
          description: "Loop duration in seconds.",
        },
        {
          name: "reverse",
          type: "boolean",
          default: "false",
          description: "Reverse orbit direction.",
        },
        {
          name: "delay",
          type: "number",
          default: "0",
          description: "Start delay in seconds.",
        },
      ]}
    />
  )
}
