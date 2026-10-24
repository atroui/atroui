import { ComponentDoc } from "@/components/component-doc"
import { DemoMenubar } from "@/components/registry-demos"

export function UiMenubarDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-menubar"
      registryName="menubar"
      title="Menubar"
      description="Focus-roving menubar shell with Menu grammar and Motion popups."
      preview={<DemoMenubar />}
      code={`import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New</MenubarItem>
      <MenubarItem>Open</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Save</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Cut</MenubarItem>
      <MenubarItem>Copy</MenubarItem>
      <MenubarItem>Paste</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}
      fullBleed={false}
      usage="Compose MenubarMenu with Menu grammar. Arrow keys rove across triggers once a menu is open."
    />
  )
}
