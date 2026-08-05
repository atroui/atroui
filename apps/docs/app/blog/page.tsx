import type { Metadata } from "next"
import Link from "next/link"
import { blogPosts } from "@/lib/blog"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Blog",
  description:
    "AtroUI blog - short technical posts on the React / Next.js component library, install guides, tokens, and branding. atroui.com",
  path: "/blog",
})

export default function BlogIndexPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 lg:py-20">
        <p className="ms-stamp mb-3">Blog</p>
        <h1 className="ds-display text-3xl text-foreground sm:text-4xl">
          AtroUI blog
        </h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          Short, technical posts about the component library at atroui.com.
          Deeper essays live on sister sites; this feed owns the brand SERP.
        </p>

        <ul className="mt-12 divide-y divide-border-subtle border-y border-border-subtle">
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-1 py-5 transition-colors hover:bg-muted/30 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <div>
                  <h2 className="text-lg font-medium tracking-tight text-foreground group-hover:text-brand">
                    {post.title}
                  </h2>
                  <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                    {post.description}
                  </p>
                </div>
                <time
                  dateTime={post.date}
                  className="shrink-0 font-mono text-[11px] text-muted-foreground"
                >
                  {post.date}
                </time>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-muted-foreground">
          Prefer the catalog?{" "}
          <Link href="/docs" className="bam-link">
            Read the docs
          </Link>{" "}
          or{" "}
          <Link href="/docs/installation" className="bam-link">
            install AtroUI
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
