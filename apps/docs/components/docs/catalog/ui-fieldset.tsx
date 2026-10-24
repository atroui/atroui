import { ComponentDoc } from "@/components/component-doc"
import { DemoFieldset } from "@/components/registry-demos"

export function UiFieldsetDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-fieldset"
      registryName="fieldset"
      title="Fieldset"
      description="Legend + soft-rect group chrome for related controls."
      preview={<DemoFieldset />}
      code={`import { Fieldset, FieldsetLegend } from "@/components/ui/fieldset"
import { Field, FieldControl, FieldLabel } from "@/components/ui/field"

<Fieldset>
  <FieldsetLegend>Billing contact</FieldsetLegend>
  <Field name="name">
    <FieldLabel>Name</FieldLabel>
    <FieldControl placeholder="Ada Lovelace" />
  </Field>
  <Field name="email">
    <FieldLabel>Email</FieldLabel>
    <FieldControl type="email" placeholder="ada@studio.dev" />
  </Field>
</Fieldset>`}
      fullBleed={false}
      usage="Group related Fields under one legend when the form has clear sections. Soft-rect chrome stays quiet — no cards-inside-cards."
    />
  )
}
