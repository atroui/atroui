import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoThemeToggle } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "React Theme Toggle Component",
  "/docs/components/ui-theme-toggle",
  "An elegant React theme toggle component built for Tailwind CSS and next-themes with soft-rect radius options."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/ui-theme-toggle"
      registryName="theme-toggle"
      title="React Theme Toggle Component"
      description="An elegant React theme toggle component built for Tailwind CSS and next-themes with soft-rect radius options."
      preview={<DemoThemeToggle />}
      code={'import { ThemeToggle } from "@/components/ui/theme-toggle"\n\n<ThemeToggle />'}
      fullBleed={false}
      usage="Requires next-themes ThemeProvider. Compact sun/moon: @atroui/theme-toggle-icon. If a naive dark mode hides body copy, use @atroui/theme-adapt."
      props={[
    { name: 'className', type: 'string', default: '-', description: 'Extra classes.' },
  ]}
    />
  )
}
