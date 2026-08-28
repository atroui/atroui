import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Who",
  "/docs/components/home-who",
  "Founder / who-we-are section. Brand name and email default to getBrand()."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="home-who"
      href="/docs/components/home-who"
      title="Who"
      description="Founder / who-we-are section. Brand name and email default to getBrand()."
      fullBleed
      usage="Pass brandName, email, or bio to override AtroUI defaults. Richer studio narrative still lives under atroui/content for other sections."
      props={[
        {
          name: "brandName",
          type: "string",
          default: "getBrand().name",
          description: "Headline studio name.",
        },
        {
          name: "email",
          type: "string",
          default: "getBrand().email",
          description: "Mailto CTA.",
        },
        {
          name: "bio",
          type: "string",
          default: "-",
          description: "Founder blurb under the headline.",
        },
      ]}
      code={`import { HomeWho } from "@/components/blocks/home-who"\n\n<HomeWho />\n\n{/* Rebrand */}\n<HomeWho brandName="Acme" email="hello@acme.test" />`}
    />
  )
}
