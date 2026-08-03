import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { LabelDemo } from "@/components/demos"

export const metadata: Metadata = {
  title: "Label",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Label"
      description="Accessible form label built on Radix Label."
      preview={<LabelDemo />}
      code={"import { Label, Checkbox } from \"@meridian/ui\"\n\nexport function Example() {\n  return (\n    <div className=\"flex items-center gap-2\">\n      <Checkbox id=\"terms\" />\n      <Label htmlFor=\"terms\">Accept terms</Label>\n    </div>\n  )\n}"}
      usage="Connect labels to controls with htmlFor matching the control id."
      props={[
    { name: "htmlFor", type: "string", default: "—", description: "Associates the label with a control id." },
      ]}
    />
  )
}
