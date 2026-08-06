import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoThumbnailWorkspace } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Thumbnail Workspace",
  "/docs/components/thumbnail-thumbnail-workspace"
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/thumbnail-thumbnail-workspace"
      title="Thumbnail Workspace"
      description="Thumbnail generator workspace UI. Catalog demos do not call paid image APIs."
      preview={<DemoThumbnailWorkspace />}
      code={'import { ThumbnailWorkspace } from "@/components/thumbnail/thumbnail-workspace"\n\n<ThumbnailWorkspace />'}
      fullBleed={true}
      usage={
        <>
          Bring your own{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            POST /api/thumbnail
          </code>{" "}
          and AI keys in the host app. This catalog only mounts the workspace
          chrome. For a live image tool in the same family, try{" "}
          <a
            href="https://www.makershot.tech/og"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand underline underline-offset-2"
          >
            makershot.tech/og
          </a>
          .
        </>
      }
    />
  )
}
