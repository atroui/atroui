import { ComponentDoc } from "@/components/component-doc"
import { DemoOgExamples } from "@/components/registry-demos"


export function OgOgExamplesDoc() {
  return (
    <ComponentDoc
      registryName="og-examples"
      href="/docs/components/og-og-examples"
      title="Og Examples"
      description="Gallery of OG style examples with sample 1200×630 thumbnails and remix links."
      preview={<DemoOgExamples />}
      code={'import { OgExamples } from "@/components/blocks/og-examples"\n\n<OgExamples />'}
      fullBleed={true}
      props={[
    { name: 'className', type: 'string', default: '-', description: 'Extra classes.' },
  ]}
    />
  )
}
