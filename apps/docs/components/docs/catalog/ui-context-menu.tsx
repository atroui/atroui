import { ComponentDoc } from "@/components/component-doc"
import { DemoContextMenu } from "@/components/registry-demos"

export function UiContextMenuDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-context-menu"
      registryName="context-menu"
      title="Context Menu"
      description="Pointer context menu on Base UI with menu settle and row stagger."
      preview={<DemoContextMenu />}
      code={`import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

<ContextMenu>
  <ContextMenuTrigger className="flex h-28 w-full max-w-xs items-center justify-center rounded-[var(--radius)] border border-dashed border-border-subtle text-sm text-muted-foreground">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Duplicate</ContextMenuItem>
    <ContextMenuItem>Archive</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}
      fullBleed={false}
      usage="Context menus enhance pointer actions — keep a visible control for the same jobs. Same Motion settle as Menu."
    />
  )
}
