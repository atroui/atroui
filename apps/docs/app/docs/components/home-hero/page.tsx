import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { HomeHero } from "../../../../registry/default/blocks/home-hero"

export const metadata: Metadata = componentPageMetadata(
  "Hero",
  "/docs/components/home-hero",
  "CONTENT-driven homepage hero. Install as @atroui/home-hero."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/home-hero"
      registryName="home-hero"
      title="Hero"
      description="CONTENT-driven homepage hero. Install as @atroui/home-hero."
      preview={<HomeHero />}
      code={
        'import { HomeHero } from "@/components/blocks/home-hero"\n\nexport function Example() {\n  return <HomeHero />\n}'
      }
      fullBleed={true}
      usage="Use once at the top of a marketing homepage. Preview is the same registry source the CLI copies into your repo. Full-bleed section."
    />
  )
}
