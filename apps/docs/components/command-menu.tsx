"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, Input } from "@meridian/ui"
import { allNavItems } from "@/lib/navigation"

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const router = useRouter()
  const pathname = usePathname()

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  const results = allNavItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-full max-w-[220px] items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 text-[13px] text-neutral-400 shadow-[0_1px_2px_rgb(0,0,0,0.04)] transition-colors hover:border-neutral-300 hover:text-neutral-600"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="flex-1 text-left">Search…</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center rounded-md border border-neutral-200 bg-neutral-50 px-1.5 font-mono text-[10px] font-medium text-neutral-500 sm:flex">
          ⌘K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 overflow-hidden rounded-2xl border-neutral-200 p-0 shadow-[0_20px_60px_rgb(0,0,0,0.12)] sm:max-w-lg">
          <DialogTitle className="sr-only">Search documentation</DialogTitle>
          <div className="border-b border-neutral-100 px-3 py-2">
            <Input
              autoFocus
              placeholder="Search components…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 shadow-none focus-visible:ring-0"
            />
          </div>
          <div className="max-h-72 overflow-y-auto p-2">
            {results.length === 0 ? (
              <p className="px-2 py-8 text-center text-sm text-neutral-400">No results.</p>
            ) : (
              results.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  className="flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950"
                  onClick={() => {
                    setOpen(false)
                    router.push(item.href)
                  }}
                >
                  {item.title}
                </button>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
