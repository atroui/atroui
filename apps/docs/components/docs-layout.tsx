import { DocsSidebar } from "@/components/sidebar"

export function DocsLayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[1400px]">
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r px-4 py-8 lg:block">
        <DocsSidebar />
      </aside>
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-10">{children}</main>
    </div>
  )
}
