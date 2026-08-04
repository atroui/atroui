import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoVisualCaseStudy } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: "Visual Case Study",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Visual Case Study"
      description="Self-contained case-study band — meta, before/after mockup, challenge/solution, metrics, and stack."
      preview={<DemoVisualCaseStudy />}
      code={'import { VisualCaseStudy } from "atroui"\n\n<VisualCaseStudy study={study} />'}
      fullBleed={true}
      installation='import { VisualCaseStudy } from "atroui"'
      usage="Pass a CaseStudy object (see packages/ui content). mockupVariant drives the BeforeAfterSlider; challenge, solution, results, and technologies render in the narrative + metrics columns."
    />
  )
}
