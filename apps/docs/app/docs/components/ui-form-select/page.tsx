import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Form Select",
  "/docs/components/ui-form-select",
  "Accessible select built on Base UI."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="form-select"
      href="/docs/components/ui-form-select"
      title="Form Select"
      description="Accessible select built on Base UI."
      props={[
    { name: 'value', type: 'string', default: '-', description: 'Controlled value.' },
    { name: 'onValueChange', type: '(value: string) => void', default: '-', description: 'Change handler.' },
    { name: 'options', type: '{ value, label }[]', default: '-', description: 'Selectable options.' },
  ]}
      code={`import { FormSelect } from "@/components/ui/form-select"\n\n<FormSelect value={v} onValueChange={setV} options={[…]} />`}
    />
  )
}
