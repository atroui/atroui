"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { usePathname, useRouter } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Search, X } from "lucide-react"
import posthog from "posthog-js"
import { cn } from "@/lib/utils"
import { badgeLabel, allNavItems, type NavItem } from "@/lib/navigation"
import { useFocusTrap } from "@/lib/use-focus-trap"
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock"
import { dialogTween, fadeTween } from "@/lib/motion"

type SearchHit = NavItem & { source?: "nav" | "mdx" }

type FumaHit = {
  id: string
  url: string
  type: "page" | "heading" | "text"
  content: string
}

function SearchDialog({
  query,
  setQuery,
  results,
  onClose,
  onSelect,
}: {
  query: string
  setQuery: (q: string) => void
  results: SearchHit[]
  onClose: () => void
  onSelect: (item: SearchHit) => void
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
        className="relative w-full max-w-lg overflow-hidden rounded-[var(--atro-panel-radius)] border border-border-subtle bg-card shadow-[0_24px_48px_-24px_rgba(0,0,0,0.65)]"
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
            placeholder="Search docs…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10 flex-1 bg-transparent text-sm text-foreground caret-brand outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-8 items-center justify-center rounded-[var(--atro-control-radius)] border border-border-subtle text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="max-h-72 overflow-y-auto p-1.5">
          {results.length === 0 ? (
            <motion.p
              className="px-2 py-8 text-center font-mono text-[12px] tracking-wide text-muted-foreground/70"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={fadeTween}
            >
              Nothing matches. Try a shorter word.
            </motion.p>
          ) : (
            results.map((item) => (
              <button
                key={`${item.source ?? "nav"}:${item.href}`}
                type="button"
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-[var(--atro-control-radius)] px-3 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-white/5"
                )}
                onClick={() => onSelect(item)}
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

function mergeSearchResults(
  navHits: SearchHit[],
  fumaHits: FumaHit[]
): SearchHit[] {
  const seen = new Set(navHits.map((h) => h.href))
  const extras: SearchHit[] = []
  for (const hit of fumaHits) {
    if (hit.type !== "page" && hit.type !== "heading") continue
    const href = hit.url.split("#")[0] ?? hit.url
    if (!href || seen.has(href)) continue
    seen.add(href)
    extras.push({
      title: hit.content,
      href,
      description: hit.type === "heading" ? "In guides" : undefined,
      source: "mdx",
    })
  }
  return [...navHits, ...extras].slice(0, 24)
}

export function CommandMenu({ compact }: { compact?: boolean }) {
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [fumaHits, setFumaHits] = React.useState<FumaHit[]>([])
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

  React.useEffect(() => {
    const q = query.trim()
    if (!open || q.length < 2) {
      setFumaHits([])
      return
    }
    const controller = new AbortController()
    const timer = window.setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?query=${encodeURIComponent(q)}`,
          { signal: controller.signal }
        )
        if (!res.ok) return
        const data = (await res.json()) as FumaHit[]
        setFumaHits(Array.isArray(data) ? data : [])
      } catch {
        /* abort or network — keep nav hits */
      }
    }, 180)
    return () => {
      controller.abort()
      window.clearTimeout(timer)
    }
  }, [query, open])

  useBodyScrollLock(open)

  const q = query.toLowerCase().trim()
  const navHits: SearchHit[] = allNavItems
    .filter((item) => {
      if (!q) return true
      return (
        item.title.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.href.toLowerCase().includes(q)
      )
    })
    .map((item) => ({ ...item, source: "nav" as const }))

  const results = q ? mergeSearchResults(navHits, fumaHits) : navHits

  return (
    <>
      {compact ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Search documentation"
          aria-haspopup="dialog"
          aria-expanded={open}
          className="atro-site-icon-btn border border-border-subtle bg-transparent text-foreground"
        >
          <Search className="size-3.5" aria-hidden />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="inline-flex h-8 w-full min-w-[10rem] items-center gap-2 rounded-[var(--atro-control-radius)] border border-border-subtle bg-transparent px-2.5 text-[12px] text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
        >
          <Search className="size-3.5 shrink-0" aria-hidden />
          <span className="min-w-0 flex-1 truncate text-left">Search docs…</span>
          <kbd className="pointer-events-none hidden h-5 select-none items-center rounded-[0.25rem] border border-border-subtle px-1 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex">
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
                  onSelect={(item) => {
                    posthog.capture("documentation_search_result_selected", {
                      destination: item.href,
                      result_type: item.badge ?? item.source ?? "page",
                    })
                    setOpen(false)
                    router.push(item.href)
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
