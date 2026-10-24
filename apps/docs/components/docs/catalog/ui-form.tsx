import { ComponentDoc } from "@/components/component-doc"
import { DemoForm } from "@/components/registry-demos"

export function UiFormDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-form"
      registryName="form"
      title="Form"
      description="Base UI form validation orchestration — pair with Field."
      preview={<DemoForm />}
      code={`import { Form } from "@/components/ui/form"
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"

<Form
  onFormSubmit={(values) => {
    console.log(values)
  }}
>
  <Field name="email">
    <FieldLabel>Email</FieldLabel>
    <FieldControl type="email" required placeholder="you@studio.dev" />
    <FieldError match="valueMissing">Email is required.</FieldError>
  </Field>
  <Button type="submit">Continue</Button>
</Form>`}
      fullBleed={false}
      usage="Pass server errors via errors={{ fieldName: message }}. Field owns label/error chrome; Form owns submit validation timing."
    />
  )
}
