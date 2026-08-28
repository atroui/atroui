import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Reveal",
  "/docs/components/reveal",
  "IntersectionObserver reveal using .atro-reveal CSS."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="reveal"
      href="/docs/components/reveal"
      title="Reveal"
      description="IntersectionObserver reveal using .atro-reveal CSS."
      usage="CSS lives in atroui/globals.css. For motion-based fades, see @atroui/fade-in."
      code={`import { Reveal } from "@/components/blocks/reveal"\n\n<Reveal />`}
    />
  )
}
