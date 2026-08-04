import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoThumbnailLivePreview } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Thumbnail Live Preview',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Thumbnail Live Preview'
      description='CSS preview of a video thumbnail.'
      preview={<DemoThumbnailLivePreview />}
      code={'import { ThumbnailLivePreview } from "@meridian/ui"\n\n<ThumbnailLivePreview title="…" subtitle="…" styleKey="youtubePop" format="youtube" />'}
      fullBleed={false}
      installation='import { ThumbnailLivePreview } from "@meridian/ui"'
      props={[
    { name: 'format', type: 'ThumbnailFormat', default: '—', description: 'Aspect format.' },
    { name: 'styleKey', type: 'ThumbnailStyleKey', default: '—', description: 'Preset.' },
    { name: 'layout', type: 'ThumbnailLayout', default: "'bold-center'", description: 'Layout mode.' },
  ]}
    />
  )
}
