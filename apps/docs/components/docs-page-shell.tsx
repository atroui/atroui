"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { DocsTocPublisher } from "@/components/docs-chrome"
import {
  DocsCopyPage,
  DocsTocAutoMobile,
  DocsTocDropdown,
  type TocItem,
} from "@/components/docs-toc"

type DocsPageShellProps = {
  children: React.ReactNode
  toc?: TocItem[]
  autoTocRootId?: string
  wide?: boolean
  className?: string
  copyPage?: {
    title: string
    description?: string
    installCommand?: string
    url?: string
  }
}

function headingsFromRoot(rootId: string): TocItem[] {
  const root = document.getElementById(rootId)
  if (!root) return []
  const next: TocItem[] = []
  root.querySelectorAll("h2[id], h3[id]").forEach((node) => {
    const el = node as HTMLElement
    if (!el.id) return
    next.push({
      id: el.id,
      title: el.textContent?.trim() ?? el.id,
      depth: el.tagName === "H3" ? 3 : 2,
    })
  })
  return next
}

function AutoTocPublisher({ rootId }: { rootId: string }) {
  const [items, setItems] = React.useState<TocItem[]>([])

  React.useLayoutEffect(() => {
    setItems(headingsFromRoot(rootId))
    // Headings can appear after suspense; one frame follow-up is enough.
    const t = window.setTimeout(() => {
      setItems(headingsFromRoot(rootId))
    }, 0)
    return () => window.clearTimeout(t)
  }, [rootId])

  return <DocsTocPublisher items={items} />
}

/**
 * Article measure + publishes TOC to the layout right rail.
 * Scroll is owned by `[data-slot=docs-scroll]` in DocsLayoutShell.
 */
export function DocsPageShell({
  children,
  toc,
  autoTocRootId,
  wide,
  className,
  copyPage,
}: DocsPageShellProps) {
  const showToc = Boolean(toc?.length || autoTocRootId)

  // Stabilize explicit toc reference for the publisher.
  const tocKey = toc?.map((t) => t.id).join("|") ?? ""
  const stableToc = React.useMemo(() => toc ?? [], [tocKey]) // eslint-disable-line react-hooks/exhaustive-deps

  const toolbar =
    copyPage || showToc ? (
      <div className="mb-4 flex flex-wrap items-center gap-2 xl:mb-6">
        {stableToc.length > 0 ? <DocsTocDropdown items={stableToc} /> : null}
        {autoTocRootId ? <DocsTocAutoMobile rootId={autoTocRootId} /> : null}
        {copyPage ? <DocsCopyPage {...copyPage} /> : null}
      </div>
    ) : null

  return (
    <div
      className={cn(
        "mx-auto w-full",
        wide ? "max-w-6xl" : "max-w-3xl",
        className
      )}
    >
      {stableToc.length > 0 ? <DocsTocPublisher items={stableToc} /> : null}
      {autoTocRootId ? <AutoTocPublisher rootId={autoTocRootId} /> : null}
      {toolbar}
      {children}
    </div>
  )
}
