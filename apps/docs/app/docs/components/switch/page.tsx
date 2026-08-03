import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { SwitchDemo } from "@/components/demos"

export const metadata: Metadata = {
  title: "Switch",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Switch"
      description="Toggle for binary settings with an immediate effect."
      preview={<SwitchDemo />}
      code={"import { Switch, Label } from \"@meridian/ui\"\n\nexport function Example() {\n  return (\n    <div className=\"flex items-center gap-2\">\n      <Switch id=\"airplane\" />\n      <Label htmlFor=\"airplane\">Airplane mode</Label>\n    </div>\n  )\n}"}
      usage="Prefer Switch for settings that take effect immediately. Use Checkbox for form submissions."
      props={[
    { name: "checked", type: "boolean", default: "—", description: "Controlled state." },
    { name: "defaultChecked", type: "boolean", default: "—", description: "Uncontrolled initial state." },
    { name: "disabled", type: "boolean", default: "false", description: "Disables the switch." },
    { name: "onCheckedChange", type: "(checked) => void", default: "—", description: "Called when the state changes." },
      ]}
    />
  )
}
