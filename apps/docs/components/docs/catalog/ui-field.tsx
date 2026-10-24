import { ComponentDoc } from "@/components/component-doc"
import { DemoField } from "@/components/registry-demos"


export function UiFieldDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-field"
      registryName="field"
      title="Field"
      description="Quiet Field spine — label, description, Motion error reveal, control."
      preview={<DemoField />}
      code={`import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"

<Field>
  <FieldLabel>Project name</FieldLabel>
  <FieldControl name="project" required placeholder="Acme launch" />
  <FieldDescription>Shown on the OG card.</FieldDescription>
  <FieldError match="valueMissing">Name is required.</FieldError>
</Field>`}
      fullBleed={false}
      usage="Compose Field around any control so label, help, and error stay wired. Prefer FieldControl or Input inside the root."
    />
  )
}
