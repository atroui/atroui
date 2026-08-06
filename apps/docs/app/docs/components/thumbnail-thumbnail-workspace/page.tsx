import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoThumbnailWorkspace } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Thumbnail Workspace",
  "/docs/components/thumbnail-thumbnail-workspace",
  "Thumbnail generator workspace UI. Catalog demos do not call paid image APIs."
)

export default function Page() {
  return (
    <ComponentDoc
      registryName="thumbnail-workspace"
      href="/docs/components/thumbnail-thumbnail-workspace"
      title="Thumbnail Workspace"
      description="Thumbnail generator workspace UI. Catalog demos do not call paid image APIs."
      preview={<DemoThumbnailWorkspace />}
      code={'import { ThumbnailWorkspace } from "@/components/blocks/thumbnail-workspace"\n\n<ThumbnailWorkspace />'}
      fullBleed={true}
      usage={
        <>
          Install{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui/api-thumbnail
          </code>
          . Set{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            HUGGINGFACE_API_KEY
          </code>{" "}
          in your env (plus{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            XAI_API_KEY
          </code>{" "}
          for Pro mode). AtroUI never ships keys. Preview-only works without AI.
        </>
      }
    />
  )
}
