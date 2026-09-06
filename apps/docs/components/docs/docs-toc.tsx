"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

type Heading = { id: string; text: string; level: 2 | 3 }

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

/** "On this page" — derived from the rendered content headings, with scroll-spy.
 *  Skips headings inside live previews ([data-toc-skip]). */
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
        if (!n.id) n.id = slugify(n.textContent || "")
        return {
          id: n.id,
          text: n.textContent || "",
          level: n.tagName === "H3" ? 3 : 2,
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
      if (items[0] && !active) setActive(items[0].id)
    }

    // Wait a frame so route-transition content is mounted before scanning.
    raf = requestAnimationFrame(() => requestAnimationFrame(scan))

    return () => {
      cancelAnimationFrame(raf)
      observer?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  if (headings.length < 2) return null

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="ds-mono-label mb-3">On this page</p>
      <ul className="space-y-1 border-l border-border-subtle">
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
                "-ml-px block border-l-2 py-1 pl-3 text-[13px] leading-snug transition-colors",
                h.level === 3 && "pl-6",
                active === h.id
                  ? "border-brand text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
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
