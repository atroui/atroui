import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoBeforeAfterSlider } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Before After Slider',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Before After Slider'
      description='Interactive before/after comparison.'
      preview={<DemoBeforeAfterSlider />}
      code={'import { BeforeAfterSlider } from "atroui"\n\n<BeforeAfterSlider variant="saas" />'}
      fullBleed={false}
      installation='import { BeforeAfterSlider } from "atroui"'
      props={[
    { name: 'variant', type: 'MockupVariant', default: "'saas'", description: 'Mockup style.' },
    { name: 'beforeLabel', type: 'string', default: "'Before'", description: 'Left label.' },
    { name: 'afterLabel', type: 'string', default: "'After'", description: 'Right label.' },
  ]}
    />
  )
}
