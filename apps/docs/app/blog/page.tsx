import type { Metadata } from "next"
import Link from "next/link"
import { BlogJsonLd } from "atroui"
import { getLatestPost, getOlderPosts } from "@/lib/blog"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Blog",
  description:
    "AtroUI blog: shadcn registry guides, dark-first tokens, and Next.js component essays that take you from search to owning the UI.",
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
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-8 sm:py-16 lg:py-20">
        <p className="ms-stamp mb-3">Blog</p>
        <h1 className="ds-display text-3xl text-foreground sm:text-4xl">
          AtroUI blog
        </h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          Guides that take you from search to install: App Router setup,
          tokens, branding, and how AtroUI compares to other kits. Then open
          the{" "}
          <Link href="/docs/registry" className="bam-link">
            registry
          </Link>{" "}
          and add components with the shadcn CLI.
        </p>

        {latest ? (
          <section className="mt-12" aria-labelledby="latest-blog-heading">
            <p className="ms-stamp mb-3">Latest</p>
            <h2
              id="latest-blog-heading"
              className="ds-headline text-base text-foreground"
            >
              Latest blog
            </h2>
            <Link
              href={`/blog/${latest.slug}`}
              className="group mt-5 block border-y border-border-subtle py-6 transition-colors hover:bg-muted/30"
            >
              <time
                dateTime={latest.date}
                className="font-mono text-[11px] text-muted-foreground"
              >
                {latest.date}
              </time>
              <h3 className="mt-2 text-xl font-medium tracking-tight text-foreground group-hover:text-brand sm:text-2xl">
                {latest.title}
              </h3>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                {latest.description}
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-brand">
                Read post →
              </span>
            </Link>
          </section>
        ) : null}

        {older.length > 0 ? (
          <section className="mt-14" aria-labelledby="all-posts-heading">
            <h2
              id="all-posts-heading"
              className="ds-headline text-base text-foreground"
            >
              More posts
            </h2>
            <ul className="mt-6 divide-y divide-border-subtle border-y border-border-subtle">
              {older.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-1 py-5 transition-colors hover:bg-muted/30 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                  >
                    <div>
                      <h3 className="text-lg font-medium tracking-tight text-foreground group-hover:text-brand">
                        {post.title}
                      </h3>
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
          </section>
        ) : null}

        <p className="mt-10 text-sm text-muted-foreground">
          Prefer the catalog?{" "}
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
