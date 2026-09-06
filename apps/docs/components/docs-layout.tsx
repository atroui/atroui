import { DocsBreadcrumb } from "@/components/docs/docs-breadcrumb"
import { DocsToc } from "@/components/docs/docs-toc"
import { DocsSidebar } from "@/components/sidebar"
import { SiteFooter } from "@/components/site-footer"
import { DocsRouteTransition } from "@/components/view-transitions"

export function DocsLayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="md-ambient flex min-h-[calc(100svh-3.5rem)] flex-col bg-background">
      <div className="mx-auto flex w-full max-w-350 flex-1">
        <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-52 shrink-0 overflow-y-auto overscroll-contain border-r border-border-subtle px-2 py-6 lg:block xl:w-64 xl:px-3 xl:py-8">
          <DocsSidebar />
        </aside>
        <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 xl:px-10">
          <DocsBreadcrumb />
          <div data-docs-content>
            <DocsRouteTransition>{children}</DocsRouteTransition>
          </div>
        </main>
        <aside className="hidden w-60 shrink-0 border-l border-border-subtle px-6 py-10 xl:block">
          <div className="sticky top-[calc(3.5rem+1rem)] max-h-[calc(100svh-6rem)] overflow-y-auto">
            <DocsToc />
          </div>
        </aside>
      </div>
      <SiteFooter />
    </div>
  )
}
