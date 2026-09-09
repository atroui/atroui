import { DocsPageFade } from "@/components/docs/docs-page-fade"
import {
  DocsTocMobile,
  DocsTocProvider,
  DocsTocRail,
} from "@/components/docs/docs-toc"
import { DocsSidebarScroll } from "@/components/docs/docs-sidebar-scroll"
import { DocsSidebar } from "@/components/sidebar"
import { DocsRouteTransition } from "@/components/view-transitions"

/**
 * Docs reading frame:
 * sticky chapter spine · content measure · right rail (always reserved at xl).
 * Mid breakpoints get an On-this-page disclosure above the chapter.
 */
export function DocsLayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <DocsTocProvider>
      <div className="docs-book-frame">
        <aside className="docs-book-sidebar" aria-label="Documentation">
          <DocsSidebarScroll>
            <DocsSidebar />
          </DocsSidebarScroll>
        </aside>

        <div className="docs-book-page">
          <main className="docs-book-main">
            <DocsTocMobile />
            <div data-docs-content>
              <DocsRouteTransition>
                <DocsPageFade>{children}</DocsPageFade>
              </DocsRouteTransition>
            </div>
          </main>

          <DocsTocRail />
        </div>
      </div>
    </DocsTocProvider>
  )
}
