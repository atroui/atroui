import { DocsSidebar } from "@/components/sidebar"
import { DocsRouteTransition } from "@/components/view-transitions"

export function DocsLayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="md-ambient min-h-[calc(100svh-3.5rem)] bg-background">
      <div className="mx-auto flex w-full max-w-350">
        <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-56 shrink-0 overflow-y-auto overscroll-contain border-r border-border-subtle px-3 py-8 lg:block xl:w-64 xl:px-4 xl:py-10">
          <DocsSidebar />
        </aside>
        <main className="min-w-0 flex-1 overflow-x-hidden px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 xl:px-12">
          <DocsRouteTransition>{children}</DocsRouteTransition>
        </main>
      </div>
    </div>
  )
}
