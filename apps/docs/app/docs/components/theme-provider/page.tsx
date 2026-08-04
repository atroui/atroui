import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoThemeProviderNote } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Theme Provider',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Theme Provider'
      description='App-level next-themes wrapper. No visible chrome of its own — mount once at the root so ThemeToggle and dark tokens work.'
      preview={<DemoThemeProviderNote />}
      code={
        'import { ThemeProvider, ThemeToggle } from "@meridian/ui"\n\n' +
        "<ThemeProvider attribute=\"class\" defaultTheme=\"system\" enableSystem>\n" +
        "  {children}\n" +
        "</ThemeProvider>\n\n" +
        "// Anywhere under the provider:\n" +
        "<ThemeToggle />"
      }
      fullBleed={false}
      installation='import { ThemeProvider } from "@meridian/ui"'
      usage='Wrap the app root once. Docs already mounts it — the preview toggle flips the live site theme.'
    />
  )
}
