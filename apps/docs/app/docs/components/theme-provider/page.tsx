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
      description='App-level theme context for light/dark mode.'
      preview={<DemoThemeProviderNote />}
      code={'import { ThemeProvider } from "@meridian/ui"\n\n<ThemeProvider>{children}</ThemeProvider>'}
      fullBleed={false}
      installation='import { ThemeProvider } from "@meridian/ui"'
    />
  )
}
