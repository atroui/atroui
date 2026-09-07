import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { DocsRouteTransition } from "@/components/view-transitions"

/**
 * Blog essay room — same product chrome as marketing; Outfit body (not Merriweather).
 * Measure ~740px Zed blog column via .atro-essay.
 */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <DocsRouteTransition>{children}</DocsRouteTransition>
      <SiteFooter />
    </>
  )
}
