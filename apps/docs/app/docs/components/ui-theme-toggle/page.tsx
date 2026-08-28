import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "React Theme Toggle Component",
  "/docs/components/ui-theme-toggle",
  "An elegant React theme toggle component built for Tailwind CSS and next-themes with soft-rect radius options."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="theme-toggle"
      href="/docs/components/ui-theme-toggle"
      title="React Theme Toggle Component"
      description="An elegant React theme toggle component built for Tailwind CSS and next-themes with soft-rect radius options."
      usage="Requires next-themes ThemeProvider. Compact sun/moon: @atroui/theme-toggle-icon. If a naive dark mode hides body copy, use @atroui/theme-adapt."
      props={[
    { name: 'className', type: 'string', default: '-', description: 'Extra classes.' },
  ]}
      code={`import { ThemeToggle } from "@/components/ui/theme-toggle"\n\n<ThemeToggle />`}
    />
  )
}
