import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Og Examples",
  "/docs/components/og-og-examples",
  "Gallery of OG style examples with sample 1200×630 thumbnails and remix links."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="og-examples"
      href="/docs/components/og-og-examples"
      title="Og Examples"
      description="Gallery of OG style examples with sample 1200×630 thumbnails and remix links."
      fullBleed
      props={[
    { name: 'className', type: 'string', default: '-', description: 'Extra classes.' },
  ]}
      code={`import { OgExamples } from "@/components/blocks/og-examples"\n\n<OgExamples />`}
    />
  )
}
