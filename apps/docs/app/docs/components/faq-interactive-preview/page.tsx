import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoFaqInteractivePreview } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Faq Interactive Preview",
  "/docs/components/faq-interactive-preview"
)

export default function Page() {
  return (
    <ComponentDoc
      registryName="faq"
      title='Faq Interactive Preview'
      description='Interactive FAQ accordion. Install @atroui/faq for editable CONTENT / ITEMS in your repo.'
      preview={<DemoFaqInteractivePreview />}
      code={'import { Faq } from "@/components/blocks/faq"\n\n<Faq />'}
      fullBleed={true}
    />
  )
}
