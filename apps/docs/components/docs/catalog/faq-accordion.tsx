import { ComponentDoc } from "@/components/component-doc"
import { DemoFaqAccordion } from "@/components/registry-demos"

export function FaqAccordionDoc() {
  return (
    <ComponentDoc
      href="/docs/components/faq-accordion"
      registryName="faq-accordion"
      title="FAQ Accordion"
      description="Accessible FAQ accordion with editable CONTENT / ITEMS. Install as @atroui/faq-accordion."
      preview={<DemoFaqAccordion />}
      code={`import { FaqAccordion } from "@/components/blocks/faq-accordion"

export function Example() {
  return <FaqAccordion />
}`}
      fullBleed={false}
      usage="Drop below pricing or beside contact. Edit CONTENT / ITEMS at the top of the file — first item opens by default."
    />
  )
}
