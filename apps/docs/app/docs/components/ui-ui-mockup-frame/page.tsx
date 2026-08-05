import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoUiMockupFrame } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Ui Mockup Frame",
  "/docs/components/ui-ui-mockup-frame"
)

export default function Page() {
  return (
    <ComponentDoc
      title='Ui Mockup Frame'
      description='Device / product mockup frame.'
      preview={<DemoUiMockupFrame />}
      code={'import { UiMockupFrame } from "atroui"\n\n<UiMockupFrame variant="saas" />'}
      fullBleed={false}
      installation='import { UiMockupFrame } from "atroui"'
      props={[
    { name: 'variant', type: 'MockupVariant', default: "'saas'", description: 'Mockup style.' },
  ]}
    />
  )
}
