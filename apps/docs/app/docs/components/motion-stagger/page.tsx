import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoStagger, DemoStaggerSlow } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Stagger",
  "/docs/components/motion-stagger",
  "Stagger children on scroll with StaggerChild."
)

export default function Page() {
  return (
    <ComponentDoc
      registryName="stagger"
      href="/docs/components/motion-stagger"
      title="Stagger"
      description="Staggered children reveal. Preview plays on mount — use Replay to watch again."
      preview={<DemoStagger />}
      code={`import { Stagger, StaggerChild } from "@/components/motion/stagger"

<Stagger>
  <StaggerChild>One</StaggerChild>
  <StaggerChild>Two</StaggerChild>
</Stagger>

{/* Docs preview (skips IntersectionObserver) */}
<Stagger preview>
  <StaggerChild>One</StaggerChild>
</Stagger>`}
      fullBleed={false}
      usage="Wrap a list in Stagger and each item in StaggerChild. stagger / delay are seconds. Pass preview in docs canvases. Reduced motion renders a plain div with no animation."
      examples={[
        {
          title: "Slower cascade",
          tip: "Raise stagger for a deliberate beat between children; delay holds the whole group before the first child moves. StaggerChild y controls how far each row climbs.",
          preview: <DemoStaggerSlow />,
          code: `import { Stagger, StaggerChild } from "@/components/motion/stagger"

<Stagger delay={0.15} stagger={0.18}>
  <StaggerChild y={22}>Hold</StaggerChild>
  <StaggerChild y={22}>Then</StaggerChild>
  <StaggerChild y={22}>Cascade</StaggerChild>
</Stagger>`,
        },
      ]}
      props={[
        {
          name: "stagger",
          type: "number",
          default: "0.08",
          description: "Seconds between each child.",
        },
        {
          name: "delay",
          type: "number",
          default: "0",
          description: "Seconds before the first child animates.",
        },
        {
          name: "once",
          type: "boolean",
          default: "true",
          description: "If true, only animate the first time in view.",
        },
        {
          name: "preview",
          type: "boolean",
          default: "false",
          description: "Animate on mount (docs stages) instead of waiting for scroll.",
        },
        {
          name: "StaggerChild y",
          type: "number",
          default: "14",
          description: "Initial translateY per child in px.",
        },
      ]}
    />
  )
}
