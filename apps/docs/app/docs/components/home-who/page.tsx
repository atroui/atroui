import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoHomeWho } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Who',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Who'
      description='Founder / who-we-are section.'
      preview={<DemoHomeWho />}
      code={'import { HomeWho } from "@meridian/ui"\n\n<HomeWho />'}
      fullBleed={true}
      installation='import { HomeWho } from "@meridian/ui"'
    />
  )
}
