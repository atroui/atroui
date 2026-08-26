"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import {
  catalog,
  catalogSections,
  FAMILY_PARAM,
  matchesQuery,
} from "@/lib/catalog"
import { Plate } from "@/components/catalog/plate"

/**
 * Card wall — the /components layout: search, family chips, equal preview cards.
 */
export function Gallery({
  id = "catalog",
  syncUrl = false,
}: {
  id?: string
  /** Keep `?family=` in the address bar so header/family cards are real links. */
  syncUrl?: boolean
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const familyFromUrl = searchParams.get(FAMILY_PARAM)
  const urlSection =
    familyFromUrl && catalogSections.includes(familyFromUrl) ? familyFromUrl : null

  const [query, setQuery] = React.useState("")
  const [section, setSection] = React.useState<string | null>(urlSection)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (syncUrl) setSection(urlSection)
  }, [syncUrl, urlSection])

  function setFamily(next: string | null) {
    setSection(next)
    if (!syncUrl) return
    const params = new URLSearchParams(searchParams.toString())
    if (next) params.set(FAMILY_PARAM, next)
    else params.delete(FAMILY_PARAM)
    const qs = params.toString()
    router.replace(qs ? `?${qs}` : "?", { scroll: false })
  }

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "/" || event.metaKey || event.ctrlKey) return
      const target = event.target as HTMLElement | null
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return
      }
      event.preventDefault()
      inputRef.current?.focus()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const results = React.useMemo(
    () =>
      catalog.filter(
        (entry) => matchesQuery(entry, query) && (!section || entry.section === section)
      ),
    [query, section]
  )

  const filtered = Boolean(query || section)

  function reset() {
    setQuery("")
    setFamily(null)
  }

  return (
    <section id={id} aria-label="Component catalog" className="scroll-mt-20">
      <div className="sticky top-12 z-20 -mx-3 mb-6 border-b border-[var(--line)] bg-background/85 px-3 py-3 backdrop-blur-md min-[1200px]:top-0">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <div className="relative w-full max-w-md">
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Search ${catalog.length} components…`}
                aria-label="Search components"
                className="spec-field"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="size-4" aria-hidden />
                </button>
              ) : null}
            </div>

            <span className="spec-num ml-auto shrink-0" aria-live="polite">
              {results.length} / {catalog.length}
            </span>
          </div>

          <div className="-mx-3 flex items-center gap-2 overflow-x-auto px-3 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              className="spec-chip"
              aria-pressed={!section}
              onClick={() => setFamily(null)}
            >
              All
            </button>
            {catalogSections.map((name) => (
              <button
                key={name}
                type="button"
                className="spec-chip"
                aria-pressed={section === name}
                onClick={() => setFamily(section === name ? null : name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <p className="text-lg font-medium tracking-[-0.03em] text-foreground">
            Nothing matches
          </p>
          <p className="max-w-sm text-[15px] text-muted-foreground">
            No component answers “{query}”. Try a job instead of a name — forms,
            hero, pricing, OG.
          </p>
          <button type="button" onClick={reset} className="spec-btn-ghost">
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((entry, index) => (
            <li key={entry.href} className="min-w-0">
              <Plate entry={entry} priority={index < 6 && !filtered} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
