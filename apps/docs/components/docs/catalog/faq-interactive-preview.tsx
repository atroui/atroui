import { ComponentDoc } from "@/components/component-doc"
import { DemoFaqInteractivePreview } from "@/components/registry-demos"


export function FaqInteractivePreviewDoc() {
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
