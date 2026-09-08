import { ComponentDoc } from "@/components/component-doc"
import { DemoVisualCaseStudy } from "@/components/registry-demos"


export function CaseStudiesVisualCaseStudyDoc() {
  return (
    <ComponentDoc
      registryName="visual-case-study"
      href="/docs/components/case-studies-visual-case-study"
      title="Visual Case Study"
      description="Self-contained case-study band - meta, before/after mockup, challenge/solution, metrics, and stack."
      preview={<DemoVisualCaseStudy />}
      code={'import { VisualCaseStudy } from "@/components/blocks/visual-case-study"\n\n<VisualCaseStudy />'}
      fullBleed={true}
      usage="Pass a CaseStudy object (see packages/ui content). mockupVariant drives the BeforeAfterSlider; challenge, solution, results, and technologies render in the narrative + metrics columns."
    />
  )
}
