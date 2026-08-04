import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoThumbnailWorkspace } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Thumbnail Workspace',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Thumbnail Workspace'
      description='Thumbnail generator workspace.'
      preview={<DemoThumbnailWorkspace />}
      code={'import { ThumbnailWorkspace } from "@meridian/ui"\n\n<ThumbnailWorkspace />'}
      fullBleed={true}
      installation='import { ThumbnailWorkspace } from "@meridian/ui"'
    />
  )
}
