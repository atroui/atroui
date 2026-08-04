import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoFounderAvatar } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Founder Avatar',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Founder Avatar'
      description='Circular founder portrait.'
      preview={<DemoFounderAvatar />}
      code={'import { FounderAvatar } from "@meridian/ui"\n\n<FounderAvatar size="md" />'}
      fullBleed={false}
      installation='import { FounderAvatar } from "@meridian/ui"'
      usage='Requires /images/founder-portrait.png in the host app.'
      props={[
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'sm'", description: 'Avatar size.' },
  ]}
    />
  )
}
