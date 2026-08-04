import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoFaqInteractivePreview } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Faq Interactive Preview',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Faq Interactive Preview'
      description='Interactive FAQ accordion preview.'
      preview={<DemoFaqInteractivePreview />}
      code={'import { FaqInteractivePreview } from "@meridian/ui"\n\n<FaqInteractivePreview />'}
      fullBleed={true}
      installation='import { FaqInteractivePreview } from "@meridian/ui"'
    />
  )
}
