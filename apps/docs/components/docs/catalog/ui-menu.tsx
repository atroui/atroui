import { ComponentDoc } from "@/components/component-doc"
import { DemoMenu } from "@/components/registry-demos"


export function UiMenuDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-menu"
      registryName="menu"
      title="Menu"
      description="Dropdown menu on Base UI with soft-rect items and settle motion."
      preview={<DemoMenu />}
      code={`import { Button } from "@/components/ui/button"
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu"

<Menu>
  <MenuTrigger render={<Button variant="outline" />}>Open</MenuTrigger>
  <MenuContent>
    <MenuItem>Duplicate</MenuItem>
    <MenuItem>Archive</MenuItem>
    <MenuSeparator />
    <MenuItem variant="destructive">Delete</MenuItem>
  </MenuContent>
</Menu>`}
      fullBleed={false}
      usage="Menus hold peer actions next to a control. Keep the list short; put irreversible items behind a separator and mark them destructive."
    />
  )
}
