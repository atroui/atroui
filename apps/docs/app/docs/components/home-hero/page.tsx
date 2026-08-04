import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoHomeHero } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Hero',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Hero'
      description='Primary homepage hero with interactive OG canvas, sprint timeline, and CTA.'
      preview={<DemoHomeHero />}
      code={'import { HomeHero } from "atroui"\n\nexport function Example() {\n  return <HomeHero />\n}'}
      fullBleed={true}
      installation='import { HomeHero } from "atroui"'
      usage='Use once at the top of a marketing homepage. Full-bleed section.'
    />
  )
}
