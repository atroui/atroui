import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { SeparatorDemo } from "@/components/demos"

export const metadata: Metadata = {
  title: "Separator",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Separator"
      description="Visual divider between related content sections."
      preview={<SeparatorDemo />}
      code={"import { Separator } from \"@meridian/ui\"\n\nexport function Example() {\n  return <Separator />\n}"}
      usage="Use separators to clarify hierarchy without adding heavy borders everywhere."
      props={[
    { name: "orientation", type: "'horizontal' | 'vertical'", default: "'horizontal'", description: "Divider direction." },
    { name: "decorative", type: "boolean", default: "true", description: "If true, hidden from assistive tech." },
      ]}
    />
  )
}
