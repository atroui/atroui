import type { Metadata } from "next"
import Link from "next/link"
import { BlogJsonLd } from "atroui"
import { getLatestPost, getOlderPosts } from "@/lib/blog"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Blog",
  description:
    "AtroUI blog: Host APIs, shadcn registry guides, dark-first tokens, and Next.js essays from search to owning the UI.",
  path: "/blog",
})

export default function BlogIndexPage() {
  const latest = getLatestPost()
  const older = getOlderPosts()

  return (
    <div className="bg-background text-foreground">
      <BlogJsonLd
        path="/blog"
        name="AtroUI Blog"
        description="Guides that take you from search to owning the UI with the shadcn CLI."
      />
      <div className="mx-auto max-w-prose px-5 py-14 sm:px-6 sm:py-16 lg:py-20">
        <p className="ms-stamp mb-3">Blog</p>
        <h1 className="spec-title text-foreground">
          AtroUI{" "}
          <span className="spec-serif-italic text-muted-foreground">blog</span>
        </h1>
        <p className="spec-lede mt-4">
          Guides that take you from search to install: Host APIs and BYOK,
          App Router setup, tokens, branding, and how AtroUI compares to other
          kits. Then open the{" "}
          <Link href="/docs/registry" className="bam-link">
            registry
          </Link>{" "}
          and add components with the shadcn CLI.
        </p>

        {latest ? (
          <section className="mt-14" aria-labelledby="latest-blog-heading">
            <h2 id="latest-blog-heading" className="spec-label text-foreground">
              Latest
            </h2>
            <Link
              href={`/blog/${latest.slug}`}
              className="group mt-4 block border-y border-[var(--line)] py-7 transition-[background-color,padding] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-muted/30 hover:pl-2"
            >
              <time dateTime={latest.date} className="spec-num">
                {latest.date}
              </time>
              <h3 className="spec-title mt-2 text-[1.75rem] text-foreground transition-colors group-hover:text-brand">
                {latest.title}
              </h3>
              <p className="spec-lede mt-3">{latest.description}</p>
              <span className="mt-5 inline-block text-sm font-medium text-brand">
                Read post →
              </span>
            </Link>
          </section>
        ) : null}

        {older.length > 0 ? (
          <section className="mt-16" aria-labelledby="all-posts-heading">
            <h2 id="all-posts-heading" className="spec-label text-foreground">
              More posts
            </h2>
            <ul className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {older.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-1 py-6 transition-[background-color,padding] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-muted/30 hover:pl-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                  >
                    <div>
                      <h3 className="spec-heading text-foreground transition-colors group-hover:text-brand">
                        {post.title}
                      </h3>
                      <p className="spec-body mt-1.5 max-w-xl text-muted-foreground">
                        {post.description}
                      </p>
                    </div>
                    <time dateTime={post.date} className="spec-num shrink-0">
                      {post.date}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <p className="spec-body mt-12 text-muted-foreground">
          Want the next major slice in your inbox?{" "}
          <Link href="/updates" className="bam-link">
            AtroUI updates
          </Link>
          . Prefer the catalog?{" "}
          <Link href="/docs" className="bam-link">
            Read the docs
          </Link>{" "}
          or{" "}
          <Link href="/docs/registry" className="bam-link">
            own the UI
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
