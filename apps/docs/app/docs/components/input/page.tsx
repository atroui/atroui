import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { InputDemo } from "@/components/demos"

export const metadata: Metadata = {
  title: "Input",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Input"
      description="Single-line text field with focus ring and disabled states."
      preview={<InputDemo />}
      code={"import { Input, Label } from \"@meridian/ui\"\n\nexport function Example() {\n  return (\n    <>\n      <Label htmlFor=\"email\">Email</Label>\n      <Input id=\"email\" type=\"email\" placeholder=\"you@example.com\" />\n    </>\n  )\n}"}
      usage="Always pair inputs with a Label. Use placeholder text sparingly — prefer visible labels for accessibility."
      props={[
    { name: "type", type: "string", default: "'text'", description: "Native HTML input type." },
    { name: "disabled", type: "boolean", default: "false", description: "Disables the input." },
    { name: "placeholder", type: "string", default: "—", description: "Hint text shown when empty." },
      ]}
    />
  )
}
