import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoHomeCrafts } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Crafts',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Crafts'
      description='Pricing / crafts overview section from the homepage.'
      preview={<DemoHomeCrafts />}
      code={'import { HomeCrafts } from "@meridian/ui"\n\n<HomeCrafts />'}
      fullBleed={true}
      installation='import { HomeCrafts } from "@meridian/ui"'
      usage='Homepage section — place below the hero.'
    />
  )
}
