import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Visual Case Study",
  "/docs/components/case-studies-visual-case-study",
  "Self-contained case-study band - meta, before/after mockup, challenge/solution, metrics, and stack."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="visual-case-study"
      href="/docs/components/case-studies-visual-case-study"
      title="Visual Case Study"
      description="Self-contained case-study band - meta, before/after mockup, challenge/solution, metrics, and stack."
      fullBleed
      usage="Pass a CaseStudy object (see packages/ui content). mockupVariant drives the BeforeAfterSlider; challenge, solution, results, and technologies render in the narrative + metrics columns."
      code={`import { VisualCaseStudy } from "@/components/blocks/visual-case-study"\n\n<VisualCaseStudy />`}
    />
  )
}
