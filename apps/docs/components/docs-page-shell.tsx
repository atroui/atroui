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
import {
  collectDocHeadingsById,
  tocItemsKey,
} from "@/lib/docs-headings"

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

function AutoTocPublisher({ rootId }: { rootId: string }) {
  const [items, setItems] = React.useState<TocItem[]>([])

  React.useLayoutEffect(() => {
    function scan() {
      const next = collectDocHeadingsById(rootId)
      setItems((prev) => (tocItemsKey(prev) === tocItemsKey(next) ? prev : next))
    }

    scan()
    // MDX / suspense may land headings a tick later.
    const t0 = window.setTimeout(scan, 0)
    const t1 = window.setTimeout(scan, 100)

    const root = document.getElementById(rootId)
    let mo: MutationObserver | null = null
    if (root) {
      mo = new MutationObserver(scan)
      mo.observe(root, { childList: true, subtree: true })
    }

    return () => {
      window.clearTimeout(t0)
      window.clearTimeout(t1)
      mo?.disconnect()
    }
  }, [rootId])

  return <DocsTocPublisher items={items} />
}

/**
 * Article measure + publishes TOC to the layout right rail.
 * Scroll is owned by `[data-slot=docs-scroll]` in DocsLayoutShell.
 * Width lives here once — children should not re-apply max-w-3xl.
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
