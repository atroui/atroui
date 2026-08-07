import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoReveal } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Reveal",
  "/docs/components/reveal",
  "IntersectionObserver reveal using .atro-reveal CSS."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/reveal"
      registryName="reveal"
      title="Reveal"
      description="IntersectionObserver reveal using .atro-reveal CSS."
      preview={<DemoReveal />}
      code={'import { Reveal } from "@/components/blocks/reveal"\n\n<Reveal />'}
      fullBleed={false}
      usage="CSS lives in atroui/globals.css. For motion-based fades, see @atroui/fade-in."
    />
  )
}
