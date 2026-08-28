export type TocItem = {
  id: string
  title: string
  depth?: 2 | 3
}

/** Kebab slug for heading text → id. */
export function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

/**
 * Collect h2/h3 under a root. Assigns missing ids so TOC links + scroll
 * tracking work for JSX MDX (rehype-slug only covers markdown headings).
 */
export function collectDocHeadings(root: ParentNode | null): TocItem[] {
  if (!root) return []

  const used = new Set<string>()
  const items: TocItem[] = []

  root.querySelectorAll("h2, h3").forEach((node) => {
    const el = node as HTMLElement
    // Skip headings inside previews / nested demos.
    if (el.closest("[data-slot=docs-preview], .catalog-frame, [data-toc-ignore]")) {
      return
    }

    const title = el.textContent?.trim() ?? ""
    if (!title) return

    let id = el.id
    if (!id) {
      const base = slugifyHeading(title) || "section"
      id = base
      let n = 2
      while (used.has(id) || document.getElementById(id)) {
        id = `${base}-${n}`
        n += 1
      }
      el.id = id
    }

    used.add(id)
    if (!el.classList.contains("scroll-mt-[calc(var(--header-height,3.5rem)+0.75rem)]")) {
      el.style.scrollMarginTop = "calc(var(--header-height, 3.5rem) + 0.75rem)"
    }

    items.push({
      id,
      title,
      depth: el.tagName === "H3" ? 3 : 2,
    })
  })

  return items
}

export function collectDocHeadingsById(rootId: string): TocItem[] {
  return collectDocHeadings(document.getElementById(rootId))
}

export function tocItemsKey(items: TocItem[]): string {
  return items.map((t) => `${t.id}:${t.depth ?? 2}`).join("|")
}

/** Plain text for TOC labels — autolink wrap/MDX can pass anchor elements. */
export function normalizeTocTitle(title: unknown): string {
  if (typeof title === "string") return title.trim()
  if (title == null) return ""
  if (typeof title === "number" || typeof title === "boolean") return String(title)
  if (Array.isArray(title)) return title.map(normalizeTocTitle).join("").trim()
  if (typeof title === "object" && title !== null && "props" in title) {
    const el = title as { props?: { children?: unknown } }
    return normalizeTocTitle(el.props?.children)
  }
  return String(title).trim()
}
