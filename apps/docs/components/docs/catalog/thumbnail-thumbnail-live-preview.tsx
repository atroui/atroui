import { ComponentDoc } from "@/components/component-doc"
import { DemoThumbnailLivePreview } from "@/components/registry-demos"


export function ThumbnailThumbnailLivePreviewDoc() {
  return (
    <ComponentDoc
      registryName="thumbnail-live-preview"
      href="/docs/components/thumbnail-thumbnail-live-preview"
      title="Thumbnail Live Preview"
      description="CSS preview of a video thumbnail."
      preview={<DemoThumbnailLivePreview />}
      code={'import { ThumbnailLivePreview } from "@/components/blocks/thumbnail-live-preview"\n\n<ThumbnailLivePreview title="…" subtitle="…" format="youtube" />'}
      fullBleed={false}
      props={[
    { name: 'format', type: 'ThumbnailFormat', default: '-', description: 'Aspect format.' },
    { name: 'styleKey', type: 'ThumbnailStyleKey', default: '-', description: 'Preset.' },
    { name: 'layout', type: 'ThumbnailLayout', default: "'bold-center'", description: 'Layout mode.' },
  ]}
    />
  )
}
