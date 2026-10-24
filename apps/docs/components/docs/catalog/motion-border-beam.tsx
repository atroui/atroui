import { ComponentDoc } from "@/components/component-doc"
import { DemoBorderBeam } from "@/components/registry-demos"

export function MotionBorderBeamDoc() {
  return (
    <ComponentDoc
      registryName="border-beam"
      href="/docs/components/motion-border-beam"
      title="Border Beam"
      description="Light that travels the container edge. Brand-tinted conic wash."
      preview={<DemoBorderBeam />}
      code={`import { BorderBeam } from "@/components/ui/border-beam"

<div className="relative overflow-hidden rounded-[var(--radius)] border border-border-subtle bg-card p-6">
  <p>Settles in</p>
  <BorderBeam size={80} duration={6} />
</div>`}
      fullBleed={false}
      usage="Mount inside a relative, overflow-hidden panel. One beam per surface. Reduced motion falls back to a static hairline."
      props={[
        {
          name: "size",
          type: "number",
          default: "80",
          description: "Beam length in px.",
        },
        {
          name: "duration",
          type: "number",
          default: "6",
          description: "Loop duration in seconds.",
        },
        {
          name: "delay",
          type: "number",
          default: "0",
          description: "Start delay in seconds.",
        },
        {
          name: "reverse",
          type: "boolean",
          default: "false",
          description: "Reverse travel direction.",
        },
      ]}
    />
  )
}
