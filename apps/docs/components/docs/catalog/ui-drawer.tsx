import { ComponentDoc } from "@/components/component-doc"
import { DemoDrawer } from "@/components/registry-demos"

export function UiDrawerDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-drawer"
      registryName="drawer"
      title="Drawer"
      description="Edge panel with panelTween slide, backdrop fade, and portal presence."
      preview={<DemoDrawer />}
      code={`import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

<Drawer side="right">
  <DrawerTrigger render={<Button variant="outline" />}>Open drawer</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Filters</DrawerTitle>
      <DrawerDescription>Stay on the page; options travel from the edge.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
      <DrawerClose render={<Button />}>Apply</DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
      fullBleed={false}
      usage="Use for mobile filters or side settings. Panel slides with panelTween; backdrop fades. Prefer Dialog for centered focus tasks."
    />
  )
}
