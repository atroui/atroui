import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoContextualCta } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Contextual Cta',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Contextual Cta'
      description='Context-aware call to action.'
      preview={<DemoContextualCta />}
      code={'import { ContextualCTA } from "@meridian/ui"\n\n<ContextualCTA />'}
      fullBleed={false}
      installation='import { ContextualCTA } from "@meridian/ui"'
    />
  )
}
