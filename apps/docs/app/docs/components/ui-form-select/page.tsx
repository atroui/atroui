import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoFormSelect } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Form Select",
  "/docs/components/ui-form-select"
)

export default function Page() {
  return (
    <ComponentDoc
      title='Form Select'
      description='Accessible select built on Base UI.'
      preview={<DemoFormSelect />}
      code={'import { FormSelect } from "atroui"\n\n<FormSelect value={v} onValueChange={setV} options={[…]} />'}
      fullBleed={false}
      props={[
    { name: 'value', type: 'string', default: '-', description: 'Controlled value.' },
    { name: 'onValueChange', type: '(value: string) => void', default: '-', description: 'Change handler.' },
    { name: 'options', type: '{ value, label }[]', default: '-', description: 'Selectable options.' },
  ]}
    />
  )
}
