import { ComponentDoc } from "@/components/component-doc"
import { DemoMagicCard } from "@/components/registry-demos"

export function MotionMagicCardDoc() {
  return (
    <ComponentDoc
      registryName="magic-card"
      href="/docs/components/motion-magic-card"
      title="Magic Card"
      description="Cursor spotlight + brand border glow for panels."
      preview={<DemoMagicCard />}
      code={`import { MagicCard } from "@/components/ui/magic-card"

<MagicCard size={280}>
  <div className="p-6">Hover for the wash</div>
</MagicCard>`}
      fullBleed={false}
      usage="Wrap feature panels, not chrome. The wash settles with a soft tween on leave. Reduced motion renders a plain card."
      props={[
        {
          name: "size",
          type: "number",
          default: "280",
          description: "Spotlight diameter in px.",
        },
        {
          name: "glow",
          type: "boolean",
          default: "true",
          description: "Show the brand border glow on hover.",
        },
      ]}
    />
  )
}
