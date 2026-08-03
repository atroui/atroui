import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { RadioGroupDemo } from "@/components/demos"

export const metadata: Metadata = {
  title: "Radio Group",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Radio Group"
      description="Mutually exclusive options with accessible keyboard navigation."
      preview={<RadioGroupDemo />}
      code={"import { RadioGroup, RadioGroupItem, Label } from \"@meridian/ui\"\n\nexport function Example() {\n  return (\n    <RadioGroup defaultValue=\"a\">\n      <div className=\"flex items-center gap-2\">\n        <RadioGroupItem value=\"a\" id=\"a\" />\n        <Label htmlFor=\"a\">Option A</Label>\n      </div>\n    </RadioGroup>\n  )\n}"}
      usage="Provide a clear default when possible. Keep option labels short and distinct."
      props={[
    { name: "value", type: "string", default: "—", description: "Controlled selected value." },
    { name: "defaultValue", type: "string", default: "—", description: "Uncontrolled initial value." },
    { name: "onValueChange", type: "(value) => void", default: "—", description: "Called when selection changes." },
    { name: "disabled", type: "boolean", default: "false", description: "Disables the entire group." },
      ]}
    />
  )
}
