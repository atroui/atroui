import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Journal Content",
  "/docs/components/journal-journal-content",
  "Journal listing / content."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="journal-content"
      href="/docs/components/journal-journal-content"
      title="Journal Content"
      description="Journal listing / content."
      fullBleed
      code={`import { JournalContent } from "@/components/blocks/journal-content"\n\n<JournalContent />`}
    />
  )
}
