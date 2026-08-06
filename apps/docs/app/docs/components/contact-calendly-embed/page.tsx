import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoCalendlyEmbed } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Calendly Embed",
  "/docs/components/contact-calendly-embed",
  "Theme-aware Calendly embed with email fallback."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/contact-calendly-embed"
      registryName="calendly-embed"
      title="Calendly Embed"
      description="Theme-aware Calendly embed with email fallback."
      preview={<DemoCalendlyEmbed />}
      code={'import { CalendlyEmbed } from "@/components/blocks/calendly-embed"\n\n<CalendlyEmbed />'}
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
