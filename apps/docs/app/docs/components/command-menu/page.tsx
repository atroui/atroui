import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Command Menu",
  "/docs/components/command-menu",
  "⌘K command palette for nav, posts, connect, and theme."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="command-menu"
      href="/docs/components/command-menu"
      title="Command Menu"
      description="⌘K command palette for nav, posts, connect, and theme."
      usage="Mount once in the root layout. Opens via ⌘K / Ctrl+K. Requires ThemeProvider for appearance actions."
      code={`import { CommandMenu } from "@/components/blocks/command-menu"\n\n<CommandMenu />`}
    />
  )
}
