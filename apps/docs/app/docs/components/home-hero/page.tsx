import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Hero",
  "/docs/components/home-hero",
  "AI value-prop homepage hero (OG canvas, sprint rail, CTAs). Install as @atroui/home-hero."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="home-hero"
      href="/docs/components/home-hero"
      title="Hero"
      description="AI value-prop homepage hero (OG canvas, sprint rail, CTAs). Install as @atroui/home-hero."
      fullBleed
      usage="Use once at the top of a marketing homepage. Docs preview uses the studio HeroAiValueProposition; CLI install lands the CONTENT-driven HomeHero clone. Full-bleed section."
      code={`import { HomeHero } from "@/components/blocks/home-hero"\n\nexport function Example() {\n  return <HomeHero />\n}`}
    />
  )
}
