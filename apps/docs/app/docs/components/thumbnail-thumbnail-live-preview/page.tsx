import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Thumbnail Live Preview",
  "/docs/components/thumbnail-thumbnail-live-preview",
  "CSS preview of a video thumbnail."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="thumbnail-live-preview"
      href="/docs/components/thumbnail-thumbnail-live-preview"
      title="Thumbnail Live Preview"
      description="CSS preview of a video thumbnail."
      props={[
    { name: 'format', type: 'ThumbnailFormat', default: '-', description: 'Aspect format.' },
    { name: 'styleKey', type: 'ThumbnailStyleKey', default: '-', description: 'Preset.' },
    { name: 'layout', type: 'ThumbnailLayout', default: "'bold-center'", description: 'Layout mode.' },
  ]}
      code={`import { ThumbnailLivePreview } from "@/components/blocks/thumbnail-live-preview"\n\n<ThumbnailLivePreview title="…" subtitle="…" format="youtube" />`}
    />
  )
}
