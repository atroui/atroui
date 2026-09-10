import { ComponentDoc } from "@/components/component-doc"
import { DemoStatsBand } from "@/components/registry-demos"

export function StatsBandDoc() {
  return (
    <ComponentDoc
      href="/docs/components/stats-band"
      registryName="stats-band"
      title="Stats Band"
      description="Metrics band with tabular numerals and editable STATS. Install as @atroui/stats-band."
      preview={<DemoStatsBand />}
      code={`import { StatsBand } from "@/components/blocks/stats-band"

export function Example() {
  return <StatsBand />
}`}
      fullBleed={false}
      usage="Social-proof strip below the hero or features. Replace STATS with metrics you can defend."
    />
  )
}
