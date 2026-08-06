import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoBeforeAfterSlider } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Before After Slider",
  "/docs/components/case-studies-before-after-slider"
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/case-studies-before-after-slider"
      title="Before After Slider"
      description="Interactive before/after comparison."
      preview={<DemoBeforeAfterSlider />}
      code={'import { BeforeAfterSlider } from "atroui"\n\n<BeforeAfterSlider variant="saas" />'}
      fullBleed={false}
      props={[
    { name: 'variant', type: 'MockupVariant', default: "'saas'", description: 'Mockup style.' },
    { name: 'beforeLabel', type: 'string', default: "'Before'", description: 'Left label.' },
    { name: 'afterLabel', type: 'string', default: "'After'", description: 'Right label.' },
  ]}
    />
  )
}
