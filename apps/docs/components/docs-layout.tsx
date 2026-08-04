import { DocsSidebar } from "@/components/sidebar"

export function DocsLayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-4.25rem)] bg-background">
      <div className="mx-auto flex w-full max-w-[1400px]">
        <aside className="sticky top-[4.25rem] hidden h-[calc(100vh-4.25rem)] w-60 shrink-0 overflow-y-auto border-r border-border-subtle px-3 py-8 lg:block xl:w-64">
          <DocsSidebar />
        </aside>
        <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  )
}
