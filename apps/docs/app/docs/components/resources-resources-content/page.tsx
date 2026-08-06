import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoResourcesContent } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Resources Content",
  "/docs/components/resources-resources-content",
  "Resources library content."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/resources-resources-content"
      title="Resources Content"
      description="Resources library content."
      preview={<DemoResourcesContent />}
      code={'import { ResourcesContent } from "@/components/resources/resources-content"\n\n<ResourcesContent />'}
      fullBleed={true}
    />
  )
}
