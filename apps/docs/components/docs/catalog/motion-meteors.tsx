import { ComponentDoc } from "@/components/component-doc"
import { DemoMeteors } from "@/components/registry-demos"

export function MotionMeteorsDoc() {
  return (
    <ComponentDoc
      registryName="meteors"
      href="/docs/components/motion-meteors"
      title="Meteors"
      description="Thin brand-tinted streaks falling across a hero. CSS-only."
      preview={<DemoMeteors />}
      code={`import { Meteors } from "@/components/ui/meteors"

<div className="relative overflow-hidden rounded-[var(--radius)] bg-card p-10">
  <Meteors count={12} />
  <p className="relative">Night sky, capped at 40 drops</p>
</div>`}
      fullBleed={false}
      usage="Pin to a relative hero panel; keep content above with relative. Cap the count for perf. Reduced motion renders none."
      props={[
        {
          name: "count",
          type: "number",
          default: "20",
          description: "Meteor count. Clamped 0–40.",
        },
      ]}
    />
  )
}
