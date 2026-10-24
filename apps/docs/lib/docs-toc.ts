import type { ReactNode } from "react"

export type DocsTocHeading = {
  id: string
  text: string
  level: 2 | 3 | 4
  boilerplate: boolean
}

/**
 * Scaffolding every component page repeats. A TOC listing only these is a
 * table of contents for the template, not for the page.
 */
export const BOILERPLATE_HEADINGS = new Set([
  "preview",
  "installation",
  "usage",
  "api reference",
  "faq",
  "related",
  "related components",
])

export function isBoilerplateText(text: string) {
  return BOILERPLATE_HEADINGS.has(text.trim().toLowerCase())
}

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function flattenReactText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(flattenReactText).join("")
  if (typeof node === "object" && "props" in node) {
    const props = node.props as { children?: ReactNode }
    return flattenReactText(props.children)
  }
  return ""
}

/** Normalize Fumadocs `page.data.toc` into Atro TOC headings. */
export function normalizeServerToc(
  toc:
    | {
        title?: ReactNode
        url: string
        depth: number
      }[]
    | undefined
    | null
): DocsTocHeading[] {
  if (!toc?.length) return []
  return toc
    .filter((item) => item.depth === 2 || item.depth === 3 || item.depth === 4)
    .map((item) => {
      const text = flattenReactText(item.title).trim()
      const id = item.url.replace(/^#/, "")
      return {
        id,
        text,
        level: item.depth as 2 | 3 | 4,
        boilerplate: isBoilerplateText(text),
      }
    })
    .filter((item) => item.id && item.text)
}

/** Whether the TOC should render for this heading set. */
export function shouldShowDocsToc(headings: DocsTocHeading[]) {
  if (headings.length < 2) return false
  const sections = headings.filter((h) => h.level === 2)
  if (sections.length > 0 && sections.every((h) => h.boilerplate)) return false
  return true
}
