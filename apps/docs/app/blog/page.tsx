import type { Metadata } from "next"
import Link from "next/link"
import { BlogJsonLd } from "atroui"
import { ProductPageHeader, productProse } from "@/components/product-page"
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
    <div className={productProse}>
      <BlogJsonLd
        path="/blog"
        name="AtroUI Blog"
        description="Guides that take you from search to owning the UI with the shadcn CLI."
      />
      <ProductPageHeader
        stamp="Blog"
        title={
          <>
            AtroUI <span className="ds-sketch-accent">blog</span>
          </>
        }
        lede={
          <>
            Guides from search to install: Host APIs and BYOK, App Router setup,
            tokens, and how AtroUI compares to other kits. Then open the{" "}
            <Link href="/docs/registry" className="bam-link">
              registry
            </Link>{" "}
            and add components with the shadcn CLI.
          </>
        }
      />

      {latest ? (
        <section className="mt-14" aria-labelledby="latest-blog-heading">
          <p className="ms-stamp mb-3">Latest</p>
          <h2
            id="latest-blog-heading"
            className="ds-headline text-lg text-foreground sm:text-xl"
          >
            Latest blog
          </h2>
          <Link
            href={`/blog/${latest.slug}`}
            className="group mt-4 block rounded-xl border border-border-subtle bg-white/2 p-5 transition-colors hover:border-brand/35 hover:bg-white/5"
          >
            <time
              dateTime={latest.date}
              className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase"
            >
              {latest.date}
            </time>
            <h3 className="ds-display mt-2 text-xl tracking-tight text-foreground group-hover:text-brand sm:text-2xl">
              {latest.title}
            </h3>
            <p className="blog-lede mt-2">{latest.description}</p>
          </Link>
        </section>
      ) : null}

      {older.length > 0 ? (
        <section className="mt-14" aria-labelledby="older-blog-heading">
          <p className="ms-stamp mb-3">Archive</p>
          <h2
            id="older-blog-heading"
            className="ds-headline text-lg text-foreground sm:text-xl"
          >
            Earlier posts
          </h2>
          <ul className="mt-4 divide-y divide-border-subtle rounded-xl border border-border-subtle">
            {older.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-1 px-4 py-4 transition-colors hover:bg-white/5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:px-5"
                >
                  <span className="min-w-0">
                    <h3 className="ds-display text-lg tracking-tight text-foreground group-hover:text-brand sm:text-xl">
                      {post.title}
                    </h3>
                    <p className="ds-meta mt-1 line-clamp-2 sm:max-w-lg">
                      {post.description}
                    </p>
                  </span>
                  <time
                    dateTime={post.date}
                    className="shrink-0 font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase"
                  >
                    {post.date}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
