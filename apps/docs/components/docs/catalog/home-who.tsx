import { ComponentDoc } from "@/components/component-doc"
import { DemoHomeWho } from "@/components/registry-demos"


export function HomeWhoDoc() {
  return (
    <ComponentDoc
      href="/docs/components/home-who"
      registryName="home-who"
      title="Who"
      description="Founder / who-we-are section. Brand name and email default to getBrand()."
      preview={<DemoHomeWho />}
      code={'import { HomeWho } from "@/components/blocks/home-who"\n\n<HomeWho />\n\n{/* Rebrand */}\n<HomeWho brandName="Acme" email="hello@acme.test" />'}
      fullBleed={true}
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
    />
  )
}
