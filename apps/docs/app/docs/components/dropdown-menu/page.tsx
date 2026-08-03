import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DropdownMenuDemo } from "@/components/demos"

export const metadata: Metadata = {
  title: "Dropdown Menu",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Dropdown Menu"
      description="Contextual menu of actions anchored to a trigger."
      preview={<DropdownMenuDemo />}
      code={"import {\n  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,\n  DropdownMenuItem, Button\n} from \"@meridian/ui\"\n\nexport function Example() {\n  return (\n    <DropdownMenu>\n      <DropdownMenuTrigger asChild>\n        <Button variant=\"outline\">Menu</Button>\n      </DropdownMenuTrigger>\n      <DropdownMenuContent>\n        <DropdownMenuItem>Profile</DropdownMenuItem>\n        <DropdownMenuItem>Settings</DropdownMenuItem>\n      </DropdownMenuContent>\n    </DropdownMenu>\n  )\n}"}
      usage="Group related actions and use separators. Destructive actions should appear last and be visually distinct."
      props={[
    { name: "open", type: "boolean", default: "—", description: "Controlled open state." },
    { name: "onOpenChange", type: "(open) => void", default: "—", description: "Called when open state changes." },
      ]}
    />
  )
}
