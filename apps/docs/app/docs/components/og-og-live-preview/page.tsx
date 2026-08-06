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
      href="/docs/components/og-og-live-preview"
      title="Og Live Preview"
      description="CSS preview of an OG social card."
      preview={<DemoOgLivePreview />}
      code={'import { OgLivePreview } from "@/components/og/og-live-preview"\n\n<OgLivePreview title="…" subtitle="…" styleKey="paperQuote" />'}
      fullBleed={false}
      props={[
    { name: 'title', type: 'string', default: '-', description: 'Card title.' },
    { name: 'subtitle', type: 'string', default: '-', description: 'Card subtitle.' },
    { name: 'styleKey', type: 'StyleKey', default: '-', description: 'Preset style.' },
  ]}
    />
  )
}
