import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { DocsRouteTransition } from "@/components/view-transitions"

/**
 * Blog room — SiteHeader/Footer + route fade.
 * Index uses `.blog-index`; posts use `.blog-essay` (ledger continuity).
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
