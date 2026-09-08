import { ComponentDoc } from "@/components/component-doc"
import { DemoCommandMenu } from "@/components/registry-demos"


export function CommandMenuDoc() {
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
