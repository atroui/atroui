import { ComponentDoc } from "@/components/component-doc"
import { DemoToolbar } from "@/components/registry-demos"

export function UiToolbarDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-toolbar"
      registryName="toolbar"
      title="Toolbar"
      description="Dense soft-rect toolbar chrome with Motion press feedback."
      preview={<DemoToolbar />}
      code={`import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/ui/toolbar"

<Toolbar aria-label="Editor">
  <ToolbarGroup>
    <ToolbarButton aria-label="Bold">B</ToolbarButton>
    <ToolbarButton aria-label="Italic">I</ToolbarButton>
  </ToolbarGroup>
  <ToolbarSeparator />
  <ToolbarButton aria-label="Link">Link</ToolbarButton>
</Toolbar>`}
      fullBleed={false}
      usage="Dense chrome for editing surfaces. Buttons press ≤100ms; soft-rect, not capsules."
    />
  )
}
