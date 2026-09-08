import { DocsPageFade } from "@/components/docs/docs-page-fade"
import { DocsToc } from "@/components/docs/docs-toc"
import { DocsSidebar } from "@/components/sidebar"
import { DocsRouteTransition } from "@/components/view-transitions"

/**
 * Zed/mdBook page frame:
 * sidebar (280) · content (~690 measure) · optional page TOC
 */
export function DocsLayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs-book-frame">
      <aside className="docs-book-sidebar" aria-label="Documentation">
        <div className="docs-book-sidebar-scroll docs-scroll-quiet">
          <DocsSidebar />
        </div>
      </aside>

      <div className="docs-book-page">
        <main className="docs-book-main">
          <div data-docs-content>
            <DocsRouteTransition>
              <DocsPageFade>{children}</DocsPageFade>
            </DocsRouteTransition>
          </div>
        </main>

        <aside className="docs-book-toc" aria-label="On this page">
          <div className="docs-book-toc-sticky docs-scroll-quiet">
            <DocsToc />
          </div>
        </aside>
      </div>
    </div>
  )
}
