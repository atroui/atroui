import { ComponentDoc } from "@/components/component-doc"
import { DemoAccordion } from "@/components/registry-demos"

export function UiAccordionDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-accordion"
      registryName="accordion"
      title="Accordion"
      description="Disclosure with height:auto, chevron rotate, and optional focus morph."
      preview={<DemoAccordion />}
      code={`import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion"

<Accordion defaultValue={["install"]}>
  <AccordionItem value="install">
    <AccordionHeader>
      <AccordionTrigger>Install</AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel>
      npx shadcn add @atroui/accordion
    </AccordionPanel>
  </AccordionItem>
</Accordion>`}
      fullBleed={false}
      usage="Use for FAQ or settings sections. Panel height settles with revealTween; open trigger can morph focus wash."
    />
  )
}
