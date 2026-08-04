import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoContextualCta } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Contextual Cta',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Contextual Cta'
      description='Scroll-triggered bottom CTA (shows after ~28% scroll on live pages). Preview below forces it open inline.'
      preview={<DemoContextualCta />}
      code={'import { ContextualCTA } from "@meridian/ui"\n\n{/* Production: mounts fixed; appears on scroll */}\n<ContextualCTA />\n\n{/* Docs */}\n<ContextualCTA preview />'}
      fullBleed={false}
      installation='import { ContextualCTA } from "@meridian/ui"'
    />
  )
}
