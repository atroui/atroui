import { ComponentDoc } from "@/components/component-doc"
import { DemoNumberField } from "@/components/registry-demos"

export function UiNumberFieldDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-number-field"
      registryName="number-field"
      title="Number Field"
      description="Soft-rect stepper number field with careful scrub feedback on Base UI."
      preview={<DemoNumberField />}
      code={`import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/components/ui/number-field"

<NumberField defaultValue={4} min={1} max={12}>
  <NumberFieldScrubArea>Quantity</NumberFieldScrubArea>
  <NumberFieldGroup>
    <NumberFieldDecrement />
    <NumberFieldInput />
    <NumberFieldIncrement />
  </NumberFieldGroup>
</NumberField>`}
      fullBleed={false}
      usage="Use inside Field for labels and errors. ScrubArea is optional — keep scrub feedback quiet; steppers own the press micro-motion."
    />
  )
}
