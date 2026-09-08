import type { Metadata } from "next"
import Link from "next/link"
import { docsPageMetadata } from "@/lib/docs-metadata"
import { UpdatesSignup } from "@/components/updates-signup"

export const metadata: Metadata = docsPageMetadata({
  title: "AtroUI updates",
  description:
    "Major AtroUI updates in detail: registry, Host APIs, launch workflow. Not a weekly drip. Subscribe on atroui.com.",
  path: "/updates",
})

export default function UpdatesPage() {
  return (
    <div className="bg-background text-foreground">
      <main className="blog-essay">
        <header className="blog-essay-mast">
          <h1 className="blog-essay-title">Major updates, in detail</h1>
          <p className="blog-essay-meta">
            <span>Release notes</span>
            <span className="blog-essay-meta-sep" aria-hidden>
              |
            </span>
            <Link href="/blog" className="blog-essay-meta-link">
              Blog
            </Link>
          </p>
        </header>

        <div className="blog-essay-body">
          <p className="blog-essay-p">
            The pipeline is long. This list is short. You get the releases that
            change the product: Host APIs, launch workflow, identity, install
            path — not a changelog dump.
          </p>

          <section>
            <h2 className="blog-essay-h2">Subscribe</h2>
            <p className="blog-essay-p">
              Letters when a major slice ships — not a weekly drip.
            </p>
            <div className="mt-5">
              <UpdatesSignup source="updates-page" />
            </div>
          </section>

          <section>
            <h2 className="blog-essay-h2">What you get</h2>
            <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted-foreground">
              <li>
                A letter when a major slice ships, with why it matters and how
                to install it.
              </li>
              <li>
                Links to the live tools and the long-form post. One primary
                path.
              </li>
              <li>
                The same BYOK rule: AtroUI never holds your keys. This list is
                Resend on our Host API, not a third-party drip product.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="blog-essay-h2">What you don&apos;t</h2>
            <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted-foreground">
              <li>
                Weekly recaps, growth experiments, or Plus/Studio pitches.
              </li>
              <li>
                Patch noise. Those stay on GitHub releases and the changelog.
              </li>
            </ul>
            <p className="blog-essay-p">
              Prefer the feed?{" "}
              <Link href="/docs/changelog" className="blog-essay-a">
                Changelog
              </Link>
              {" · "}
              <Link href="/blog" className="blog-essay-a">
                Blog
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
