import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Scope Chat",
  "/docs/components/scope-scope-chat",
  "Interactive scoping chat. Calls the host /api/scope route for replies."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="scope-chat"
      href="/docs/components/scope-scope-chat"
      title="Scope Chat"
      description="Interactive scoping chat. Calls the host /api/scope route for replies."
      fullBleed
      code={`import { ScopeChat } from "@/components/blocks/scope-chat"\n\n<ScopeChat />`}
    />
  )
}
