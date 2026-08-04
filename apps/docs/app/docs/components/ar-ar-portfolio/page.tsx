import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoArPortfolio } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Ar Portfolio',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Ar Portfolio'
      description='AR / portfolio showcase section.'
      preview={<DemoArPortfolio />}
      code={'import { ArPortfolio } from "@meridian/ui"\n\n<ArPortfolio />'}
      fullBleed={true}
      installation='import { ArPortfolio } from "@meridian/ui"'
    />
  )
}
