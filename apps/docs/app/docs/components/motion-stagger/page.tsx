import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoStagger } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Stagger',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Stagger'
      description='Staggered children reveal.'
      preview={<DemoStagger />}
      code={'import { Stagger, StaggerChild } from "@meridian/ui"\n\n<Stagger>\n  <StaggerChild>One</StaggerChild>\n</Stagger>'}
      fullBleed={false}
      installation='import { Stagger, StaggerChild } from "@meridian/ui"'
    />
  )
}
