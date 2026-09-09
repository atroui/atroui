import { ComponentDoc } from "@/components/component-doc"
import { DemoCheckbox } from "@/components/registry-demos"

export function UiCheckboxDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-checkbox"
      registryName="checkbox"
      title="Checkbox"
      description="Soft-rect checkbox with Motion check path draw on Base UI."
      preview={<DemoCheckbox />}
      code={`import { Checkbox } from "@/components/ui/checkbox"

<label className="flex items-center gap-2 text-sm">
  <Checkbox defaultChecked />
  Notify on publish
</label>`}
      fullBleed={false}
      usage="Pair with a visible label. Check path draws on tick; respect reduced motion."
    />
  )
}
