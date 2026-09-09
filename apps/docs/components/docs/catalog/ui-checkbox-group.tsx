import { ComponentDoc } from "@/components/component-doc"
import { DemoCheckboxGroup } from "@/components/registry-demos"

export function UiCheckboxGroupDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-checkbox-group"
      registryName="checkbox-group"
      title="Checkbox Group"
      description="Soft-rect checkbox group — compose with Checkbox (value / parent)."
      preview={<DemoCheckboxGroup />}
      code={`import { Checkbox } from "@/components/ui/checkbox"
import { CheckboxGroup } from "@/components/ui/checkbox-group"

const ALL = ["draft", "review", "ship"]

<CheckboxGroup defaultValue={["draft"]} allValues={ALL}>
  <label className="flex items-center gap-2 text-sm">
    <Checkbox parent />
    Release stages
  </label>
  <label className="ml-4 flex items-center gap-2 text-sm">
    <Checkbox value="draft" />
    Draft
  </label>
  <label className="ml-4 flex items-center gap-2 text-sm">
    <Checkbox value="review" />
    Review
  </label>
  <label className="ml-4 flex items-center gap-2 text-sm">
    <Checkbox value="ship" />
    Ship
  </label>
</CheckboxGroup>`}
      fullBleed={false}
      usage="Wrap labeled Checkboxes. Use value on children; parent + allValues for select-all."
    />
  )
}
