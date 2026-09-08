import { ComponentDoc } from "@/components/component-doc"
import { DemoFeatureGrid } from "@/components/registry-demos"


export function FeatureGridDoc() {
  return (
    <ComponentDoc
      href="/docs/components/feature-grid"
      registryName="feature-grid"
      title="Feature Grid"
      description="Product feature grid with editable CONTENT and FEATURES."
      preview={<DemoFeatureGrid />}
      code={'import { FeatureGrid } from "@/components/blocks/feature-grid"\n\n<FeatureGrid />'}
      fullBleed={true}
      usage="Landing section below the hero. Edit FEATURES to match your product pillars. Not used on atroui.com homepage."
    />
  )
}
