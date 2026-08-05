import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoContextualCta } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Contextual Cta",
  "/docs/components/cta-contextual-cta"
)

export default function Page() {
  return (
    <ComponentDoc
      registryName="contextual-cta"
      title='Contextual Cta'
      description='Scroll-triggered bottom CTA (shows after ~28% scroll on live pages). Preview below forces it open inline.'
      preview={<DemoContextualCta />}
      code={'import { ContextualCTA } from "atroui"\n\n{/* Production: mounts fixed; appears on scroll */}\n<ContextualCTA />\n\n{/* Docs */}\n<ContextualCTA preview />'}
      fullBleed={false}
    />
  )
}
