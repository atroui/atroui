import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Lab",
  "/docs/components/home-lab",
  "Lab / experiments section from the homepage."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="home-lab"
      href="/docs/components/home-lab"
      title="Lab"
      description="Lab / experiments section from the homepage."
      fullBleed
      code={`import { HomeLab } from "@/components/blocks/home-lab"\n\n<HomeLab />`}
    />
  )
}
