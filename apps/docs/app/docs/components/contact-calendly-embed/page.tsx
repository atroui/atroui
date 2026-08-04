import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoCalendlyEmbed } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Calendly Embed',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Calendly Embed'
      description='Theme-aware Calendly embed with email fallback.'
      preview={<DemoCalendlyEmbed />}
      code={'import { CalendlyEmbed } from "@meridian/ui"\n\n<CalendlyEmbed />'}
      fullBleed={false}
      installation='import { CalendlyEmbed } from "@meridian/ui"'
    />
  )
}
