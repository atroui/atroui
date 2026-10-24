import { ComponentDoc } from "@/components/component-doc"
import { DemoDock } from "@/components/registry-demos"

export function MotionDockDoc() {
  return (
    <ComponentDoc
      registryName="dock"
      href="/docs/components/motion-dock"
      title="Dock"
      description="Magnifying app dock. Pointer-proximity grow, static under reduced motion."
      preview={<DemoDock />}
      code={`import { Dock, DockItem } from "@/components/ui/dock"

<Dock>
  <DockItem href="/tools" label="Tools">
    <ToolsIcon />
  </DockItem>
  <DockItem onClick={() => setOpen(true)} label="Settings">
    <SettingsIcon />
  </DockItem>
</Dock>`}
      fullBleed={false}
      usage="Short icon rows only — three to six items. Wrap each icon in DockItem (link, button, or plain tile) with a label. Icons grow 40→64px near the pointer. Reduced motion keeps fixed 40px tiles."
      props={[
        {
          name: "children",
          type: "ReactNode",
          default: "—",
          description: "Dock items; each magnifies near the pointer.",
        },
        {
          name: "DockItem.href",
          type: "string",
          default: "—",
          description: "Renders the item as a link.",
        },
        {
          name: "DockItem.onClick",
          type: "function",
          default: "—",
          description: "Renders the item as a button (ignored with href).",
        },
        {
          name: "DockItem.label",
          type: "string",
          default: "—",
          description: "Accessible label — required for icon-only items.",
        },
      ]}
    />
  )
}
