import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoOgExamples } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Og Examples',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Og Examples'
      description='Gallery of OG style examples.'
      preview={<DemoOgExamples />}
      code={'import { OgExamples } from "@meridian/ui"\n\n<OgExamples />'}
      fullBleed={true}
      installation='import { OgExamples } from "@meridian/ui"'
      props={[
    { name: 'className', type: 'string', default: '—', description: 'Extra classes.' },
  ]}
    />
  )
}
