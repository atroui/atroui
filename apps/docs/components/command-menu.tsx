"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  cn,
} from "@meridian/ui"
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
        className="inline-flex h-9 w-full max-w-sm items-center gap-2 rounded-md border bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="flex-1 text-left">Search documentation…</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-lg">
          <DialogTitle className="sr-only">Search documentation</DialogTitle>
          <div className="border-b px-3 py-2">
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
              <p className="px-2 py-6 text-center text-sm text-muted-foreground">No results.</p>
            ) : (
              results.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  className={cn(
                    "flex w-full items-center rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
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
        </DialogContent>
      </Dialog>
    </>
  )
}

export function MobileNavLink({
  href,
  children,
  onNavigate,
}: {
  href: string
  children: React.ReactNode
  onNavigate?: () => void
}) {
  return (
    <Link href={href} onClick={onNavigate} className="block py-1 text-sm">
      {children}
    </Link>
  )
}
