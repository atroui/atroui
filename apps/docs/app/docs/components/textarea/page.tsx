import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { TextareaDemo } from "@/components/demos"

export const metadata: Metadata = {
  title: "Textarea",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Textarea"
      description="Multi-line text input matching Input styling."
      preview={<TextareaDemo />}
      code={"import { Textarea } from \"@meridian/ui\"\n\nexport function Example() {\n  return <Textarea placeholder=\"Write a message…\" />\n}"}
      usage="Use for longer free-form text. Set a sensible min-height via className when needed."
      props={[
    { name: "disabled", type: "boolean", default: "false", description: "Disables the textarea." },
    { name: "placeholder", type: "string", default: "—", description: "Hint text shown when empty." },
    { name: "rows", type: "number", default: "—", description: "Preferred number of visible text lines." },
      ]}
    />
  )
}
