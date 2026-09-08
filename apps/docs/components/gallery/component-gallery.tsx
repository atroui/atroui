"use client"

import * as React from "react"
import Link from "next/link"
import { Search, X } from "lucide-react"
import {
  badgeLabel,
  catalogSections,
  toolApps,
  type NavItem,
} from "@/lib/navigation"
import { cn } from "@/lib/utils"

type Entry = {
  category: string
  item: NavItem
}

const allEntries: Entry[] = catalogSections.flatMap((section) =>
  section.items.map((item) => ({ category: section.title, item }))
)

const categories = ["All", ...catalogSections.map((s) => s.title)]

function KitBadge({ badge }: { badge: NonNullable<NavItem["badge"]> }) {
  return (
    <span
      className={cn(
        "docs-book-badge",
        badge === "host-api" || badge === "registry"
          ? "docs-book-badge-accent"
          : undefined
      )}
    >
      {badgeLabel[badge]}
    </span>
  )
}

export function ComponentGallery() {
  const [active, setActive] = React.useState("All")
  const [query, setQuery] = React.useState("")

  React.useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("category")
    if (param && categories.includes(param)) setActive(param)
  }, [])

  function setCategory(category: string) {
    setActive(category)
    const url = new URL(window.location.href)
    if (category === "All") url.searchParams.delete("category")
    else url.searchParams.set("category", category)
    window.history.replaceState({}, "", url.pathname + url.search)
  }

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return allEntries.filter(({ category, item }) => {
      if (active !== "All" && category !== active) return false
      if (!q) return true
      return (
        item.title.toLowerCase().includes(q) ||
        (item.description?.toLowerCase().includes(q) ?? false) ||
        category.toLowerCase().includes(q)
      )
    })
  }, [active, query])

  const byChapter = React.useMemo(() => {
    return catalogSections
      .map((section) => ({
        title: section.title,
        items: filtered
          .filter((e) => e.category === section.title)
          .map((e) => e.item),
      }))
      .filter((chapter) => chapter.items.length > 0)
  }, [filtered])

  return (
    <div className="docs-catalog">
      <div className="docs-catalog-toolbar">
        <div className="docs-catalog-search">
          <Search
            className="docs-catalog-search-icon"
            aria-hidden
            size={16}
            strokeWidth={1.75}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the catalog…"
            aria-label="Search the catalog"
            className="docs-catalog-search-input"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="docs-catalog-search-clear"
            >
              <X size={16} aria-hidden strokeWidth={1.75} />
            </button>
          ) : null}
        </div>

        <div
          role="tablist"
          aria-label="Filter by family"
          className="docs-catalog-tabs"
        >
          {categories.map((category) => {
            const selected = active === category
            const count =
              category === "All"
                ? allEntries.length
                : (catalogSections.find((s) => s.title === category)?.items
                    .length ?? 0)
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setCategory(category)}
                className={cn(
                  "docs-catalog-tab",
                  selected && "docs-catalog-tab-active"
                )}
              >
                {category}
                <span className="docs-catalog-tab-count">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="docs-catalog-empty" role="status">
          <p className="docs-hub-title">No matches</p>
          <p className="docs-hub-meta">
            Nothing for “{query || active}”. Clear search or pick another family.
          </p>
        </div>
      ) : (
        <div className="docs-catalog-chapters">
          {byChapter.map((chapter) => (
            <section
              key={chapter.title}
              className="docs-catalog-chapter"
              aria-labelledby={`catalog-${chapter.title}`}
            >
              <header className="docs-catalog-chapter-head">
                <h2
                  id={`catalog-${chapter.title}`}
                  className="docs-catalog-chapter-title"
                >
                  {chapter.title}
                </h2>
                <span className="docs-catalog-chapter-count">
                  {chapter.items.length}
                </span>
              </header>
              <ul className="docs-kit-list">
                {chapter.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="docs-kit-row docs-catalog-row">
                      <span className="docs-kit-row-head">
                        <span className="docs-hub-title">{item.title}</span>
                        {item.badge ? <KitBadge badge={item.badge} /> : null}
                      </span>
                      {item.description ? (
                        <span className="docs-hub-meta">{item.description}</span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      <aside className="docs-catalog-tools" aria-label="Live tools">
        <p className="docs-catalog-tools-stamp">Live tools</p>
        <ul className="docs-kit-list">
          {toolApps.map((app) => (
            <li key={app.href}>
              <Link href={app.href} className="docs-kit-row docs-catalog-row">
                <span className="docs-kit-row-head">
                  <span className="docs-hub-title">{app.title}</span>
                  <span className="docs-book-badge docs-book-badge-accent">
                    App
                  </span>
                </span>
                <span className="docs-hub-meta">{app.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
