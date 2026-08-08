import { DocsSidebar } from "@/components/sidebar"
import { DocsRouteTransition } from "@/components/view-transitions"

export function DocsLayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="md-ambient min-h-[calc(100svh-3.5rem)] bg-background">
      <div className="mx-auto flex w-full max-w-350">
        <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-52 shrink-0 overflow-y-auto overscroll-contain border-r border-border-subtle px-2 py-6 lg:block xl:w-64 xl:px-3 xl:py-8">
          <DocsSidebar />
        </aside>
        <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 xl:px-10">
          <DocsRouteTransition>{children}</DocsRouteTransition>
        </main>
      </div>
    </div>
  )
}
