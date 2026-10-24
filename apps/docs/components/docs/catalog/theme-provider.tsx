import { ComponentDoc } from "@/components/component-doc"
import { DemoThemeProviderNote } from "@/components/registry-demos"


export function ThemeProviderDoc() {
  return (
    <ComponentDoc
      registryName="theme-provider"
      href="/docs/components/theme-provider"
      title="Theme Provider"
      description="App-level next-themes wrapper. No visible chrome of its own - mount once at the root so ThemeToggle and dark tokens work."
      preview={<DemoThemeProviderNote />}
      code={
        'import { ThemeProvider } from "@/components/ui/theme-provider"\n' +
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
