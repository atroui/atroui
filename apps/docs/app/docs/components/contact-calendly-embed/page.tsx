import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Calendly Embed",
  "/docs/components/contact-calendly-embed",
  "Theme-aware Calendly embed with email fallback."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="calendly-embed"
      href="/docs/components/contact-calendly-embed"
      title="Calendly Embed"
      description="Theme-aware Calendly embed with email fallback."
      usage="Pass url, set CONTENT.url, or NEXT_PUBLIC_CALENDLY_URL. Without a URL, shows email fallback via getBrand()."
      props={[
        {
          name: "url",
          type: "string",
          default: "NEXT_PUBLIC_CALENDLY_URL",
          description: "Calendly event URL. Falls back to env, then email CTA.",
        },
      ]}
      code={`import { CalendlyEmbed } from "@/components/blocks/calendly-embed"\n\n<CalendlyEmbed />`}
    />
  )
}
