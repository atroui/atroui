import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoJournalContent } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Journal Content",
  "/docs/components/journal-journal-content"
)

export default function Page() {
  return (
    <ComponentDoc
      title='Journal Content'
      description='Journal listing / content.'
      preview={<DemoJournalContent />}
      code={'import { JournalContent } from "atroui"\n\n<JournalContent />'}
      fullBleed={true}
    />
  )
}
