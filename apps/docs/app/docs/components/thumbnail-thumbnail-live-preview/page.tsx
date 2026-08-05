import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoThumbnailLivePreview } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Thumbnail Live Preview",
  "/docs/components/thumbnail-thumbnail-live-preview"
)

export default function Page() {
  return (
    <ComponentDoc
      title='Thumbnail Live Preview'
      description='CSS preview of a video thumbnail.'
      preview={<DemoThumbnailLivePreview />}
      code={'import { ThumbnailLivePreview } from "atroui"\n\n<ThumbnailLivePreview title="…" subtitle="…" styleKey="youtubePop" format="youtube" />'}
      fullBleed={false}
      props={[
    { name: 'format', type: 'ThumbnailFormat', default: '-', description: 'Aspect format.' },
    { name: 'styleKey', type: 'ThumbnailStyleKey', default: '-', description: 'Preset.' },
    { name: 'layout', type: 'ThumbnailLayout', default: "'bold-center'", description: 'Layout mode.' },
  ]}
    />
  )
}
