"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { usePathname, useRouter } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { badgeLabel, allNavItems } from "@/lib/navigation"
import { useFocusTrap } from "@/lib/use-focus-trap"
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock"
import { dialogTween, fadeTween } from "@/lib/motion"

function SearchDialog({
  query,
  setQuery,
  results,
  onClose,
  onSelect,
}: {
  query: string
  setQuery: (q: string) => void
  results: typeof allNavItems
  onClose: () => void
  onSelect: (href: string) => void
}) {
  const panelRef = React.useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  useFocusTrap(true, panelRef)

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[12vh]"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={fadeTween}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search documentation"
        tabIndex={-1}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border-subtle bg-card shadow-[0_24px_64px_-20px_color-mix(in_oklch,var(--color-brand)_35%,transparent)]"
        initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 6, scale: 0.98 }}
        transition={dialogTween}
        onClick={(e) => e.stopPropagation()}
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
            onClick={onClose}
            className="inline-flex size-8 items-center justify-center rounded-full border border-border-subtle text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
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
                  "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-white/5"
                )}
                onClick={() => onSelect(item.href)}
              >
                <span className="min-w-0">
                  <span className="block truncate">{item.title}</span>
                  {item.description ? (
                    <span className="mt-0.5 block truncate text-[12px] font-normal text-muted-foreground">
                      {item.description}
                    </span>
                  ) : null}
                </span>
                {item.badge ? (
                  <span
                    className={cn(
                      "ds-sketch shrink-0 text-[13px]",
                      item.badge === "host-api" || item.badge === "registry"
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
      </motion.div>
    </motion.div>
  )
}

export function CommandMenu({ compact }: { compact?: boolean }) {
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const router = useRouter()
  const pathname = usePathname()

  React.useEffect(() => {
    setMounted(true)
  }, [])

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

  useBodyScrollLock(open)

  const q = query.toLowerCase().trim()
  const results = allNavItems.filter((item) => {
    if (!q) return true
    return (
      item.title.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.href.toLowerCase().includes(q)
    )
  })

  return (
    <>
      {compact ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Search documentation"
          aria-haspopup="dialog"
          aria-expanded={open}
          className="inline-flex size-9 items-center justify-center rounded-full border border-border-subtle bg-white/5 text-foreground"
        >
          <Search className="size-4" aria-hidden />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="inline-flex h-9 w-full max-w-[min(220px,40vw)] items-center gap-2 rounded-full border border-border-subtle bg-white/5 px-3 text-[13px] text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
        >
          <Search className="size-3.5 shrink-0" aria-hidden />
          <span className="flex-1 text-left">Search…</span>
          <kbd className="pointer-events-none hidden h-5 select-none items-center rounded-full border border-border-subtle bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex">
            ⌘K
          </kbd>
        </button>
      )}
      {mounted
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <SearchDialog
                  key="cmdk"
                  query={query}
                  setQuery={setQuery}
                  results={results}
                  onClose={() => setOpen(false)}
                  onSelect={(href) => {
                    setOpen(false)
                    router.push(href)
                  }}
                />
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </>
  )
}
