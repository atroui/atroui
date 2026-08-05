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
      title='Faq Interactive Preview'
      description='Interactive FAQ accordion preview.'
      preview={<DemoFaqInteractivePreview />}
      code={'import { FaqInteractivePreview } from "atroui"\n\n<FaqInteractivePreview />'}
      fullBleed={true}
    />
  )
}
