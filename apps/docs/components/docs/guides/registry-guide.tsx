import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { DocsArticleHeader } from "@/components/docs/docs-article-header"
import { DocsRegistryMap } from "@/components/docs/docs-registry-map"
import { DocsPager } from "@/components/docs-pager"
import { getSiteUrl } from "atroui/lib/site-url"


export function RegistryGuide() {
  const siteUrl = getSiteUrl()

  return (
    <article className="space-y-10">
      <DocsArticleHeader
        eyebrow="Getting started"
        title="Registry"
        lede={
          <>
            Components copy into your project so you own the source — same model
            as shadcn/ui. Edit <code>CONTENT</code> / <code>DEFAULT_BRAND</code>{" "}
            in the installed files. Pure UI needs only the CLI; forms and AI
            routes that post to <code>/api/*</code> also need{" "}
            <code>npm i atroui</code>. See{" "}
            <Link href="/docs/installation" className="bam-link">
              Installation
            </Link>{" "}
            and{" "}
            <Link href="/docs/host-api" className="bam-link">
              Host APIs
            </Link>
            .
          </>
        }
      />

      <section className="space-y-4">
        <h2 className="docs-section-title" id="init">
          Init shadcn
        </h2>
        <CodeBlock language="bash" code={`npx shadcn@latest init`} />
        <p className="leading-relaxed">
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
        <h2 className="docs-section-title" id="add">
          Add a component
        </h2>
        <p className="leading-relaxed">
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
npx shadcn@latest add @atroui/site-header`}
        />
        <p className="leading-relaxed">
          Source lands under your aliases (for example{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            components/blocks/home-hero.tsx
          </code>
          ). Edit{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            CONTENT
          </code>{" "}
          /{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            NAV
          </code>{" "}
          at the top of the file. Dependencies resolve as{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui/brand
          </code>
          ,{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui/utils
          </code>
          , and so on — not bare names on the default shadcn registry.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="catalog">
          What you can add
        </h2>
        <p className="leading-relaxed">
          Names resolve as{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            {"@atroui/<name>"}
          </code>
          . Prefer the{" "}
          <Link href="/docs/components" className="bam-link">
            components gallery
          </Link>{" "}
          for live previews; the map below is the shape of the registry.
        </p>
        <DocsRegistryMap />
        <p className="leading-relaxed">
          Machine-readable index:{" "}
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
        <h2 className="docs-section-title" id="next-steps">
          Next steps
        </h2>
        <p className="leading-relaxed">
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
      <DocsPager href="/docs/registry" kind="guides" />
    </article>
  )
}
