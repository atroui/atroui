import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoVisualCaseStudy } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Visual Case Study',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Visual Case Study'
      description='Case study layout with metrics and mockup.'
      preview={<DemoVisualCaseStudy />}
      code={'import { VisualCaseStudy } from "@meridian/ui"\n\n<VisualCaseStudy study={study} />'}
      fullBleed={true}
      installation='import { VisualCaseStudy } from "@meridian/ui"'
    />
  )
}
