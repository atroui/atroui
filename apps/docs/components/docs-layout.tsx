import { DocsSidebar } from "@/components/sidebar"

export function DocsLayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-4.25rem)] bg-[#f2f4f6]">
      <div className="mx-auto flex w-full max-w-[1400px]">
        <aside className="sticky top-[4.25rem] hidden h-[calc(100vh-4.25rem)] w-60 shrink-0 overflow-y-auto px-3 py-8 lg:block xl:w-64">
          <DocsSidebar />
        </aside>
        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="rounded-[1.75rem] border border-black/[0.04] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-8 lg:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
