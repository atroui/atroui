import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoHomeWho } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: "Who",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Who"
      description="Founder / who-we-are section. Brand name and email default to getBrand()."
      preview={<DemoHomeWho />}
      code={
        'import { HomeWho } from "atroui"\n\n<HomeWho />\n\n{/* Rebrand */}\n<HomeWho brandName="Acme" email="hello@acme.test" />'
      }
      fullBleed={true}
      installation='import { HomeWho } from "atroui"'
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
          default: "—",
          description: "Founder blurb under the headline.",
        },
      ]}
    />
  )
}
