import { ComponentDoc } from "@/components/component-doc"
import { DemoToggleGroup } from "@/components/registry-demos"

export function UiToggleGroupDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-toggle-group"
      registryName="toggle-group"
      title="Toggle Group"
      description="Toggle peers with layoutId highlight morph — Motion.dev Base UI pattern."
      preview={<DemoToggleGroup />}
      code={`import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup } from "@/components/ui/toggle-group"

<ToggleGroup defaultValue={["left"]} aria-label="Align">
  <Toggle value="left">Left</Toggle>
  <Toggle value="center">Center</Toggle>
  <Toggle value="right">Right</Toggle>
</ToggleGroup>`}
      fullBleed={false}
      usage="Single-select: highlight travels between peers. multiple keeps per-toggle morph."
    />
  )
}
