import { ComponentDoc } from "@/components/component-doc"
import { DemoJournalContent } from "@/components/registry-demos"


export function JournalJournalContentDoc() {
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
