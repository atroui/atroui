import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { AvatarDemo } from "@/components/demos"

export const metadata: Metadata = {
  title: "Avatar",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Avatar"
      description="User or entity image with graceful fallback initials."
      preview={<AvatarDemo />}
      code={"import { Avatar, AvatarImage, AvatarFallback } from \"@meridian/ui\"\n\nexport function Example() {\n  return (\n    <Avatar>\n      <AvatarImage src=\"/me.png\" alt=\"Me\" />\n      <AvatarFallback>ME</AvatarFallback>\n    </Avatar>\n  )\n}"}
      usage="Always provide a meaningful alt on AvatarImage and a text fallback."
      props={[
    { name: "src (AvatarImage)", type: "string", default: "—", description: "Image URL." },
    { name: "alt (AvatarImage)", type: "string", default: "—", description: "Accessible alternative text." },
      ]}
    />
  )
}
