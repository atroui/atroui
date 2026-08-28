import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Principle",
  "/docs/components/home-principle",
  "Studio principles section."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="home-principle"
      href="/docs/components/home-principle"
      title="Principle"
      description="Studio principles section."
      fullBleed
      code={`import { HomePrinciple } from "@/components/blocks/home-principle"\n\n<HomePrinciple />`}
    />
  )
}
