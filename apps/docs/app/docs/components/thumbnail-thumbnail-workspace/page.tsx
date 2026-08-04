import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoThumbnailWorkspace } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: "Thumbnail Workspace",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Thumbnail Workspace"
      description="Thumbnail generator workspace. Generation posts to host /api/thumbnail."
      preview={<DemoThumbnailWorkspace />}
      code={'import { ThumbnailWorkspace } from "@meridian/ui"\n\n<ThumbnailWorkspace />'}
      fullBleed={true}
      installation='import { ThumbnailWorkspace } from "@meridian/ui"'
      usage="Requires host /api/thumbnail (and image generation env). Preview chrome works; generate actions need the API."
    />
  )
}
