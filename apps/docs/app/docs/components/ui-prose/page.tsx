import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoProse } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Prose',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Prose'
      description='Long-form typography wrapper.'
      preview={<DemoProse />}
      code={'import { Prose } from "atroui"\n\n<Prose><p>…</p></Prose>'}
      fullBleed={false}
      installation='import { Prose } from "atroui"'
      props={[
    { name: 'className', type: 'string', default: '—', description: 'Extra classes.' },
  ]}
    />
  )
}
