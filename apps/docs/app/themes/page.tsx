import type { Metadata } from "next"
import { DocsHeader } from "@/components/docs/docs-header"
import { SiteFooter } from "@/components/site-footer"
import { ThemeStudio } from "@/components/theme-studio"
import { ToolExitBand } from "@/components/tool-exit-band"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Theme Studio — the Atro room",
  description:
    "Live accent, surface, type, and radius for AtroUI. Flip an axis, watch a real section recolor, copy CSS or install companions.",
  path: "/themes",
})

/**
 * The Atro room — paint wall + live stage + tool tray.
 * Accent lives on the paint wall; other axes in the tray; stage is the proof.
 */
export default function ThemesPage() {
  return (
    <>
      <DocsHeader showChapterNav={false} />
      <main className="atro-themes">
        <div className="atro-themes-frame">
          <ThemeStudio />
        </div>

        <ToolExitBand
          primaryHref="/docs/components/home-hero"
          primaryLabel="Install Home Hero"
          links={[
            { href: "/docs/theming", label: "Theming guide" },
            { href: "/docs/components", label: "All sections" },
            {
              href: "/docs/components/ui-color-theme-picker",
              label: "Color theme picker",
            },
          ]}
        />
      </main>
      <SiteFooter />
    </>
  )
}
