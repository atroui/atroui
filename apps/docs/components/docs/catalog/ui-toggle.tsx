import { ComponentDoc } from "@/components/component-doc"
import { DemoToggle } from "@/components/registry-demos"

export function UiToggleDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-toggle"
      registryName="toggle"
      title="Toggle"
      description="Soft-rect two-state button with pressed fill morph on Base UI."
      preview={<DemoToggle />}
      code={`import { Toggle } from "@/components/ui/toggle"

<Toggle aria-label="Bold" defaultPressed>
  Bold
</Toggle>`}
      fullBleed={false}
      usage="Pressed fill morphs in ≤160ms. Inside ToggleGroup, single-select peers share a layoutId pill."
    />
  )
}
