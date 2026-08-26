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
    <main className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <header>
        <p className="ms-stamp">List</p>
        <h1 className="spec-title mt-3 text-foreground">
          Major updates, in detail
        </h1>
        <p className="spec-lede mt-4 max-w-xl">
          The pipeline is long. This list is short. You get the releases that
          change the product: Host APIs, launch workflow, identity, install
          path. Written like the{" "}
          <Link href="/blog" className="bam-link">
            blog
          </Link>
          , not a changelog dump.
        </p>
      </header>

      <section className="mt-10 rounded-[var(--radius)] border border-[var(--line)] p-6">
        <h2 className="spec-heading text-foreground">Subscribe</h2>
        <div className="mt-4">
          <UpdatesSignup source="updates-page" />
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="ds-headline text-base text-foreground">What you get</h2>
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted-foreground">
          <li>A letter when a major slice ships, with why it matters and how to install it.</li>
          <li>Links to the live tools and the long-form post. One primary path.</li>
          <li>
            The same BYOK rule: AtroUI never holds your keys. This list is
            Resend on our Host API, not a third-party drip product.
          </li>
        </ul>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="ds-headline text-base text-foreground">What you don&apos;t</h2>
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted-foreground">
          <li>Weekly recaps, growth experiments, or Plus/Studio pitches.</li>
          <li>Patch noise. Those stay on GitHub releases and the changelog.</li>
        </ul>
        <p className="text-[14px] text-muted-foreground">
          Prefer the feed?{" "}
          <Link href="/docs/changelog" className="bam-link">
            Changelog
          </Link>
          {" · "}
          <Link href="/blog" className="bam-link">
            Blog
          </Link>
          .
        </p>
      </section>
    </main>
  )
}
