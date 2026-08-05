import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { blogPosts, getPost } from "@/lib/blog"
import { docsPageMetadata } from "@/lib/docs-metadata"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return docsPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <article className="bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-8 sm:py-16 lg:py-20">
        <p className="ms-stamp mb-3">
          <Link href="/blog" className="hover:text-foreground">
            Blog
          </Link>
        </p>
        <h1 className="ds-display text-3xl text-foreground sm:text-4xl">
          {post.title}
        </h1>
        <time
          dateTime={post.date}
          className="mt-3 block font-mono text-[12px] text-muted-foreground"
        >
          {post.date}
        </time>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          {post.description}
        </p>

        <div className="mt-10 space-y-8">
          {post.sections.map((section, i) => (
            <section key={i} className="space-y-3">
              {section.heading ? (
                <h2 className="ds-headline text-base text-foreground">
                  {section.heading}
                </h2>
              ) : null}
              {section.body.map((para, j) => (
                <p
                  key={j}
                  className="text-[15px] leading-relaxed text-muted-foreground"
                >
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3 border-t border-border-subtle pt-8">
          <Link href="/docs/installation" className="ms-cta text-sm">
            npm i atroui
          </Link>
          <Link href="/docs" className="ms-cta-ghost text-sm">
            Docs
          </Link>
          <Link href="/blog" className="ms-cta-ghost text-sm">
            All posts
          </Link>
        </div>
      </div>
    </article>
  )
}
