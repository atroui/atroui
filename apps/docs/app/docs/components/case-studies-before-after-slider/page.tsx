import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Before After Slider",
  "/docs/components/case-studies-before-after-slider",
  "Interactive before/after comparison."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="before-after-slider"
      href="/docs/components/case-studies-before-after-slider"
      title="Before After Slider"
      description="Interactive before/after comparison."
      props={[
    { name: 'variant', type: 'MockupVariant', default: "'saas'", description: 'Mockup style.' },
    { name: 'beforeLabel', type: 'string', default: "'Before'", description: 'Left label.' },
    { name: 'afterLabel', type: 'string', default: "'After'", description: 'Right label.' },
  ]}
      code={`import { BeforeAfterSlider } from "@/components/blocks/before-after-slider"\n\n<BeforeAfterSlider variant="saas" />`}
    />
  )
}
