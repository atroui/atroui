"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { badgeLabel, allNavItems } from "@/lib/navigation"

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
        className="inline-flex h-9 w-full max-w-[220px] items-center gap-2 border border-border-subtle bg-background px-3 text-[13px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Search className="size-3.5 shrink-0" aria-hidden />
        <span className="flex-1 text-left">Search…</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center border border-border-subtle bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex">
          ⌘K
        </kbd>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/20 px-4 pt-[12vh] backdrop-blur-[2px]">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search documentation"
            className="w-full max-w-lg overflow-hidden border border-border-subtle bg-background shadow-[0_24px_64px_-28px_color-mix(in_oklch,var(--foreground)_40%,transparent)]"
          >
            <div className="flex items-center gap-2 border-b border-border-subtle px-3 py-2">
              <Search className="size-4 text-muted-foreground" aria-hidden />
              <input
                autoFocus
                placeholder="Search components…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-10 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex size-8 items-center justify-center border border-border-subtle text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto p-1.5">
              {results.length === 0 ? (
                <p className="px-2 py-8 text-center text-sm text-muted-foreground">
                  No results.
                </p>
              ) : (
                results.map((item) => (
                  <button
                    key={item.href}
                    type="button"
                    className={cn(
                      "flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    )}
                    onClick={() => {
                      setOpen(false)
                      router.push(item.href)
                    }}
                  >
                    <span>{item.title}</span>
                    {item.badge ? (
                      <span
                        className={cn(
                          "shrink-0 text-[10px] font-semibold uppercase tracking-[0.06em]",
                          item.badge === "host-api"
                            ? "text-brand"
                            : "text-muted-foreground"
                        )}
                      >
                        {badgeLabel[item.badge]}
                      </span>
                    ) : null}
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
