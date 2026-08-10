import type { Metadata } from "next"
import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { getSiteUrl } from "atroui/lib/site-url"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Registry",
  description:
    "Install AtroUI components into your repo with the shadcn CLI. Own the source - edit code, content, and design freely.",
  path: "/docs/registry",
})

export default function RegistryPage() {
  const siteUrl = getSiteUrl()

  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header>
        <p className="ms-stamp mb-3">Getting started</p>
        <h1 className="ds-display text-3xl text-foreground sm:text-4xl">
          Registry
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          AtroUI ships a shadcn-compatible registry. Components are copied into
          your project so you can edit code, content, and design - the same
          ownership model as shadcn/ui. Registry items match the docs catalog
          look; change{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            CONTENT
          </code>{" "}
          /{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            DEFAULT_BRAND
          </code>{" "}
          in the installed files to make them yours.
        </p>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Pure UI needs only the CLI. Forms and AI tools that post to{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            /api/*
          </code>{" "}
          also need{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            npm i atroui
          </code>{" "}
          +{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            transpilePackages
          </code>
          . Same three-row matrix:{" "}
          <Link href="/docs/host-api" className="bam-link">
            Host APIs
          </Link>{" "}
          ·{" "}
          <Link href="/docs/installation" className="bam-link">
            Installation
          </Link>
          .
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">
          1. Init shadcn (if needed)
        </h2>
        <CodeBlock language="bash" code={`npx shadcn@latest init`} />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          You need a{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            components.json
          </code>{" "}
          in the app. Tailwind CSS v4 and a dark-friendly token sheet (AtroUI{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            globals.css
          </code>{" "}
          or your own) work best.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">
          2. Add a component
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui
          </code>{" "}
          is in the{" "}
          <a
            href="https://ui.shadcn.com/docs/directory?q=atroui"
            className="bam-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            official shadcn registry directory
          </a>
          . No manual{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            registry add
          </code>{" "}
          step. The CLI resolves the namespace for you.
        </p>
        <CodeBlock
          language="bash"
          code={`npx shadcn@latest add @atroui/home-hero
npx shadcn@latest add @atroui/site-header
npx shadcn@latest add @atroui/faq
npx shadcn@latest add @atroui/waitlist-form
npx shadcn@latest add @atroui/site-footer`}
        />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Source files land under your aliases (for example{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            components/blocks/home-hero.tsx
          </code>
          ). Open the file and edit the{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            CONTENT
          </code>{" "}
          /{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            NAV
          </code>{" "}
          constants at the top - that is the point. Dependencies resolve as{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui/brand
          </code>
          ,{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui/utils
          </code>
          , etc. (not bare names on the default shadcn registry).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Catalog</h2>
        <ul className="list-disc space-y-2 pl-5 text-[15px] text-muted-foreground">
          <li>
            Libs:{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/utils
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/brand
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/site-url
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/seo
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/analytics
            </code>
          </li>
          <li>
            UI:{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/button
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/card
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/textarea
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/form-select
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/breadcrumbs
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/prose
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/theme-toggle
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/theme-provider
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/logo
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/mockup-frame
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/timeline-animation
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/founder-avatar
            </code>
          </li>
          <li>
            Motion:{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/fade-in
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/stagger
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/scroll-progress
            </code>
          </li>
          <li>
            Chrome:{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/site-header
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/site-footer
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/footer-bold
            </code>
          </li>
          <li>
            Home:{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/home-hero
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/home-who
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/home-principle
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/home-work
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/home-lab
            </code>
          </li>
          <li>
            Convert:{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/pricing-overview
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/faq
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/contextual-cta
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/exit-intent-popup
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/contact-form
            </code>
          </li>
          <li>
            Capture:{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/waitlist-form
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/newsletter-form
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/calendly-embed
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/made-with-embed
            </code>
          </li>
          <li>
            Content &amp; share:{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/social-share
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/journal-content
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/resources-content
            </code>
          </li>
          <li>
            Case study &amp; studio:{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/before-after-slider
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/visual-case-study
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/ar-portfolio
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/live-dashboard
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/project-planner
            </code>
          </li>
          <li>
            SEO &amp; analytics:{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/json-ld
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/testimonial-schema
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/analytics-provider
            </code>
          </li>
          <li>
            Tools (OG / thumbnail / scope):{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/og-live-preview
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/og-examples
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/og-workspace
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/thumbnail-live-preview
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/thumbnail-workspace
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/scope-chat
            </code>
          </li>
          <li>
            <Link href="/docs/host-api" className="bam-link">
              Host APIs
            </Link>{" "}
            (forms + AI routes):{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/api-contact
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/api-waitlist
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/api-newsletter
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/api-generate
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/api-thumbnail
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/api-scope
            </code>
          </li>
        </ul>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Browse the catalog JSON at{" "}
          <a
            href="/r/registry.json"
            className="bam-link"
            target="_blank"
            rel="noreferrer"
          >
            /r/registry.json
          </a>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">
          Next steps
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Step-by-step setup lives on{" "}
          <Link href="/docs/installation" className="bam-link">
            Installation
          </Link>
          . How AtroUI sits next to other kits:{" "}
          <Link href="/docs/compare" className="bam-link">
            Compare
          </Link>
          .
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "AtroUI Component Registry Catalog",
            "description": "Production dark-first React and Next.js components to copy-paste into your repository via shadcn CLI.",
            "url": `${siteUrl}/docs/registry`,
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home Hero Component",
                "url": `${siteUrl}/docs/components/home-hero`
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Theme Toggle Switch Component",
                "url": `${siteUrl}/docs/components/ui-theme-toggle`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Contact Form Component with SMTP API",
                "url": `${siteUrl}/docs/components/contact-contact-form`
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Personal Portfolio Hero Component",
                "url": `${siteUrl}/docs/components/personal-hero`
              },
              {
                "@type": "ListItem",
                "position": 5,
                "name": "Satori OG Image Workspace UI",
                "url": `${siteUrl}/docs/components/og-og-workspace`
              },
              {
                "@type": "ListItem",
                "position": 6,
                "name": "Interactive FAQ Accordion",
                "url": `${siteUrl}/docs/components/faq-interactive-preview`
              }
            ]
          }).replace(/</g, "\\u003c")
        }}
      />
    </article>
  )
}
