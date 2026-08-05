import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoOgExamples } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Og Examples",
  "/docs/components/og-og-examples"
)

export default function Page() {
  return (
    <ComponentDoc
      title='Og Examples'
      description='Gallery of OG style examples with sample 1200×630 thumbnails and remix links.'
      preview={<DemoOgExamples />}
      code={'import { OgExamples } from "atroui"\n\n<OgExamples />\n\n{/* Docs */}\n<OgExamples preview />'}
      fullBleed={true}
      props={[
    { name: 'className', type: 'string', default: '-', description: 'Extra classes.' },
  ]}
    />
  )
}
