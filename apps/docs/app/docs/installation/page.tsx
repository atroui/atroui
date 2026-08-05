import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import Link from "next/link"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Installation",
  description:
    "Install AtroUI in a Next.js app with npm i atroui - ThemeProvider, globals.css, brand env overrides, and Host API notes.",
  path: "/docs/installation",
})

export default function InstallationPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header>
        <p className="ms-stamp mb-3">Getting started</p>
        <h1 className="ds-display text-3xl text-foreground sm:text-4xl">
          Installation
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Install the published{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            atroui
          </code>{" "}
          package in a Next.js app, or clone this monorepo to run the docs and
          develop components.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">
          npm (consumer apps)
        </h2>
        <CodeBlock
          language="bash"
          code={`npm install atroui next-themes`}
        />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Peer deps: React 18+, Next.js 15+, and{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            next-themes
          </code>
          . AtroUI ships TypeScript source - tell Next to transpile it:
        </p>
        <CodeBlock
          language="ts"
          code={`import type { NextConfig } from "next"\n\nconst nextConfig: NextConfig = {\n  transpilePackages: ["atroui"],\n}\n\nexport default nextConfig`}
        />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Load Outfit in your layout and expose{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            --font-outfit
          </code>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">
          Clone the monorepo
        </h2>
        <CodeBlock
          language="bash"
          code={`git clone https://github.com/atroui/atroui.git\ncd atroui\npnpm install`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Run the docs</h2>
        <CodeBlock language="bash" code={`pnpm dev`} />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Landing + catalog at{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            http://localhost:3000
          </code>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Use in an app</h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Import components and the global stylesheet. Wrap the tree with{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            ThemeProvider
          </code>
          .
        </p>
        <CodeBlock
          language="tsx"
          code={`import { Button, ThemeProvider } from "atroui"\nimport "atroui/globals.css"\n\nexport function Example({ children }: { children: React.ReactNode }) {\n  return (\n    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>\n      <Button>Click me</Button>\n      {children}\n    </ThemeProvider>\n  )\n}`}
        />
        <p className="text-[13px] text-muted-foreground">
          Tailwind v4 tokens live in{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            atroui/globals.css
          </code>
          . See{" "}
          <Link href="/docs/theming" className="bam-link">
            Theming
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Brand overrides</h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Chrome defaults to AtroUI. Set{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            NEXT_PUBLIC_SITE_*
          </code>{" "}
          in the host, or pass props on sections like{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            HomeWho
          </code>{" "}
          /{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            MadeWithEmbed
          </code>
          . Studio sample data under{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            atroui/content/*
          </code>{" "}
          is optional portfolio copy - skip it when rebranding.
        </p>
        <CodeBlock
          language="bash"
          code={`NEXT_PUBLIC_SITE_NAME=Acme\nNEXT_PUBLIC_SITE_DOMAIN=acme.test\nNEXT_PUBLIC_SITE_EMAIL=hello@acme.test\nNEXT_PUBLIC_SITE_URL=https://acme.test`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Host-bound tools</h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          OG workspace, thumbnail generator, scope chat, contact, and similar
          tools call host{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            /api/*
          </code>{" "}
          routes. The AtroUI docs site does{" "}
          <span className="font-medium text-foreground">not</span> provide those
          backends or shared AI keys - bring your own API (BYOK). Marked{" "}
          <span className="font-medium text-foreground">Host API</span> in the
          sidebar. Live OG sample without wiring keys here:{" "}
          <a
            href="https://www.makershot.tech/og"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand underline underline-offset-2"
          >
            makershot.tech/og
          </a>
          .
        </p>
      </section>
    </article>
  )
}
