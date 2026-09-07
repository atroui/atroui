import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { LandingSectionHeader } from "@/components/landing/landing-section-header"
import { getRecentPosts } from "@/lib/blog"

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

/** Zed "The latest from Zed" — three recent posts, minimal cards. */
export function LandingBlog() {
  const posts = getRecentPosts(3)

  return (
    <section className="atro-section">
      <div className="atro-section-inner">
        <LandingSectionHeader
          variant="product"
          title="The latest from AtroUI"
          lede="Announcements, registry notes, and essays on owning the UI."
          action={
            <Link href="/blog" className="atro-section-link mt-1 inline-flex items-center gap-1">
              View blog
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          }
        />

        <div className="atro-blog-grid">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="atro-blog-card"
            >
              {i === 0 ? (
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand">
                  Newest
                </span>
              ) : null}
              <span className="atro-blog-card-title">{post.title}</span>
              <span className="atro-blog-card-desc">{post.description}</span>
              <span className="atro-blog-card-meta">{formatDate(post.date)}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
