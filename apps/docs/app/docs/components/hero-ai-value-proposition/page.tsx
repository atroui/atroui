import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoHeroAiValueProposition } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Hero Ai Value Proposition',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Hero Ai Value Proposition'
      description='Full interactive hero — OG styles, sprint board, CTAs.'
      preview={<DemoHeroAiValueProposition />}
      code={'import { HeroAiValueProposition } from "@meridian/ui"\n\n<HeroAiValueProposition />'}
      fullBleed={true}
      installation='import { HeroAiValueProposition } from "@meridian/ui"'
    />
  )
}
