import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Contextual CTA",
  "/docs/components/cta-contextual-cta",
  "Scroll-triggered bottom CTA (shows after ~28% scroll on live pages). Preview below forces it open inline."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="contextual-cta"
      href="/docs/components/cta-contextual-cta"
      title="Contextual CTA"
      description="Scroll-triggered bottom CTA (shows after ~28% scroll on live pages). Preview below forces it open inline."
      code={`import { ContextualCta } from "@/components/blocks/contextual-cta"\n\n{/* Production: mounts fixed; appears on scroll */}\n<ContextualCta />\n\n{/* Docs */}\n<ContextualCta preview />`}
    />
  )
}
