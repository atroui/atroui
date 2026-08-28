import type { Metadata } from "next"
import { DocsMdxPage } from "@/components/docs-mdx"
import { CodeBlock } from "@/components/code-block"
import Link from "next/link"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Identity kit - Brand & SEO",
  description:
    "AtroUI Brand & SEO Identity Kit - unified getBrand() configuration, Schema.org structured data helpers, Next.js sitemaps, favicons, and search snippet optimization.",
  path: "/docs/identity",
})

export default function IdentityPage() {
  return (
    <DocsMdxPage href="/docs/identity" tocRootId="identity-doc">
      <header>
        <p className="ms-stamp mb-3">Brand &amp; SEO</p>
        <h1 className="ds-display text-3xl text-foreground sm:text-4xl">
          Identity kit
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] font-light leading-relaxed text-muted-foreground">
          AtroUI structures design, brand configuration, and technical SEO as a
          unified pipeline. Most component registries stop at CSS variables.
          We provide a complete <strong className="font-medium text-foreground">Brand &amp; SEO Identity Kit</strong> —
          so when you install headers, footers, JSON-LD, or favicons, they pull from a single source of truth and stay in sync.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">1. Core brand config (getBrand)</h2>
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          Instead of hardcoding your product name or canonical URLs across headers, footers, and SEO scripts, we configure them in a single place. Install the brand helper:
        </p>
        <CodeBlock
          language="bash"
          code="npx shadcn@latest add @atroui/brand"
        />
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          This drops <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">lib/brand.ts</code> into your project, resolving environmental overrides or default fallbacks dynamically:
        </p>
        <CodeBlock
          language="typescript"
          code={`// lib/brand.ts
export function getBrand() {
  return {
    name: process.env.NEXT_PUBLIC_SITE_NAME || "My SaaS",
    domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || "mysaas.com",
    email: process.env.NEXT_PUBLIC_SITE_EMAIL || "hello@mysaas.com",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.mysaas.com",
    tagline: "Own the UI, borrow the API.",
  }
}`}
        />
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          To completely rebrand your site chrome, legal notices, and structured data, you only need to configure your environment variables:
        </p>
        <CodeBlock
          language="bash"
          code={`NEXT_PUBLIC_SITE_NAME="AstroSaaS"\nNEXT_PUBLIC_SITE_DOMAIN="astrosaas.com"\nNEXT_PUBLIC_SITE_EMAIL="team@astrosaas.com"\nNEXT_PUBLIC_SITE_URL="https://www.astrosaas.com"`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">2. Schema.org structured data (JSON-LD)</h2>
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          Google and other search engines utilize Schema.org JSON-LD to display rich snippets, star-ratings, and nest directories in the SERP. AtroUI offers headless schema components that automatically read from your brand config. Install the schema package:
        </p>
        <CodeBlock
          language="bash"
          code="npx shadcn@latest add @atroui/json-ld"
        />
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          This registers headless script blocks inside your component catalog. Combine them within your root App Router layout or individual page files:
        </p>
        <CodeBlock
          language="tsx"
          code={`// app/layout.tsx
import { SiteGraphJsonLd } from "@/components/seo/json-ld"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteGraphJsonLd />
        {children}
      </body>
    </html>
  )
}`}
        />
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          For technical docs or long-form developer articles, inject article metadata onto pages dynamically:
        </p>
        <CodeBlock
          language="tsx"
          code={`// app/blog/[slug]/page.tsx
import { ArticleJsonLd } from "@/components/seo/json-ld"

export default function BlogPost({ post }) {
  return (
    <article>
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        slug={post.slug}
        date={post.date}
        basePath="/blog"
      />
      <h1>{post.title}</h1>
    </article>
  )
}`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">3. Next.js metadata and canonical paths</h2>
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          Search engines penalize duplicate path strings. To prevent index pollution, ensure a stable <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">metadataBase</code> is set in the root layout metadata so relative paths resolve to the absolute canonical URL automatically.
        </p>
        <CodeBlock
          language="typescript"
          code={`// app/layout.tsx
import { Metadata } from "next"
import { getBrand } from "@/lib/brand"

const brand = getBrand()

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    default: \`\${brand.name} - \${brand.tagline}\`,
    template: \`%s · \${brand.name}\`,
  },
  description: "High-performance dark-first component catalog.",
  alternates: {
    canonical: "/",
  },
}`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">4. 2026 Favicon and SERP checklist</h2>
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          Modern search results display your brand favicon right next to your snippet link. If you only provide a legacy favicon, Google may display a generic globe, lowering organic click-through rates.
        </p>
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          To configure your favicons in a Next.js App Router project using AtroUI specifications, place these in your <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">public/</code> directory:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-[15px] text-muted-foreground">
          <li><code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">/favicon-96.png</code> — primary Google SERP candidate (square, ≥48).</li>
          <li><code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">/favicon-48.png</code>, <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">/favicon-192.png</code> — additional PNG sizes.</li>
          <li><code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">/favicon.ico</code> — multi-resolution ICO including ≥48 frames (Google still probes this path).</li>
          <li><code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">/icon.svg</code> — crisp browser tabs.</li>
          <li><code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">/apple-touch-icon.png</code> — 180x180 mobile app tile.</li>
        </ul>
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          Then, reference them via relative URLs in your layout metadata (PNG before SVG):
        </p>
        <CodeBlock
          language="typescript"
          code={`// app/layout.tsx
export const metadata = {
  // ...
  icons: {
    icon: [
      { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48 64x64 96x96 128x128 256x256" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon-96.png"],
  },
}`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">5. Sitemap and robots generation</h2>
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          App Router supports automated dynamic sitemaps and search crawler instructions natively. Build your dynamic crawl tree using the dynamic sitemap helper:
        </p>
        <CodeBlock
          language="typescript"
          code={`// app/sitemap.ts
import type { MetadataRoute } from "next"
import { getBrand } from "@/lib/brand"

export default function sitemap(): MetadataRoute.Sitemap {
  const brand = getBrand()
  const lastModified = new Date()

  return [
    {
      url: brand.siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: \`\${brand.siteUrl}/docs\`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]
}`}
        />
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          And drop crawler rules into <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">app/robots.ts</code>:
        </p>
        <CodeBlock
          language="typescript"
          code={`// app/robots.ts
import type { MetadataRoute } from "next"
import { getBrand } from "@/lib/brand"

export default function robots(): MetadataRoute.Robots {
  const brand = getBrand()
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: \`\${brand.siteUrl}/sitemap.xml\`,
    host: brand.siteUrl,
  }
}`}
        />
      </section>

      <section className="md-glass space-y-3 p-5">
        <h2 className="ds-headline text-base text-foreground">SEO Discipline: Brand ≠ CONTENT</h2>
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          AtroUI maintains a strict division of data to avoid typical template mistakes:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-[15px] text-muted-foreground">
          <li>
            <strong className="text-foreground">Brand Profile</strong> — configured globally via environment variables (getBrand), powering headers, footers, JSON-LD, sitemaps, and default mail handles.
          </li>
          <li>
            <strong className="text-foreground">Section Copy (CONTENT)</strong> — configured locally at the top of individual block files, representing the exact words displayed in marketing components (e.g. `DEFAULT_BRAND` on dynamic heroes).
          </li>
        </ul>
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          This boundary ensures your product is immediately indexable on your production URL, with no generic template strings leaking into Google's index.
        </p>
      </section>
    </DocsMdxPage>
  )
}
