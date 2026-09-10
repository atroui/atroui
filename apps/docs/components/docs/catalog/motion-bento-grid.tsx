import { ComponentDoc } from "@/components/component-doc"
import { DemoBentoGrid } from "@/components/registry-demos"

export function MotionBentoGridDoc() {
  return (
    <ComponentDoc
      registryName="bento-grid"
      href="/docs/components/motion-bento-grid"
      title="Bento Grid"
      description="Soft-rect feature grid with a hover brand hairline."
      preview={<DemoBentoGrid />}
      code={`import { BentoGrid, BentoCard } from "@/components/ui/bento-grid"

<BentoGrid>
  <BentoCard title="Scope" description="One focused surface at a time." />
  <BentoCard title="Build" description="Own the source after install." />
  <BentoCard title="Ship" description="Calm settles, no bounce." />
</BentoGrid>`}
      fullBleed={false}
      usage="Three-up on desktop, stacked on mobile. Keep headers quiet — the top hairline is the delight. No motion to reduce; hover only."
      props={[
        {
          name: "title",
          type: "ReactNode",
          default: "—",
          description: "BentoCard heading.",
        },
        {
          name: "description",
          type: "ReactNode",
          default: "—",
          description: "BentoCard supporting copy.",
        },
        {
          name: "header",
          type: "ReactNode",
          default: "—",
          description: "BentoCard media slot above the copy.",
        },
        {
          name: "children",
          type: "ReactNode",
          default: "—",
          description: "BentoCard extra content; BentoGrid takes cards.",
        },
      ]}
    />
  )
}
