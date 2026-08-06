import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoFaqInteractivePreview } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "FAQ",
  "/docs/components/faq-interactive-preview",
  "Interactive FAQ accordion. Install @atroui/faq for editable CONTENT / ITEMS in your repo."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/faq-interactive-preview"
      registryName="faq"
      title="FAQ"
      description="Interactive FAQ accordion. Install @atroui/faq for editable CONTENT / ITEMS in your repo."
      preview={<DemoFaqInteractivePreview />}
      code={'import { Faq } from "@/components/blocks/faq"\n\n<Faq />'}
      fullBleed={true}
    />
  )
}
