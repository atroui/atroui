import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoHomeLab } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Lab',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Lab'
      description='Lab / experiments section from the homepage.'
      preview={<DemoHomeLab />}
      code={'import { HomeLab } from "@meridian/ui"\n\n<HomeLab />'}
      fullBleed={true}
      installation='import { HomeLab } from "@meridian/ui"'
    />
  )
}
