import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Feature Grid",
  "/docs/components/feature-grid",
  "Product feature grid with editable CONTENT and FEATURES."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="feature-grid"
      href="/docs/components/feature-grid"
      title="Feature Grid"
      description="Product feature grid with editable CONTENT and FEATURES."
      fullBleed
      usage="Landing section below the hero. Edit FEATURES to match your product pillars. Not used on atroui.com homepage."
      code={`import { FeatureGrid } from "@/components/blocks/feature-grid"\n\n<FeatureGrid />`}
    />
  )
}
