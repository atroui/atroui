import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoHomeWork } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Work',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Work'
      description='Selected work section.'
      preview={<DemoHomeWork />}
      code={'import { HomeWork } from "atroui"\n\n<HomeWork />'}
      fullBleed={true}
      installation='import { HomeWork } from "atroui"'
    />
  )
}
