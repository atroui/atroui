"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  type DocsTocHeading,
  isBoilerplateText,
  shouldShowDocsToc,
} from "@/lib/docs-toc"

type DocsTocContextValue = {
  setSeed: (items: DocsTocHeading[] | null) => void
  headings: DocsTocHeading[]
  active: string
  setActive: (id: string) => void
}

const DocsTocContext = React.createContext<DocsTocContextValue | null>(null)

/** Offset from viewport top that marks the “current” section. */
const SPY_OFFSET_PX = 96

function scanDomHeadings(): DocsTocHeading[] {
  const root = document.querySelector("[data-docs-content]")
  if (!root) return []
  const nodes = Array.from(root.querySelectorAll<HTMLElement>("h2, h3")).filter(
    (n) => !n.closest("[data-toc-skip]") && n.textContent?.trim() && n.id
  )

  return nodes.map((n) => {
    const text = n.textContent || ""
    return {
      id: n.id,
      text,
      level: (n.tagName === "H3" ? 3 : 2) as 2 | 3,
      boilerplate:
        n.hasAttribute("data-toc-boilerplate") || isBoilerplateText(text),
    }
  })
}

/**
 * Scroll-spy: active = last heading whose top has crossed the header line.
 * More reliable for docs than IntersectionObserver band math.
 */
function useActiveHeadings(
  headings: DocsTocHeading[],
  setActive: (id: string) => void
) {
  const headingKey = headings.map((h) => h.id).join("|")

  React.useEffect(() => {
    if (!headings.length) return

    const ids = headings.map((h) => h.id)

    const sync = () => {
      let current = ids[0] ?? ""
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= SPY_OFFSET_PX) current = id
      }
      if (current) setActive(current)
    }

    sync()
    window.addEventListener("scroll", sync, { passive: true })
    window.addEventListener("resize", sync, { passive: true })
    return () => {
      window.removeEventListener("scroll", sync)
      window.removeEventListener("resize", sync)
    }
  }, [headingKey, headings, setActive])
}

export function DocsTocProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [seed, setSeedState] = React.useState<DocsTocHeading[] | null>(null)
  const [scanned, setScanned] = React.useState<DocsTocHeading[]>([])
  const [active, setActive] = React.useState("")

  const setSeed = React.useCallback((items: DocsTocHeading[] | null) => {
    setSeedState(items)
  }, [])

  React.useEffect(() => {
    setSeedState(null)
    setScanned([])
    setActive("")
  }, [pathname])

  React.useEffect(() => {
    if (seed && seed.length > 0) return

    let cancelled = false
    const run = () => {
      if (cancelled) return
      setScanned(scanDomHeadings())
    }

    // Islands hydrate after first paint — scan until headings settle.
    run()
    const raf = requestAnimationFrame(() => {
      run()
      requestAnimationFrame(run)
    })
    const t1 = window.setTimeout(run, 120)
    const t2 = window.setTimeout(run, 400)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [pathname, seed])

  const headings = seed && seed.length > 0 ? seed : scanned
  useActiveHeadings(headings, setActive)

  const value = React.useMemo(
    () => ({ setSeed, headings, active, setActive }),
    [setSeed, headings, active]
  )

  return (
    <DocsTocContext.Provider value={value}>{children}</DocsTocContext.Provider>
  )
}

/** Seed TOC from Fumadocs `page.data.toc` when the MDX body has real headings. */
export function DocsTocSeed({ items }: { items: DocsTocHeading[] }) {
  const ctx = React.useContext(DocsTocContext)
  const setSeed = ctx?.setSeed
  const key = items.map((item) => `${item.id}:${item.level}`).join("|")

  React.useEffect(() => {
    if (!setSeed) return
    setSeed(items.length ? items : null)
    return () => setSeed(null)
  }, [setSeed, key, items])

  return null
}

function useDocsToc() {
  const ctx = React.useContext(DocsTocContext)
  if (!ctx) {
    throw new Error("DocsToc must be used within DocsTocProvider")
  }
  return ctx
}

function scrollToHeading(id: string, setActive: (id: string) => void) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
  history.replaceState(null, "", `#${id}`)
  setActive(id)
}

function TocLinkList({
  headings,
  active,
  onSelect,
  className,
}: {
  headings: DocsTocHeading[]
  active: string
  onSelect?: (id: string) => void
  className?: string
}) {
  const { setActive } = useDocsToc()
  return (
    <ul className={cn("docs-book-toc-list", className)}>
      {headings.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            data-depth={h.level}
            data-active={active === h.id ? "true" : undefined}
            className={cn(
              "docs-book-toc-link",
              h.level >= 3 && "docs-book-toc-link-nested",
              active === h.id && "docs-book-toc-link-active"
            )}
            onClick={(e) => {
              e.preventDefault()
              scrollToHeading(h.id, setActive)
              onSelect?.(h.id)
            }}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  )
}

/** Mid-breakpoint disclosure — gradual revelation when the rail is hidden. */
export function DocsTocMobile() {
  const { headings, active } = useDocsToc()
  const detailsRef = React.useRef<HTMLDetailsElement>(null)
  if (!shouldShowDocsToc(headings)) return null

  return (
    <div className="docs-book-toc-mobile">
      <details ref={detailsRef} className="docs-book-toc-disclosure">
        <summary className="docs-book-toc-disclosure-summary">
          <span>On this page</span>
          <ChevronDown
            aria-hidden
            className="docs-book-toc-disclosure-chevron size-3.5 shrink-0"
          />
        </summary>
        <TocLinkList
          headings={headings}
          active={active}
          className="docs-book-toc-disclosure-list"
          onSelect={() => {
            if (detailsRef.current) detailsRef.current.open = false
          }}
        />
      </details>
    </div>
  )
}

/**
 * xl+ right rail — always reserved so the measure keeps two walls.
 * Populates when the page has real headings; stays empty (not absent) otherwise.
 */
export function DocsTocRail() {
  const { headings, active } = useDocsToc()
  const show = shouldShowDocsToc(headings)

  return (
    <aside
      className="docs-book-toc"
      aria-label={show ? "On this page" : undefined}
      aria-hidden={show ? undefined : true}
    >
      <div className="docs-book-toc-sticky docs-scroll-quiet">
        {show ? (
          <nav className="docs-book-toc-nav">
            <p className="docs-book-nav-heading !px-0">On this page</p>
            <TocLinkList headings={headings} active={active} />
          </nav>
        ) : null}
      </div>
    </aside>
  )
}