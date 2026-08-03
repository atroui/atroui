import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { CheckboxDemo } from "@/components/demos"

export const metadata: Metadata = {
  title: "Checkbox",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Checkbox"
      description="Binary selection control with keyboard support."
      preview={<CheckboxDemo />}
      code={"import { Checkbox, Label } from \"@meridian/ui\"\n\nexport function Example() {\n  return (\n    <div className=\"flex items-center gap-2\">\n      <Checkbox id=\"newsletter\" />\n      <Label htmlFor=\"newsletter\">Subscribe</Label>\n    </div>\n  )\n}"}
      usage="Use checkboxes for independent options. Prefer RadioGroup for mutually exclusive choices."
      props={[
    { name: "checked", type: "boolean | 'indeterminate'", default: "—", description: "Controlled checked state." },
    { name: "defaultChecked", type: "boolean", default: "—", description: "Uncontrolled initial state." },
    { name: "disabled", type: "boolean", default: "false", description: "Disables the checkbox." },
    { name: "onCheckedChange", type: "(checked) => void", default: "—", description: "Called when the checked state changes." },
      ]}
    />
  )
}
