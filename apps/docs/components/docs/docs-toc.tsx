"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

type Heading = { id: string; text: string; level: 2 | 3; boilerplate: boolean }

/**
 * Scaffolding every component page repeats. A TOC listing only these is a
 * table of contents for the template, not for the page.
 */
const BOILERPLATE_HEADINGS = new Set([
  "preview",
  "installation",
  "usage",
  "api reference",
  "faq",
  "related",
  "related components",
])

function isBoilerplate(node: HTMLElement, text: string) {
  return (
    node.hasAttribute("data-toc-boilerplate") ||
    BOILERPLATE_HEADINGS.has(text.trim().toLowerCase())
  )
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

/** Page TOC — Zed theme/page-toc energy. */
export function DocsToc() {
  const pathname = usePathname()
  const [headings, setHeadings] = React.useState<Heading[]>([])
  const [active, setActive] = React.useState<string>("")

  React.useEffect(() => {
    let raf = 0
    let observer: IntersectionObserver | null = null

    const scan = () => {
      const root = document.querySelector("[data-docs-content]")
      if (!root) return
      const nodes = Array.from(
        root.querySelectorAll<HTMLElement>("h2, h3")
      ).filter((n) => !n.closest("[data-toc-skip]") && n.textContent?.trim())

      const items: Heading[] = nodes.map((n) => {
        const text = n.textContent || ""
        if (!n.id) n.id = slugify(text)
        return {
          id: n.id,
          text,
          level: n.tagName === "H3" ? 3 : 2,
          boilerplate: isBoilerplate(n, text),
        }
      })
      setHeadings(items)

      observer?.disconnect()
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActive((entry.target as HTMLElement).id)
          }
        },
        { rootMargin: "-88px 0px -70% 0px", threshold: 0 }
      )
      nodes.forEach((n) => observer?.observe(n))
      if (items[0]) setActive(items[0].id)
    }

    raf = requestAnimationFrame(() => requestAnimationFrame(scan))

    return () => {
      cancelAnimationFrame(raf)
      observer?.disconnect()
    }
  }, [pathname])

  if (headings.length < 2) return null

  const sections = headings.filter((h) => h.level === 2)
  if (sections.length > 0 && sections.every((h) => h.boilerplate)) return null

  return (
    <nav aria-label="On this page" className="text-[13px]">
      <p className="docs-book-nav-heading !px-0">On this page</p>
      <ul className="mt-2 space-y-0.5 border-l border-[color:var(--docs-border)]">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault()
                document
                  .getElementById(h.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
                history.replaceState(null, "", `#${h.id}`)
                setActive(h.id)
              }}
              className={cn(
                "-ml-px block border-l py-1 pl-3 leading-snug transition-colors",
                h.level === 3 && "pl-5",
                active === h.id
                  ? "border-[color:var(--docs-link)] text-[color:var(--docs-fg-strong)]"
                  : "border-transparent text-muted-foreground hover:text-[color:var(--docs-fg-strong)]"
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
