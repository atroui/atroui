"use client"

import * as React from "react"
import { Check, Copy, List } from "lucide-react"
import {
  pinDocsShell,
  scrollDocsToId,
} from "@/components/docs-scroll-lock"
import {
  collectDocHeadingsById,
  normalizeTocTitle,
  tocItemsKey,
  type TocItem,
} from "@/lib/docs-headings"
import { cn } from "@/lib/utils"

export type { TocItem }

/** Active TOC item from middle-column scroll (not the window). */
function useActiveHeading(items: TocItem[]) {
  const itemsKey = tocItemsKey(items)
  const [activeId, setActiveId] = React.useState<string | null>(
    items[0]?.id ?? null
  )
  const pinnedId = React.useRef<string | null>(null)
  const pinUntil = React.useRef(0)

  React.useEffect(() => {
    pinnedId.current = null
    pinUntil.current = 0
    setActiveId(items[0]?.id ?? null)
  }, [itemsKey]) // eslint-disable-line react-hooks/exhaustive-deps

  const selectId = React.useCallback((id: string) => {
    pinnedId.current = id
    // Ignore scroll events from scrollDocsToId for a short window.
    pinUntil.current = performance.now() + 120
    setActiveId(id)
  }, [])

  React.useEffect(() => {
    if (items.length === 0) return

    const scrollRoot =
      document.querySelector<HTMLElement>("[data-slot=docs-scroll]")
    if (!scrollRoot) return
    const pane = scrollRoot
    const ids = items.map((item) => item.id)

    let cancelled = false
    let raf = 0

    function readHeadings() {
      return ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el))
    }

    function sync(elements: HTMLElement[]) {
      if (cancelled || elements.length === 0) return

      // Active line ~45% down the pane so mid-page sections win on short pages
      // (heading tops often can't reach a tight top offset).
      const offset = Math.max(64, Math.round(pane.clientHeight * 0.45))
      const rootTop = pane.getBoundingClientRect().top
      let current = elements[0]?.id ?? null

      for (const el of elements) {
        const top = el.getBoundingClientRect().top - rootTop
        if (top <= offset) current = el.id
        else break
      }

      // User clicked a TOC link — keep highlight until they scroll again.
      if (pinnedId.current) {
        setActiveId((prev) =>
          prev === pinnedId.current ? prev : pinnedId.current
        )
        return
      }

      setActiveId((prev) => (prev === current ? prev : current))
    }

    function onScrollRaf() {
      if (performance.now() >= pinUntil.current) {
        pinnedId.current = null
      }
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => sync(readHeadings()))
    }

    let tries = 0
    const start = () => {
      if (cancelled) return
      const elements = readHeadings()
      if (elements.length === 0 && tries < 40) {
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
  }, [itemsKey]) // eslint-disable-line react-hooks/exhaustive-deps

  return { activeId, selectId }
}

function TocList({
  items,
  activeId,
  onNavigate,
  onSelect,
}: {
  items: TocItem[]
  activeId: string | null
  onNavigate?: () => void
  onSelect?: (id: string) => void
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
                event.preventDefault()
                onSelect?.(item.id)
                scrollDocsToId(item.id, "instant")
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
              {normalizeTocTitle(item.title)}
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
  const { activeId, selectId } = useActiveHeading(items)
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
            onSelect={selectId}
            onNavigate={() => setOpen(false)}
          />
        </div>
      ) : null}
    </div>
  )
}

export function DocsToc({ items }: { items: TocItem[] }) {
  const { activeId, selectId } = useActiveHeading(items)

  if (items.length === 0) return null

  return (
    <nav aria-label="On this page" className="px-4 py-6">
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">On this page</p>
        <TocList items={items} activeId={activeId} onSelect={selectId} />
      </div>
    </nav>
  )
}

/** Scan headings — desktop sticky list only (rail). */
export function DocsTocAuto({ rootId }: { rootId: string }) {
  const [items, setItems] = React.useState<TocItem[]>([])

  React.useLayoutEffect(() => {
    function scan() {
      setItems(collectDocHeadingsById(rootId))
    }
    scan()
    const root = document.getElementById(rootId)
    if (!root) return
    const mo = new MutationObserver(scan)
    mo.observe(root, { childList: true, subtree: true })
    return () => mo.disconnect()
  }, [rootId])

  return <DocsToc items={items} />
}

/** Scan headings — mobile dropdown for the main-column toolbar. */
export function DocsTocAutoMobile({ rootId }: { rootId: string }) {
  const [items, setItems] = React.useState<TocItem[]>([])

  React.useLayoutEffect(() => {
    function scan() {
      setItems(collectDocHeadingsById(rootId))
    }
    scan()
    const root = document.getElementById(rootId)
    if (!root) return
    const mo = new MutationObserver(scan)
    mo.observe(root, { childList: true, subtree: true })
    return () => mo.disconnect()
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
