import { DocsSidebar } from "@/components/sidebar"
import { DocsRouteTransition } from "@/components/view-transitions"

export function DocsLayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex w-full gap-8">
      <aside className="sticky top-4 hidden h-[calc(100svh-2rem)] w-48 shrink-0 overflow-y-auto overscroll-contain min-[1200px]:block">
        <DocsSidebar />
      </aside>
      <div className="min-w-0 flex-1 overflow-x-hidden">
        <DocsRouteTransition>{children}</DocsRouteTransition>
      </div>
    </main>
  )
}