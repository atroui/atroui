import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { SelectDemo } from "@/components/demos"

export const metadata: Metadata = {
  title: "Select",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Select"
      description="Styled select menu built on Radix Select."
      preview={<SelectDemo />}
      code={"import {\n  Select, SelectTrigger, SelectValue,\n  SelectContent, SelectItem\n} from \"@meridian/ui\"\n\nexport function Example() {\n  return (\n    <Select>\n      <SelectTrigger className=\"w-[200px]\">\n        <SelectValue placeholder=\"Pick one\" />\n      </SelectTrigger>\n      <SelectContent>\n        <SelectItem value=\"a\">Option A</SelectItem>\n        <SelectItem value=\"b\">Option B</SelectItem>\n      </SelectContent>\n    </Select>\n  )\n}"}
      usage="Prefer Select over native selects for consistent styling. For very long lists, consider a combobox pattern."
      props={[
    { name: "value", type: "string", default: "—", description: "Controlled value." },
    { name: "defaultValue", type: "string", default: "—", description: "Uncontrolled initial value." },
    { name: "onValueChange", type: "(value) => void", default: "—", description: "Called when selection changes." },
    { name: "disabled", type: "boolean", default: "false", description: "Disables the select." },
      ]}
    />
  )
}
