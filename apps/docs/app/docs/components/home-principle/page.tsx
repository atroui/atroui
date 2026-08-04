import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoHomePrinciple } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Principle',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Principle'
      description='Studio principles section.'
      preview={<DemoHomePrinciple />}
      code={'import { HomePrinciple } from "@meridian/ui"\n\n<HomePrinciple />'}
      fullBleed={true}
      installation='import { HomePrinciple } from "@meridian/ui"'
    />
  )
}
