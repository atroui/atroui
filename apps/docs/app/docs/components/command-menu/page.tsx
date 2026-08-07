import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoCommandMenu } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Command Menu",
  "/docs/components/command-menu",
  "⌘K command palette for nav, posts, connect, and theme."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/command-menu"
      registryName="command-menu"
      title="Command Menu"
      description="⌘K command palette for nav, posts, connect, and theme."
      preview={<DemoCommandMenu />}
      code={'import { CommandMenu } from "@/components/blocks/command-menu"\n\n<CommandMenu />'}
      fullBleed={false}
      usage="Mount once in the root layout. Opens via ⌘K / Ctrl+K. Requires ThemeProvider for appearance actions."
    />
  )
}
