import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Stack List",
  "/docs/components/stack-list",
  "Sectioned tools/stack definition list."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="stack-list"
      href="/docs/components/stack-list"
      title="Stack List"
      description="Sectioned tools/stack definition list."
      fullBleed
      usage="Edit SECTIONS after install for everyday / ship tools."
      code={`import { StackList } from "@/components/blocks/stack-list"\n\n<StackList />`}
    />
  )
}
