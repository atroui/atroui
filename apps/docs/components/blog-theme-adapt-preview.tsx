"use client"

import { DocsExample } from "@/components/docs-example"
import { DemoThemeAdapt } from "@/components/registry-demos"

const THEME_ADAPT_CODE = `import { ThemeAdapt } from "@/components/ui/theme-adapt"

<ThemeAdapt />`

/**
 * Same Preview/Code stage as the component docs, locked to the prose column.
 * Family Values: keep place — grow in height, no inner scrollbar.
 */
export function BlogThemeAdaptPreview() {
  return (
    <DocsExample
      preview={<DemoThemeAdapt />}
      code={THEME_ADAPT_CODE}
      fullBleed
      unclip
      installCommand="npx shadcn@latest add @atroui/theme-adapt"
    />
  )
}
