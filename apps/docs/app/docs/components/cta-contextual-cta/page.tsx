import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoContextualCta } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Contextual CTA",
  "/docs/components/cta-contextual-cta",
  "Scroll-triggered bottom CTA (shows after ~28% scroll on live pages). Preview below forces it open inline."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/cta-contextual-cta"
      registryName="contextual-cta"
      title="Contextual CTA"
      description="Scroll-triggered bottom CTA (shows after ~28% scroll on live pages). Preview below forces it open inline."
      preview={<DemoContextualCta />}
      code={'import { ContextualCta } from "@/components/blocks/contextual-cta"\n\n{/* Production: mounts fixed; appears on scroll */}\n<ContextualCta />\n\n{/* Docs */}\n<ContextualCta preview />'}
      fullBleed={false}
    />
  )
}
