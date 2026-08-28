"use client"

import * as React from "react"
import { Check, Copy, List } from "lucide-react"
import {
  pinDocsShell,
  scrollDocsToId,
} from "@/components/docs-scroll-lock"
import { cn } from "@/lib/utils"

export type TocItem = {
  id: string
  title: string
  depth?: 2 | 3
}

/** Active TOC item from middle-column scroll (not the window). */
function useActiveHeading(items: TocItem[]) {
  const [activeId, setActiveId] = React.useState<string | null>(
    items[0]?.id ?? null
  )

  React.useEffect(() => {
    setActiveId(items[0]?.id ?? null)
  }, [items])

  React.useEffect(() => {
    if (items.length === 0) return

    const scrollRoot =
      document.querySelector<HTMLElement>("[data-slot=docs-scroll]")
    if (!scrollRoot) return
    const pane = scrollRoot

    // Heading whose top has crossed a line near the top of the scroll pane.
    const OFFSET_PX = 28
    let cancelled = false
    let raf = 0

    function readHeadings() {
      return items
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => Boolean(el))
    }

    function sync(elements: HTMLElement[]) {
      if (cancelled || elements.length === 0) return
      const rootTop = pane.getBoundingClientRect().top
      let current = elements[0]?.id ?? null

      for (const el of elements) {
        const top = el.getBoundingClientRect().top - rootTop
        if (top <= OFFSET_PX) current = el.id
        else break
      }

      setActiveId((prev) => (prev === current ? prev : current))
    }

    function onScroll() {
      sync(readHeadings())
    }

    function onScrollRaf() {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(onScroll)
    }

    // Headings may mount a frame after the TOC rail (route transition).
    let tries = 0
    const start = () => {
      if (cancelled) return
      const elements = readHeadings()
      if (elements.length === 0 && tries < 30) {
        tries += 1
        raf = requestAnimationFrame(start)
        return
      }
      sync(elements)
      pane.addEventListener("scroll", onScrollRaf, { passive: true })
      window.addEventListener("resize", onScrollRaf)
    }

    start()

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      pane.removeEventListener("scroll", onScrollRaf)
      window.removeEventListener("resize", onScrollRaf)
    }
  }, [items])

  return activeId
}

function TocList({
  items,
  activeId,
  onNavigate,
}: {
  items: TocItem[]
  activeId: string | null
  onNavigate?: () => void
}) {
  return (
    <ul className="space-y-2 border-l border-border-subtle text-[13px]">
      {items.map((item) => {
        const active = item.id === activeId
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(event) => {
                // Shell hash router also handles this; preventDefault here so
                // the document never jumps before the bubble listener runs.
                event.preventDefault()
                scrollDocsToId(item.id)
                pinDocsShell()
                history.replaceState(null, "", `#${item.id}`)
                onNavigate?.()
              }}
              className={cn(
                "block border-l py-0.5 pl-3 transition-colors hover:text-foreground",
                item.depth === 3 && "pl-5",
                active
                  ? "border-brand text-foreground"
                  : "border-transparent text-muted-foreground"
              )}
              aria-current={active ? "location" : undefined}
            >
              {item.title}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

/** Mobile dropdown — shadcn DocsTableOfContents variant="dropdown". */
export function DocsTocDropdown({ items }: { items: TocItem[] }) {
  const [open, setOpen] = React.useState(false)
  const activeId = useActiveHeading(items)
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onPointer)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onPointer)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  if (items.length === 0) return null

  return (
    <div ref={rootRef} className="relative xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex h-8 items-center gap-2 rounded-lg border border-border-subtle bg-white/5 px-3 text-[13px] font-medium text-foreground"
      >
        <List className="size-3.5" aria-hidden />
        On this page
      </button>
      {open ? (
        <div className="absolute top-full left-0 z-40 mt-2 max-h-[70svh] w-[min(18rem,calc(100vw-2rem))] overflow-y-auto rounded-xl border border-border-subtle bg-background p-3 shadow-lg">
          <TocList
            items={items}
            activeId={activeId}
            onNavigate={() => setOpen(false)}
          />
        </div>
      ) : null}
    </div>
  )
}

export function DocsToc({ items }: { items: TocItem[] }) {
  const activeId = useActiveHeading(items)

  if (items.length === 0) return null

  return (
    <nav aria-label="On this page" className="px-4 py-6">
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">On this page</p>
        <TocList items={items} activeId={activeId} />
      </div>
    </nav>
  )
}

/** Scan headings — desktop sticky list only (rail). */
export function DocsTocAuto({ rootId }: { rootId: string }) {
  const [items, setItems] = React.useState<TocItem[]>([])

  React.useEffect(() => {
    const root = document.getElementById(rootId)
    if (!root) return

    const headings = root.querySelectorAll("h2[id], h3[id]")
    const next: TocItem[] = []

    headings.forEach((node) => {
      const el = node as HTMLElement
      if (!el.id) return
      next.push({
        id: el.id,
        title: el.textContent?.trim() ?? el.id,
        depth: el.tagName === "H3" ? 3 : 2,
      })
    })

    setItems(next)
  }, [rootId])

  return <DocsToc items={items} />
}

/** Scan headings — mobile dropdown for the main-column toolbar. */
export function DocsTocAutoMobile({ rootId }: { rootId: string }) {
  const [items, setItems] = React.useState<TocItem[]>([])

  React.useEffect(() => {
    const root = document.getElementById(rootId)
    if (!root) return

    const headings = root.querySelectorAll("h2[id], h3[id]")
    const next: TocItem[] = []

    headings.forEach((node) => {
      const el = node as HTMLElement
      if (!el.id) return
      next.push({
        id: el.id,
        title: el.textContent?.trim() ?? el.id,
        depth: el.tagName === "H3" ? 3 : 2,
      })
    })

    setItems(next)
  }, [rootId])

  return <DocsTocDropdown items={items} />
}

/** Copy page markdown/snippet — shadcn DocsCopyPage affordance. */
export function DocsCopyPage({
  title,
  description,
  installCommand,
  url,
}: {
  title: string
  description?: string
  installCommand?: string
  url?: string
}) {
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    const parts = [
      `# ${title}`,
      description ? `\n${description}` : "",
      installCommand ? `\n\n\`\`\`bash\n${installCommand}\n\`\`\`` : "",
      url ? `\n\n${url}` : "",
    ]
    try {
      await navigator.clipboard.writeText(parts.join("").trim() + "\n")
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border-subtle bg-white/5 px-2.5 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
      aria-label={copied ? "Copied" : "Copy page"}
    >
      {copied ? (
        <Check className="size-3.5 text-brand" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
      <span className="hidden sm:inline">{copied ? "Copied" : "Copy page"}</span>
    </button>
  )
}
