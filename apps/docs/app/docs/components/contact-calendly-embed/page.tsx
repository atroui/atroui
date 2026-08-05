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
      registryName="calendly-embed"
      title="Calendly Embed"
      description="Theme-aware Calendly embed with email fallback."
      preview={<DemoCalendlyEmbed />}
      code={'import { CalendlyEmbed } from "@/components/blocks/calendly-embed"\n\n<CalendlyEmbed url={process.env.NEXT_PUBLIC_CALENDLY_URL} />'}
      fullBleed={false}
      usage="Pass url, set CONTENT.url, or NEXT_PUBLIC_CALENDLY_URL. Without a URL, shows email fallback via getBrand()."
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
