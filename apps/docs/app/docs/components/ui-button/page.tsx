import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoButton } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Button',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Button'
      description='Primary action control with variants and sizes.'
      preview={<DemoButton />}
      code={'import { Button } from "@meridian/ui"\n\n<Button>Continue</Button>'}
      fullBleed={false}
      installation='import { Button } from "@meridian/ui"'
      usage='Prefer one primary button per view.'
      props={[
    { name: 'variant', type: "'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link'", default: "'default'", description: 'Visual style.' },
    { name: 'size', type: "'default' | 'xs' | 'sm' | 'lg' | 'icon' | …", default: "'default'", description: 'Control size.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button.' },
  ]}
    />
  )
}
