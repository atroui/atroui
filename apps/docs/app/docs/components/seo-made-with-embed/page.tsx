import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoMadeWithEmbed } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Made With Embed",
  "/docs/components/seo-made-with-embed"
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/seo-made-with-embed"
      registryName="made-with-embed"
      title="Made With Embed"
      description="Credit badge + copyable HTML embed. Defaults to AtroUI branding."
      preview={<DemoMadeWithEmbed />}
      code={'import { MadeWithEmbed } from "@/components/blocks/made-with-embed"\n\n<MadeWithEmbed />\n\n<MadeWithEmbed\n  brandName="Acme"\n  badgeSrc="/badge/acme.svg"\n  href="/tools"\n/>'}
      fullBleed={false}
      usage="Edit CONTENT.siteOrigin and badgeSrc after install. Host the badge SVG in your public folder."
      props={[
        {
          name: "href",
          type: "string",
          default: "'/'",
          description: "Badge link target.",
        },
        {
          name: "badgeSrc",
          type: "string",
          default: "'/badge/atroui.svg'",
          description: "Path or absolute URL to the badge image.",
        },
        {
          name: "brandName",
          type: "string",
          default: "getBrand().name",
          description: "Alt text and accessible label.",
        },
      ]}
    />
  )
}
