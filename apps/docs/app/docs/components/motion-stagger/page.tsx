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
      description='Staggered children reveal. Preview plays on mount — use Replay to watch again.'
      preview={<DemoStagger />}
      code={'import { Stagger, StaggerChild } from "atroui"\n\n<Stagger>\n  <StaggerChild>One</StaggerChild>\n</Stagger>\n\n{/* Docs */}\n<Stagger preview>\n  <StaggerChild>One</StaggerChild>\n</Stagger>'}
      fullBleed={false}
      installation='import { Stagger, StaggerChild } from "atroui"'
    />
  )
}
