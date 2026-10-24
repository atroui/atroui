import { ComponentDoc } from "@/components/component-doc"
import { DemoProse } from "@/components/registry-demos"


export function UiProseDoc() {
  return (
    <ComponentDoc
      registryName="prose"
      href="/docs/components/ui-prose"
      title="Prose"
      description="Long-form typography wrapper."
      preview={<DemoProse />}
      code={'import { Prose } from "@/components/ui/prose"\n\n<Prose><p>…</p></Prose>'}
      fullBleed={false}
      props={[
    { name: 'className', type: 'string', default: '-', description: 'Extra classes.' },
  ]}
    />
  )
}
