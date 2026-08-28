import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Og Live Preview",
  "/docs/components/og-og-live-preview",
  "CSS preview of an OG social card."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="og-live-preview"
      href="/docs/components/og-og-live-preview"
      title="Og Live Preview"
      description="CSS preview of an OG social card."
      props={[
    { name: 'title', type: 'string', default: '-', description: 'Card title.' },
    { name: 'subtitle', type: 'string', default: '-', description: 'Card subtitle.' },
    { name: 'styleKey', type: 'StyleKey', default: '-', description: 'Preset style.' },
  ]}
      code={`import { OgLivePreview } from "@/components/blocks/og-live-preview"\n\n<div className="relative aspect-[1200/630]">\n  <OgLivePreview title="…" subtitle="…" styleKey="paperQuote" />\n</div>`}
    />
  )
}
