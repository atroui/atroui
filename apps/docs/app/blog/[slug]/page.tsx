import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { CodeBlock } from "@/components/code-block"
import { blogPosts, getPost } from "@/lib/blog"
import { docsPageMetadata } from "@/lib/docs-metadata"

type Props = { params: Promise<{ slug: string }> }

/** Render paragraphs that may include simple [label](/path) or [label](https://…) links. */
function RichParagraph({ text }: { text: string }) {
  const parts: ReactNode[] = []
  const re = /\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  let match: RegExpExecArray | null
  let key = 0
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index))
    }
    const label = match[1] ?? ""
    const href = match[2] ?? "#"
    const external = href.startsWith("http")
    if (external) {
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
    last = match.index + match[0].length
  }
  if (last < text.length) {
    parts.push(text.slice(last))
  }
  return (
    <p className="text-[15px] leading-relaxed text-muted-foreground">
      {parts}
    </p>
  )
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
                <RichParagraph key={j} text={para} />
              ))}
              {section.codeBlocks?.map((block, k) => (
                <CodeBlock
                  key={k}
                  language={block.language}
                  code={block.code}
                  className="mt-2"
                />
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
