import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArticleJsonLd } from "atroui"
import { BlogThemeAdaptPreview } from "@/components/blog-theme-adapt-preview"
import { CodeBlock } from "@/components/code-block"
import { blogPosts, getPost, type BlogPost } from "@/lib/blog"
import { formatEssayDate } from "@/lib/blog-format"
import { docsPageMetadata } from "@/lib/docs-metadata"

type Props = { params: Promise<{ slug: string }> }

function keepReading(slug: string, limit = 3): BlogPost[] {
  return [...blogPosts]
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const byDate = b.date.localeCompare(a.date)
      if (byDate !== 0) return byDate
      return blogPosts.indexOf(a) - blogPosts.indexOf(b)
    })
    .slice(0, limit)
}

function primaryExit(post: BlogPost): { href: string; label: string } {
  if (post.slug === "host-apis-own-the-ui-bring-your-keys") {
    return { href: "/docs/host-api", label: "Host APIs docs" }
  }
  if (post.slug === "adaptive-theme-switch") {
    return {
      href: "/docs/components/ui-theme-adapt",
      label: "Adaptive Theme Switch",
    }
  }
  return { href: "/docs/registry", label: "Own the UI" }
}

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
            className="blog-essay-a"
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
          </a>
        )
      } else {
        parts.push(
          <Link key={key++} href={href} className="blog-essay-a">
            {label}
          </Link>
        )
      }
    } else if (match[3] !== undefined) {
      parts.push(
        <code key={key++} className="blog-essay-code">
          {match[3]}
        </code>
      )
    } else if (match[4] !== undefined) {
      parts.push(
        <strong key={key++} className="blog-essay-strong">
          {match[4]}
        </strong>
      )
    }

    last = match.index + match[0].length
  }
  if (last < text.length) {
    pushText(text.slice(last))
  }

  return <p className="blog-essay-p">{parts}</p>
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

  const exit = primaryExit(post)
  const more = keepReading(post.slug, 3)

  return (
    <article className="bg-background text-foreground">
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        slug={post.slug}
        date={post.date}
        basePath="/blog"
      />

      {/*
        End-to-end from https://rauchg.com/2020/vercel:
        max-w-2xl · H1 first (text-2xl bold mb-1) · mono meta · body my-5 ·
        H2 bold my-8 · no dek · quiet sign-off.
      */}
      <div className="blog-essay">
        <header className="blog-essay-mast">
          <h1 className="blog-essay-title">{post.title}</h1>
          <p className="blog-essay-meta">
            <Link href="/blog" className="blog-essay-meta-link">
              AtroUI
            </Link>
            <span className="blog-essay-meta-sep" aria-hidden>
              |
            </span>
            <time dateTime={post.date}>{formatEssayDate(post.date)}</time>
          </p>
        </header>

        {post.slug === "adaptive-theme-switch" ? (
          <div className="blog-essay-embed">
            <BlogThemeAdaptPreview />
          </div>
        ) : null}

        <div className="blog-essay-body">
          {post.sections.map((section, i) => (
            <section key={i}>
              {section.heading ? (
                <h2
                  id={`essay-h-${post.slug}-${i}`}
                  className="blog-essay-h2"
                >
                  <a
                    href={`#essay-h-${post.slug}-${i}`}
                    className="blog-essay-h2-anchor"
                  >
                    <span className="blog-essay-h2-hash" aria-hidden>
                      #
                    </span>
                    {section.heading}
                  </a>
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
                  className="blog-essay-codeblock"
                />
              ))}
            </section>
          ))}
        </div>

        <footer className="blog-essay-foot">
          <p className="blog-essay-sign">
            AtroUI
            <span className="blog-essay-meta-sep" aria-hidden>
              ·
            </span>
            <Link href={exit.href} className="blog-essay-a">
              {exit.label}
            </Link>
            <span className="blog-essay-meta-sep" aria-hidden>
              ·
            </span>
            <Link href="/blog" className="blog-essay-a">
              Blog
            </Link>
          </p>

          {more.length > 0 ? (
            <nav className="blog-essay-more" aria-label="More essays">
              <ul className="blog-essay-more-list">
                {more.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/blog/${item.slug}`}
                      className="blog-essay-more-link"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </footer>
      </div>
    </article>
  )
}
