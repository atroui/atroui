import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Work",
  "/docs/components/home-work",
  "Selected work section."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="home-work"
      href="/docs/components/home-work"
      title="Work"
      description="Selected work section."
      fullBleed
      code={`import { HomeWork } from "@/components/blocks/home-work"\n\n<HomeWork />`}
    />
  )
}
