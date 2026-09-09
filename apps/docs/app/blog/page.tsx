import type { Metadata } from "next"
import Link from "next/link"
import { BlogJsonLd } from "atroui"
import { getLatestPost, getOlderPosts, blogPosts } from "@/lib/blog"
import { formatLedgerDate } from "@/lib/blog-format"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Blog",
  description:
    "AtroUI blog: Host APIs, shadcn registry guides, dark-first tokens, and Next.js essays from search to owning the UI.",
  path: "/blog",
})

export default function BlogIndexPage() {
  const latest = getLatestPost()
  const older = [...getOlderPosts()].sort((a, b) =>
    b.date.localeCompare(a.date)
  )
  const jsonLdPosts = [...blogPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((post) => ({
      title: post.title,
      description: post.description,
      slug: post.slug,
      date: post.date,
    }))

  return (
    <div className="bg-background text-foreground">
      <BlogJsonLd
        path="/blog"
        name="AtroUI Blog"
        description="Guides that take you from search to owning the UI with the shadcn CLI."
        posts={jsonLdPosts}
      />

      <main className="blog-index">
        <header className="blog-index-mast">
          <p className="blog-index-stamp">Blog</p>
          <h1 className="blog-index-title">
            Essays for people who{" "}
            <span className="blog-index-title-accent">install</span>.
          </h1>
          <p className="blog-index-lede">
            Host APIs, registry ownership, tokens, and the boring paths that
            make Next.js sections ship. One idea per post — then go edit the
            file.
          </p>
        </header>

        {latest ? (
          <section
            className="blog-index-lead"
            aria-labelledby="blog-lead-heading"
          >
            <div className="blog-index-lead-meta">
              <span className="blog-index-now" aria-hidden>
                Now
              </span>
              <time dateTime={latest.date} className="blog-index-date">
                {formatLedgerDate(latest.date)}
              </time>
            </div>
            <h2 id="blog-lead-heading" className="sr-only">
              Latest essay
            </h2>
            <Link href={`/blog/${latest.slug}`} className="blog-index-lead-link">
              <h3 className="blog-index-lead-title">{latest.title}</h3>
              <p className="blog-index-lead-desc">{latest.description}</p>
              <span className="blog-index-lead-cta">
                Read essay
                <span aria-hidden> →</span>
              </span>
            </Link>
          </section>
        ) : null}

        {older.length > 0 ? (
          <section
            className="blog-index-ledger"
            aria-labelledby="blog-ledger-heading"
          >
            <div className="blog-index-ledger-head">
              <h2 id="blog-ledger-heading" className="blog-index-ledger-title">
                Index
              </h2>
              <p className="blog-index-ledger-count">
                {older.length} earlier{" "}
                {older.length === 1 ? "essay" : "essays"}
              </p>
            </div>

            <ol className="blog-index-list">
              {older.map((post) => (
                <li key={post.slug} className="blog-index-row">
                  <Link href={`/blog/${post.slug}`} className="blog-index-row-link">
                    <time
                      dateTime={post.date}
                      className="blog-index-row-date"
                    >
                      {formatLedgerDate(post.date)}
                    </time>
                    <span className="blog-index-row-body">
                      <span className="blog-index-row-title">{post.title}</span>
                      <span className="blog-index-row-desc">
                        {post.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <footer className="blog-index-exit">
          <p>
            Major releases, not a drip —{" "}
            <Link href="/updates" className="bam-link">
              AtroUI updates
            </Link>
            . Or skip the essays and{" "}
            <Link href="/docs/registry" className="bam-link">
              own the UI
            </Link>
            .{" "}
            <a href="/rss.xml" className="bam-link">
              RSS
            </a>
          </p>
        </footer>
      </main>
    </div>
  )
}
