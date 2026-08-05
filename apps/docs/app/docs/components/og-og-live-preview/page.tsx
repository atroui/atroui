import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoOgLivePreview } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Og Live Preview",
  "/docs/components/og-og-live-preview"
)

export default function Page() {
  return (
    <ComponentDoc
      title='Og Live Preview'
      description='CSS preview of an OG social card.'
      preview={<DemoOgLivePreview />}
      code={'import { OgLivePreview } from "atroui"\n\n<OgLivePreview title="…" subtitle="…" styleKey="paperQuote" />'}
      fullBleed={false}
      installation='import { OgLivePreview } from "atroui"'
      props={[
    { name: 'title', type: 'string', default: '-', description: 'Card title.' },
    { name: 'subtitle', type: 'string', default: '-', description: 'Card subtitle.' },
    { name: 'styleKey', type: 'StyleKey', default: '-', description: 'Preset style.' },
  ]}
    />
  )
}
