import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { AccordionDemo } from "@/components/demos"

export const metadata: Metadata = {
  title: "Accordion",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Accordion"
      description="Vertically stacked expandable sections."
      preview={<AccordionDemo />}
      code={"import {\n  Accordion, AccordionItem, AccordionTrigger, AccordionContent\n} from \"@meridian/ui\"\n\nexport function Example() {\n  return (\n    <Accordion type=\"single\" collapsible>\n      <AccordionItem value=\"item-1\">\n        <AccordionTrigger>Section</AccordionTrigger>\n        <AccordionContent>Details</AccordionContent>\n      </AccordionItem>\n    </Accordion>\n  )\n}"}
      usage="Use type='single' for FAQ-style content. Use type='multiple' when several sections can be open at once."
      props={[
    { name: "type", type: "'single' | 'multiple'", default: "—", description: "Whether one or many items can be open." },
    { name: "collapsible", type: "boolean", default: "false", description: "Allow closing the open item (single mode)." },
    { name: "value", type: "string | string[]", default: "—", description: "Controlled open item(s)." },
      ]}
    />
  )
}
