"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import {
  startTransition,
  unstable_addTransitionType as addTransitionType,
} from "react"
import { usePathname, useRouter } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Search, X } from "lucide-react"
import posthog from "posthog-js"
import { cn } from "@/lib/utils"
import { badgeLabel, type NavItem } from "@/lib/navigation"
import { flattenPageTree } from "@/lib/docs-page-tree"
import { blogPosts } from "@/lib/blog"
import { useFocusTrap } from "@/lib/use-focus-trap"
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock"
import { dialogTween, fadeTween } from "@/lib/motion"
import { inferNavTypes } from "@/components/view-transitions"

type SearchGroup = "Site" | "Docs" | "Blog"

type SearchItem = NavItem & {
  group: SearchGroup
}

const siteItems: SearchItem[] = [
  {
    title: "Home",
    href: "/",
    description: "Landing",
    group: "Site",
  },
]

const docsItems: SearchItem[] = flattenPageTree()
  .filter((item) => item.href !== "/blog" && !item.href.startsWith("/blog/"))
  .map((item) => ({ ...item, group: "Docs" as const }))

const blogItems: SearchItem[] = [
  {
    title: "Blog",
    href: "/blog",
    description: "Guides & SEO",
    group: "Blog",
  },
  ...blogPosts.map((post) => ({
    title: post.title,
    href: `/blog/${post.slug}`,
    description: post.description,
    group: "Blog" as const,
  })),
]

const catalog: SearchItem[] = [...siteItems, ...docsItems, ...blogItems]

const GROUP_ORDER: SearchGroup[] = ["Site", "Docs", "Blog"]

function matchesQuery(item: SearchItem, q: string) {
  if (!q) return true
  return (
    item.title.toLowerCase().includes(q) ||
    item.description?.toLowerCase().includes(q) ||
    item.href.toLowerCase().includes(q)
  )
}

function SearchDialog({
  query,
  setQuery,
  results,
  onClose,
  onSelect,
  onLanding,
}: {
  query: string
  setQuery: (q: string) => void
  results: SearchItem[]
  onClose: () => void
  onSelect: (item: SearchItem) => void
  onLanding?: boolean
}) {
  const panelRef = React.useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  useFocusTrap(true, panelRef)

  const grouped = GROUP_ORDER.map((group) => ({
    group,
    items: results.filter((item) => item.group === group),
  })).filter((section) => section.items.length > 0)

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
        className={cn(
          "relative w-full max-w-lg overflow-hidden rounded-2xl border shadow-[0_24px_64px_-20px_color-mix(in_oklch,var(--color-brand)_35%,transparent)]",
          onLanding
            ? "border-white/10 bg-black"
            : "border-border-subtle bg-card"
        )}
        initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 6, scale: 0.98 }}
        transition={dialogTween}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={cn(
            "flex items-center gap-2 border-b px-3 py-2",
            onLanding ? "border-white/10" : "border-border-subtle"
          )}
        >
          <Search
            className={cn(
              "size-4",
              onLanding ? "text-neutral-500" : "text-muted-foreground"
            )}
            aria-hidden
          />
          <input
            autoFocus
            placeholder="Search components…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={cn(
              "h-10 flex-1 bg-transparent text-sm outline-none",
              onLanding
                ? "text-white placeholder:text-neutral-500"
                : "text-foreground placeholder:text-muted-foreground"
            )}
          />
          <button
            type="button"
            onClick={onClose}
            className={cn(
              "inline-flex size-8 items-center justify-center rounded-lg border transition-colors",
              onLanding
                ? "border-white/15 text-neutral-400 hover:bg-white/5 hover:text-white"
                : "border-border-subtle text-muted-foreground hover:bg-white/5 hover:text-foreground"
            )}
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="max-h-72 overflow-y-auto p-1.5">
          {grouped.length === 0 ? (
            <p
              className={cn(
                "px-2 py-8 text-center text-sm",
                onLanding ? "text-neutral-500" : "text-muted-foreground"
              )}
            >
              No results.
            </p>
          ) : (
            grouped.map((section) => (
              <div key={section.group} className="mb-1.5 last:mb-0">
                <p
                  className={cn(
                    "px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide",
                    onLanding ? "text-neutral-500" : "text-muted-foreground"
                  )}
                >
                  {section.group}
                </p>
                {section.items.map((item) => (
                  <button
                    key={item.href}
                    type="button"
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-white/5",
                      onLanding ? "text-white" : "text-foreground"
                    )}
                    onClick={() => onSelect(item)}
                  >
                    <span className="min-w-0">
                      <span className="block truncate">{item.title}</span>
                      {item.description ? (
                        <span
                          className={cn(
                            "mt-0.5 block truncate text-[12px] font-normal",
                            onLanding
                              ? "text-neutral-400"
                              : "text-muted-foreground"
                          )}
                        >
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
                            : onLanding
                              ? "text-neutral-500"
                              : "text-muted-foreground"
                        )}
                      >
                        {badgeLabel[item.badge]}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function CommandMenu({
  compact,
  onLanding,
}: {
  compact?: boolean
  onLanding?: boolean
}) {
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
  const results = catalog.filter((item) => matchesQuery(item, q))

  return (
    <>
      {compact ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Search documentation"
          aria-haspopup="dialog"
          aria-expanded={open}
          className={cn(
            "inline-flex size-9 items-center justify-center rounded-lg border",
            onLanding
              ? "border-white/15 bg-white/4 text-white"
              : "border-border-subtle bg-white/5 text-foreground"
          )}
        >
          <Search className="size-4" aria-hidden />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className={cn(
            "inline-flex h-9 w-full max-w-[min(220px,40vw)] items-center gap-2 rounded-lg border px-3 text-[13px] transition-colors",
            onLanding
              ? "border-white/15 bg-white/4 text-white/55 hover:bg-white/8 hover:text-white"
              : "border-border-subtle bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
          )}
        >
          <Search className="size-3.5 shrink-0" aria-hidden />
          <span className="flex-1 text-left">Search…</span>
          <kbd
            className={cn(
              "pointer-events-none hidden h-5 select-none items-center rounded-lg border px-1.5 font-mono text-[10px] font-medium sm:inline-flex",
              onLanding
                ? "border-white/15 bg-white/6 text-white/50"
                : "border-border-subtle bg-muted text-muted-foreground"
            )}
          >
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
                      result_type: item.badge ?? item.group.toLowerCase(),
                    })
                    setOpen(false)
                    const types = inferNavTypes(pathname, item.href)
                    startTransition(() => {
                      for (const t of types) addTransitionType(t)
                      router.push(item.href)
                    })
                  }}
                  onLanding={onLanding}
                />
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </>
  )
}
