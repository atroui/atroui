import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArticleJsonLd } from "atroui"
import { CodeBlock } from "@/components/code-block"
import { blogPosts, getPost } from "@/lib/blog"
import { docsPageMetadata } from "@/lib/docs-metadata"

type Props = { params: Promise<{ slug: string }> }

/** Render paragraphs with [links](/path), `inline code`, and **bold**. */
function RichParagraph({ text }: { text: string }) {
  const parts: ReactNode[] = []
  const re =
    /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*/g
  let last = 0
  let match: RegExpExecArray | null
  let key = 0

  const safeHref = (raw: string): string | null => {
    const href = raw.trim()
    if (!href) return null
    if (href.startsWith("/") && !href.startsWith("//")) return href
    if (href.startsWith("#")) return href
    try {
      const url = new URL(href)
      if (url.protocol === "http:" || url.protocol === "https:") return href
    } catch {
      return null
    }
    return null
  }

  const pushText = (value: string) => {
    if (value) parts.push(value)
  }

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      pushText(text.slice(last, match.index))
    }

    if (match[1] !== undefined) {
      const label = match[1]
      const href = safeHref(match[2] ?? "")
      if (!href) {
        pushText(label || match[0])
      } else if (href.startsWith("http")) {
        parts.push(
          <a
            key={key++}
            href={href}
            className="bam-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
          </a>
        )
      } else {
        parts.push(
          <Link key={key++} href={href} className="bam-link">
            {label}
          </Link>
        )
      }
    } else if (match[3] !== undefined) {
      parts.push(
        <code
          key={key++}
          className="rounded-md border border-border-subtle bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-foreground"
        >
          {match[3]}
        </code>
      )
    } else if (match[4] !== undefined) {
      parts.push(
        <strong key={key++} className="font-semibold text-foreground">
          {match[4]}
        </strong>
      )
    }

    last = match.index + match[0].length
  }
  if (last < text.length) {
    pushText(text.slice(last))
  }

  return <p className="blog-prose">{parts}</p>
}

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
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        slug={post.slug}
        date={post.date}
        basePath="/blog"
      />
      {/* ~65ch column — comfortable tracking for Merriweather at 17–18px */}
      <div className="mx-auto max-w-prose px-5 py-14 sm:px-6 sm:py-16 lg:py-20">
        <p className="ms-stamp mb-4">
          <Link href="/blog" className="hover:text-foreground">
            Blog
          </Link>
        </p>
        <h1 className="ds-display text-[1.85rem] tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem]">
          {post.title}
        </h1>
        <time
          dateTime={post.date}
          className="mt-4 block font-mono text-[13px] tracking-wide text-muted-foreground"
        >
          {post.date}
        </time>
        <p className="blog-lede mt-6">{post.description}</p>

        <div className="mt-12 space-y-10 sm:mt-14 sm:space-y-12">
          {post.sections.map((section, i) => (
            <section key={i} className="space-y-4">
              {section.heading ? (
                <h2 className="ds-headline text-xl tracking-tight text-foreground sm:text-2xl">
                  {section.heading}
                </h2>
              ) : null}
              {section.body.map((para, j) => (
                <RichParagraph key={j} text={para} />
              ))}
              {section.codeBlocks?.map((block, k) => (
                <CodeBlock
                  key={k}
                  language={block.language}
                  code={block.code}
                  className="mt-3"
                />
              ))}
            </section>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap gap-3 border-t border-border-subtle pt-10">
          {post.slug === "host-apis-own-the-ui-bring-your-keys" ? (
            <Link href="/docs/host-api" className="ms-cta text-sm">
              Host APIs docs
            </Link>
          ) : (
            <Link href="/docs/registry" className="ms-cta text-sm">
              Own the UI
            </Link>
          )}
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
