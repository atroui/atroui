import { ComponentDoc } from "@/components/component-doc"
import { DemoUiMockupFrame } from "@/components/registry-demos"


export function UiUiMockupFrameDoc() {
  return (
    <ComponentDoc
      registryName="mockup-frame"
      href="/docs/components/ui-ui-mockup-frame"
      title="Ui Mockup Frame"
      description="Device / product mockup frame."
      preview={<DemoUiMockupFrame />}
      code={'import { UiMockupFrame } from "@/components/ui/mockup-frame"\n\n<UiMockupFrame variant="saas" />'}
      fullBleed={false}
      props={[
    { name: 'variant', type: 'MockupVariant', default: "'saas'", description: 'Mockup style.' },
  ]}
    />
  )
}
