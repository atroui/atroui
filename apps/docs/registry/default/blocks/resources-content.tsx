"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

/** Edit CONTENT.items for your resource library. */
const CONTENT = {
  title: "Resources",
  blurb: "Guides and downloads for shipping faster.",
  items: [
    {
      id: "r1",
      title: "7-day MVP checklist",
      description: "Scope, stack, and daily cadence for a fixed sprint.",
      href: "/resources/mvp-checklist",
      kind: "Guide",
    },
    {
      id: "r2",
      title: "OG card brief",
      description: "Title, subtitle, and safe-zone rules for social images.",
      href: "/resources/og-brief",
      kind: "PDF",
    },
  ],
}

export function ResourcesContent() {
  const [q, setQ] = useState("")
  const items = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (!needle) return CONTENT.items
    return CONTENT.items.filter(
      (p) =>
        p.title.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle)
    )
  }, [q])

  return (
    <div className="space-y-8">
      <header>
        <p className="ms-stamp">{CONTENT.title}</p>
        <p className="mt-2 text-sm text-muted-foreground">{CONTENT.blurb}</p>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search resources…"
          className="mt-4 w-full max-w-md rounded-full border border-border-subtle bg-background px-4 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </header>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="block rounded-2xl border border-border-subtle bg-card/40 p-5 transition-colors hover:bg-white/[0.04]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {item.kind}
              </p>
              <h3 className="mt-2 text-base font-medium text-foreground">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
