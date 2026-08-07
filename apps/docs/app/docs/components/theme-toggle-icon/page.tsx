import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoThemeToggleIcon } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Theme Toggle Icon",
  "/docs/components/theme-toggle-icon",
  "Compact sun/moon theme toggle for narrow chrome."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/theme-toggle-icon"
      registryName="theme-toggle-icon"
      title="Theme Toggle Icon"
      description="Compact sun/moon theme toggle for narrow chrome."
      preview={<DemoThemeToggleIcon />}
      code={'import { ThemeToggleIcon } from "@/components/blocks/theme-toggle-icon"\n\n<ThemeToggleIcon />'}
      fullBleed={false}
      usage="Requires next-themes ThemeProvider. For the segmented pill, use @atroui/theme-toggle."
    />
  )
}
