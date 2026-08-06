import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoOgLivePreview } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Og Live Preview",
  "/docs/components/og-og-live-preview",
  "CSS preview of an OG social card."
)

export default function Page() {
  return (
    <ComponentDoc
      registryName="og-live-preview"
      href="/docs/components/og-og-live-preview"
      title="Og Live Preview"
      description="CSS preview of an OG social card."
      preview={<DemoOgLivePreview />}
      code={'import { OgLivePreview } from "@/components/blocks/og-live-preview"\n\n<div className="relative aspect-[1200/630]">\n  <OgLivePreview title="…" subtitle="…" styleKey="paperQuote" />\n</div>'}
      fullBleed={false}
      props={[
    { name: 'title', type: 'string', default: '-', description: 'Card title.' },
    { name: 'subtitle', type: 'string', default: '-', description: 'Card subtitle.' },
    { name: 'styleKey', type: 'StyleKey', default: '-', description: 'Preset style.' },
  ]}
    />
  )
}
