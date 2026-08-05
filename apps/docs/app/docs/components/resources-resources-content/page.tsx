import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoResourcesContent } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Resources Content",
  "/docs/components/resources-resources-content"
)

export default function Page() {
  return (
    <ComponentDoc
      title='Resources Content'
      description='Resources library content.'
      preview={<DemoResourcesContent />}
      code={'import { ResourcesContent } from "atroui"\n\n<ResourcesContent />'}
      fullBleed={true}
      installation='import { ResourcesContent } from "atroui"'
    />
  )
}
