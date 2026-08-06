import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoThemeProviderNote } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Theme Provider",
  "/docs/components/theme-provider",
  "App-level next-themes wrapper. No visible chrome of its own - mount once at the root so ThemeToggle and dark tokens work."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/theme-provider"
      title="Theme Provider"
      description="App-level next-themes wrapper. No visible chrome of its own - mount once at the root so ThemeToggle and dark tokens work."
      preview={<DemoThemeProviderNote />}
      code={
        'import { ThemeProvider } from "@/components/theme-provider"\n' +
        'import { ThemeToggle } from "@/components/ui/theme-toggle"\n\n' +
        "<ThemeProvider attribute=\"class\" defaultTheme=\"system\" enableSystem>\n" +
        "  {children}\n" +
        "</ThemeProvider>\n\n" +
        "// Anywhere under the provider:\n" +
        "<ThemeToggle />"
      }
      fullBleed={false}
      usage="Wrap the app root once with enableSystem so ThemeToggle’s System option follows prefers-color-scheme. Docs already mounts it this way."
    />
  )
}
