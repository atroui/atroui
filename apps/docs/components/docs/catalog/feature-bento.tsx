import { ComponentDoc } from "@/components/component-doc"
import { DemoFeatureBento } from "@/components/registry-demos"

export function FeatureBentoDoc() {
  return (
    <ComponentDoc
      href="/docs/components/feature-bento"
      registryName="feature-bento"
      title="Feature Bento"
      description="Bento grid of product pillars with soft-rect panels. Install as @atroui/feature-bento."
      preview={<DemoFeatureBento />}
      code={`import { FeatureBento } from "@/components/blocks/feature-bento"

export function Example() {
  return <FeatureBento />
}`}
      fullBleed={false}
      usage="Use as the product overview section. After install, edit CONTENT and FEATURES at the top of the file — keep one job per card."
    />
  )
}
