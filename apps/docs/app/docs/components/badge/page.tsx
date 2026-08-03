import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { BadgeDemo } from "@/components/demos"

export const metadata: Metadata = {
  title: "Badge",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Badge"
      description="Compact label for status, category, or metadata."
      preview={<BadgeDemo />}
      code={"import { Badge } from \"@meridian/ui\"\n\nexport function Example() {\n  return <Badge>New</Badge>\n}"}
      usage="Keep badge text short (1–2 words). Use destructive sparingly for critical states."
      props={[
    { name: "variant", type: "'default' | 'secondary' | 'destructive' | 'outline'", default: "'default'", description: "Visual style." },
      ]}
    />
  )
}
