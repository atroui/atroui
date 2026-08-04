import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoBoldFooter } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Footer Bold',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Footer Bold'
      description='Bold marketing footer with links and brand mark.'
      preview={<DemoBoldFooter />}
      code={'import { BoldFooter } from "@meridian/ui"\n\n<BoldFooter />'}
      fullBleed={true}
      installation='import { BoldFooter } from "@meridian/ui"'
    />
  )
}
