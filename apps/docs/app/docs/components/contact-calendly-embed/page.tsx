import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoCalendlyEmbed } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: "Calendly Embed",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Calendly Embed"
      description="Theme-aware Calendly embed with email fallback."
      preview={<DemoCalendlyEmbed />}
      code={'import { CalendlyEmbed } from "@meridian/ui"\n\n<CalendlyEmbed url={process.env.NEXT_PUBLIC_CALENDLY_URL} />'}
      fullBleed={false}
      installation='import { CalendlyEmbed } from "@meridian/ui"'
      usage="Pass url or set NEXT_PUBLIC_CALENDLY_URL. Without either, the preview shows the “Calendly isn’t connected” fallback with a hello@makershot.tech mailto — same as production when env is missing."
      props={[
        {
          name: "url",
          type: "string",
          default: "NEXT_PUBLIC_CALENDLY_URL",
          description: "Calendly event URL. Falls back to env, then email CTA.",
        },
      ]}
    />
  )
}
