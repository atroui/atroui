import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Theme Toggle Icon",
  "/docs/components/theme-toggle-icon",
  "Compact sun/moon theme toggle for narrow chrome."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="theme-toggle-icon"
      href="/docs/components/theme-toggle-icon"
      title="Theme Toggle Icon"
      description="Compact sun/moon theme toggle for narrow chrome."
      usage="Requires next-themes ThemeProvider. For the segmented pill, use @atroui/theme-toggle."
      code={`import { ThemeToggleIcon } from "@/components/blocks/theme-toggle-icon"\n\n<ThemeToggleIcon />`}
    />
  )
}
