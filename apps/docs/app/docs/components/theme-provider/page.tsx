import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoThemeProviderNote } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Theme Provider",
  "/docs/components/theme-provider"
)

export default function Page() {
  return (
    <ComponentDoc
      title='Theme Provider'
      description='App-level next-themes wrapper. No visible chrome of its own - mount once at the root so ThemeToggle and dark tokens work.'
      preview={<DemoThemeProviderNote />}
      code={
        'import { ThemeProvider, ThemeToggle } from "atroui"\n\n' +
        "<ThemeProvider attribute=\"class\" defaultTheme=\"system\" enableSystem>\n" +
        "  {children}\n" +
        "</ThemeProvider>\n\n" +
        "// Anywhere under the provider:\n" +
        "<ThemeToggle />"
      }
      fullBleed={false}
      installation='import { ThemeProvider } from "atroui"'
      usage='Wrap the app root once with enableSystem so ThemeToggle’s System option follows prefers-color-scheme. Docs already mounts it this way.'
    />
  )
}
