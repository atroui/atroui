import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Thumbnail Workspace",
  "/docs/components/thumbnail-thumbnail-workspace",
  "Thumbnail generator workspace UI. Catalog demos do not call paid image APIs."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="thumbnail-workspace"
      href="/docs/components/thumbnail-thumbnail-workspace"
      title="Thumbnail Workspace"
      description="Thumbnail generator workspace UI. Catalog demos do not call paid image APIs."
      fullBleed
      code={`import { ThumbnailWorkspace } from "@/components/blocks/thumbnail-workspace"\n\n<ThumbnailWorkspace />`}
    />
  )
}
