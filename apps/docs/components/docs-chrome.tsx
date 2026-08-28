"use client"

import * as React from "react"
import type { TocItem } from "@/components/docs-toc"

type DocsChromeValue = {
  toc: TocItem[]
  setToc: (items: TocItem[]) => void
}

const DocsChromeContext = React.createContext<DocsChromeValue | null>(null)

export function DocsChromeProvider({ children }: { children: React.ReactNode }) {
  const [toc, setTocState] = React.useState<TocItem[]>([])
  // Stable setter — must NOT change when toc updates (avoids publisher loops).
  const setToc = React.useCallback((items: TocItem[]) => {
    setTocState((prev) => {
      if (
        prev.length === items.length &&
        prev.every(
          (p, i) =>
            p.id === items[i]?.id &&
            p.title === items[i]?.title &&
            p.depth === items[i]?.depth
        )
      ) {
        return prev
      }
      return items
    })
  }, [])

  const value = React.useMemo(() => ({ toc, setToc }), [toc, setToc])

  return (
    <DocsChromeContext.Provider value={value}>
      {children}
    </DocsChromeContext.Provider>
  )
}

export function useDocsChrome() {
  return React.useContext(DocsChromeContext)
}

/**
 * Publish TOC into the right rail.
 * Uses layout effect so the rail updates before paint.
 * Does not clear on unmount — pathname reset in the shell owns that
 * (avoids empty-flash during view transitions).
 */
export function DocsTocPublisher({ items }: { items: TocItem[] }) {
  const setToc = useDocsChrome()?.setToc

  React.useLayoutEffect(() => {
    setToc?.(items)
  }, [items, setToc])

  return null
}
