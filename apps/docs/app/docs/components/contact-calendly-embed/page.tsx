import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoCalendlyEmbed } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Calendly Embed",
  "/docs/components/contact-calendly-embed"
)

export default function Page() {
  return (
    <ComponentDoc
      title="Calendly Embed"
      description="Theme-aware Calendly embed with email fallback."
      preview={<DemoCalendlyEmbed />}
      code={'import { CalendlyEmbed } from "atroui"\n\n<CalendlyEmbed url={process.env.NEXT_PUBLIC_CALENDLY_URL} />'}
      fullBleed={false}
      installation='import { CalendlyEmbed } from "atroui"'
      usage="Pass url or set NEXT_PUBLIC_CALENDLY_URL. Without either, the preview shows the “Calendly isn’t connected” fallback with a mailto to getBrand().email (hello@atroui.com by default)."
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
