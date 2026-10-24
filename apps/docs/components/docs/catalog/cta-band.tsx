import { ComponentDoc } from "@/components/component-doc"
import { DemoCtaBand } from "@/components/registry-demos"

export function CtaBandDoc() {
  return (
    <ComponentDoc
      href="/docs/components/cta-band"
      registryName="cta-band"
      title="CTA Band"
      description="Headline plus CTAs over a soft brand wash. Install as @atroui/cta-band."
      preview={<DemoCtaBand />}
      code={`import { CtaBand } from "@/components/blocks/cta-band"

export function Example() {
  return <CtaBand />
}`}
      fullBleed={true}
      usage="Place once near the bottom of a marketing page before the footer. After install, edit the CONTENT object at the top of the file to match your offer."
    />
  )
}
