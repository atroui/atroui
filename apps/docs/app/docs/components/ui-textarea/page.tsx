import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoTextarea } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Textarea',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Textarea'
      description='Multi-line text input.'
      preview={<DemoTextarea />}
      code={'import { Textarea } from "@meridian/ui"\n\n<Textarea placeholder="Message" />'}
      fullBleed={false}
      installation='import { Textarea } from "@meridian/ui"'
      props={[
    { name: 'placeholder', type: 'string', default: '—', description: 'Hint text.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables input.' },
  ]}
    />
  )
}
