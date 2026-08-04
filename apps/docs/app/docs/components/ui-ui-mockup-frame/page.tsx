import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoUiMockupFrame } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Ui Mockup Frame',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Ui Mockup Frame'
      description='Device / product mockup frame.'
      preview={<DemoUiMockupFrame />}
      code={'import { UiMockupFrame } from "@meridian/ui"\n\n<UiMockupFrame variant="saas" />'}
      fullBleed={false}
      installation='import { UiMockupFrame } from "@meridian/ui"'
      props={[
    { name: 'variant', type: 'MockupVariant', default: "'saas'", description: 'Mockup style.' },
  ]}
    />
  )
}
