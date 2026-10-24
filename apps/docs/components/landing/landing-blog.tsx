import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { LandingSectionHeader } from "@/components/landing/landing-section-header"
import { getRecentPosts } from "@/lib/blog"
import { formatLongDate } from "@/lib/blog-format"

/** Home “The latest” — hairline journal strip, not the /blog ledger. */
export function LandingBlog() {
  const posts = getRecentPosts(3)

  return (
    <section className="atro-section">
      <div className="atro-section-inner">
        <LandingSectionHeader
          variant="product"
          align="left"
          title="The latest from AtroUI"
          lede="Registry notes and Host API guides."
          action={
            <Link
              href="/blog"
              className="atro-section-link mt-1 inline-flex items-center gap-1"
            >
              View blog
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          }
        />

        <ul className="atro-blog-list">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="atro-blog-row">
                <div className="atro-blog-row-main">
                  {i === 0 ? (
                    <span className="atro-blog-newest">Now</span>
                  ) : null}
                  <span className="atro-blog-row-title">{post.title}</span>
                  <span className="atro-blog-row-desc">{post.description}</span>
                </div>
                <time
                  className="atro-blog-row-date"
                  dateTime={post.date}
                >
                  {formatLongDate(post.date)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
