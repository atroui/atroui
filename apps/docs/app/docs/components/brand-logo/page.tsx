import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoLogo } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Logo',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Logo'
      description='Studio mark and wordmark.'
      preview={<DemoLogo />}
      code={'import { LogoMark, LogoWordmark } from "@meridian/ui"\n\n<LogoMark />\n<LogoWordmark />'}
      fullBleed={false}
      installation='import { LogoMark, LogoWordmark } from "@meridian/ui"'
      props={[
    { name: 'title', type: 'string', default: "'Makershot'", description: 'Accessible label.' },
    { name: 'className', type: 'string', default: '—', description: 'Size / color via currentColor.' },
  ]}
    />
  )
}
