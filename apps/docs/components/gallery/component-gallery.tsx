"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import { navigation } from "@/lib/navigation"
import { PreviewCard } from "@/components/gallery/preview-card"
import { cn } from "@/lib/utils"

const sections = navigation.filter((s) => s.title !== "Getting Started")

type Entry = { category: string; item: (typeof sections)[number]["items"][number] }

const allEntries: Entry[] = sections.flatMap((section) =>
  section.items.map((item) => ({ category: section.title, item }))
)

const categories = ["All", ...sections.map((s) => s.title)]

export function ComponentGallery() {
  const [active, setActive] = React.useState("All")
  const [query, setQuery] = React.useState("")

  React.useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("category")
    if (param && categories.includes(param)) setActive(param)
  }, [])

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return allEntries.filter(({ category, item }) => {
      if (active !== "All" && category !== active) return false
      if (!q) return true
      return (
        item.title.toLowerCase().includes(q) ||
        (item.description?.toLowerCase().includes(q) ?? false)
      )
    })
  }, [active, query])

  return (
    <div className="space-y-6">
      <div className="sticky top-16 z-30 -mx-4 border-b border-border-subtle bg-background/80 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative w-full lg:max-w-xs">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search components…"
              aria-label="Search components"
              className="h-10 w-full rounded-lg border border-border-subtle bg-white/[0.03] pl-9 pr-9 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-brand/50"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-4" aria-hidden />
              </button>
            ) : null}
          </div>

          <div
            role="tablist"
            aria-label="Filter by category"
            className="flex flex-1 gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category) => {
              const selected = active === category
              const count =
                category === "All"
                  ? allEntries.length
                  : sections.find((s) => s.title === category)?.items.length ?? 0
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(category)}
                  className={cn(
                    "inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-colors",
                    selected
                      ? "border-brand/40 bg-brand/10 text-foreground"
                      : "border-transparent text-muted-foreground hover:bg-white/[0.05] hover:text-foreground"
                  )}
                >
                  {category}
                  <span
                    className={cn(
                      "font-mono text-[11px]",
                      selected ? "text-brand" : "text-muted-foreground/60"
                    )}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-border-subtle bg-white/[0.02] px-6 py-16 text-center">
          <p className="ds-sketch text-xl text-foreground">No matches</p>
          <p className="ds-meta mt-1">
            Nothing for “{query}”. Try a different term or clear the filter.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map(({ item }) => (
            <li key={item.href}>
              <PreviewCard item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
