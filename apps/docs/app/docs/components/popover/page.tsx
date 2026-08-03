import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { PopoverDemo } from "@/components/demos"

export const metadata: Metadata = {
  title: "Popover",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Popover"
      description="Floating panel anchored to a trigger for lightweight interactions."
      preview={<PopoverDemo />}
      code={"import { Popover, PopoverTrigger, PopoverContent, Button } from \"@meridian/ui\"\n\nexport function Example() {\n  return (\n    <Popover>\n      <PopoverTrigger asChild>\n        <Button variant=\"outline\">Open</Button>\n      </PopoverTrigger>\n      <PopoverContent>Content</PopoverContent>\n    </Popover>\n  )\n}"}
      usage="Use popovers for non-modal content. Prefer Dialog when the user must complete a focused task."
      props={[
    { name: "open", type: "boolean", default: "—", description: "Controlled open state." },
    { name: "onOpenChange", type: "(open) => void", default: "—", description: "Called when open state changes." },
    { name: "align", type: "'start' | 'center' | 'end'", default: "'center'", description: "Horizontal alignment relative to the trigger." },
      ]}
    />
  )
}
