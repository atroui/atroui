"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

/** Edit CONTENT.posts for your journal index. */
const CONTENT = {
  title: "Journal",
  blurb: "Notes on shipping product UI.",
  posts: [
    {
      slug: "own-the-ui",
      title: "Own the UI with the shadcn registry",
      description: "Why copy-into-repo beats black-box packages for marketing UI.",
      date: "2026-08-01",
    },
    {
      slug: "dark-first-tokens",
      title: "Dark-first tokens that survive light mode",
      description: "How AtroUI structures CSS variables for black-canvas products.",
      date: "2026-07-20",
    },
  ],
}

export function JournalContent() {
  const [q, setQ] = useState("")
  const posts = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (!needle) return CONTENT.posts
    return CONTENT.posts.filter(
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
          placeholder="Search posts…"
          className="mt-4 w-full max-w-md rounded-lg border border-border-subtle bg-background px-4 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </header>
      <ul className="divide-y divide-border-subtle border-y border-border-subtle">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/journal/${post.slug}`}
              className="block py-5 transition-colors hover:bg-muted/20"
            >
              <p className="font-mono text-[11px] text-muted-foreground">
                {post.date}
              </p>
              <h3 className="mt-1 text-lg font-medium text-foreground">
                {post.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {post.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
