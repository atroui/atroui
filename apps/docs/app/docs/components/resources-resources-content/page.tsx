import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Resources Content",
  "/docs/components/resources-resources-content",
  "Resources library content."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="resources-content"
      href="/docs/components/resources-resources-content"
      title="Resources Content"
      description="Resources library content."
      fullBleed
      code={`import { ResourcesContent } from "@/components/blocks/resources-content"\n\n<ResourcesContent />`}
    />
  )
}
