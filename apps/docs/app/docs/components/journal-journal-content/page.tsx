import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoJournalContent } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Journal Content',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Journal Content'
      description='Journal listing / content.'
      preview={<DemoJournalContent />}
      code={'import { JournalContent } from "@meridian/ui"\n\n<JournalContent />'}
      fullBleed={true}
      installation='import { JournalContent } from "@meridian/ui"'
    />
  )
}
