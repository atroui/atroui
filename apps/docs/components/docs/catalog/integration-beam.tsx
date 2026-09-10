import { ComponentDoc } from "@/components/component-doc"
import { DemoIntegrationBeam } from "@/components/registry-demos"

export function IntegrationBeamDoc() {
  return (
    <ComponentDoc
      href="/docs/components/integration-beam"
      registryName="integration-beam"
      title="Integration Beam"
      description="Integration map with orbiting nodes and SVG beams. Install as @atroui/integration-beam."
      preview={<DemoIntegrationBeam />}
      code={`import { IntegrationBeam } from "@/components/blocks/integration-beam"

export function Example() {
  return <IntegrationBeam />
}`}
      fullBleed={false}
      usage="Integrations section for marketing pages. Swap NODES for your real integrations — static layout under reduced motion."
    />
  )
}
