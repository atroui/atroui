import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoThemeToggle } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Theme Toggle",
  "/docs/components/ui-theme-toggle",
  "Light / dark theme switch."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/ui-theme-toggle"
      registryName="theme-toggle"
      title="Theme Toggle"
      description="Light / dark theme switch."
      preview={<DemoThemeToggle />}
      code={'import { ThemeToggle } from "@/components/ui/theme-toggle"\n\n<ThemeToggle />'}
      fullBleed={false}
      usage="Requires next-themes ThemeProvider."
      props={[
    { name: 'className', type: 'string', default: '-', description: 'Extra classes.' },
  ]}
    />
  )
}
