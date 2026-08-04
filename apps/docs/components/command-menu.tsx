"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
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
      if (e.key === "Escape") setOpen(false)
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

      {open ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-neutral-950/20 px-4 pt-[12vh] backdrop-blur-[2px]">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search documentation"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_20px_60px_rgb(0,0,0,0.12)]"
          >
            <div className="flex items-center gap-2 border-b border-neutral-100 px-3 py-2">
              <Search className="h-4 w-4 text-neutral-400" />
              <input
                autoFocus
                placeholder="Search components…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-2 py-8 text-center text-sm text-neutral-400">No results.</p>
              ) : (
                results.map((item) => (
                  <button
                    key={item.href}
                    type="button"
                    className={cn(
                      "flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950"
                    )}
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
          </div>
        </div>
      ) : null}
    </>
  )
}
