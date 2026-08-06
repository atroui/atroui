import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoJournalContent } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Journal Content",
  "/docs/components/journal-journal-content",
  "Journal listing / content."
)

export default function Page() {
  return (
    <ComponentDoc
      registryName="journal-content"
      href="/docs/components/journal-journal-content"
      title="Journal Content"
      description="Journal listing / content."
      preview={<DemoJournalContent />}
      code={'import { JournalContent } from "@/components/blocks/journal-content"\n\n<JournalContent />'}
      fullBleed={true}
    />
  )
}
