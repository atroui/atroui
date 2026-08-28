import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Theme Provider",
  "/docs/components/theme-provider",
  "App-level next-themes wrapper. No visible chrome of its own - mount once at the root so ThemeToggle and dark tokens work."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="theme-provider"
      href="/docs/components/theme-provider"
      title="Theme Provider"
      description="App-level next-themes wrapper. No visible chrome of its own - mount once at the root so ThemeToggle and dark tokens work."
      usage="Wrap the app root once with enableSystem so ThemeToggle’s System option follows prefers-color-scheme. Docs already mounts it this way."
      code={`import { ThemeProvider } from "@/components/ui/theme-provider"\n' +
        'import { ThemeToggle } from "@/components/ui/theme-toggle"\n\n' +
        "<ThemeProvider attribute=\"class\" defaultTheme=\"system\" enableSystem>\n" +
        "  {children}\n" +
        "</ThemeProvider>\n\n" +
        "// Anywhere under the provider:\n" +
        "<ThemeToggle />`}
    />
  )
}
