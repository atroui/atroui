import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Installation",
}

export default function InstallationPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header>
        <p className="ms-stamp mb-3">Getting started</p>
        <h1 className="ds-display text-3xl text-foreground sm:text-4xl">
          Installation
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Meridian is a pnpm monorepo. Run the docs locally, or import{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @meridian/ui
          </code>{" "}
          from a Next.js app in the workspace.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Clone &amp; install</h2>
        <CodeBlock
          language="bash"
          code={`git clone <your-repo-url> meridian\ncd meridian\npnpm install`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Run the docs</h2>
        <CodeBlock language="bash" code={`pnpm dev`} />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Opens the landing page and catalog at{" "}
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
          </code>{" "}
          and load Outfit (see root layout in docs).
        </p>
        <CodeBlock
          language="tsx"
          code={`import { Button, ThemeProvider } from "@meridian/ui"\nimport "@meridian/ui/globals.css"\n\nexport function Example({ children }: { children: React.ReactNode }) {\n  return (\n    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>\n      <Button>Click me</Button>\n      {children}\n    </ThemeProvider>\n  )\n}`}
        />
        <p className="text-[13px] text-muted-foreground">
          Tailwind v4 is configured inside{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @meridian/ui/globals.css
          </code>
          . Host apps only need to import that CSS and scan their own source
          files. See{" "}
          <Link href="/docs/theming" className="bam-link">
            Theming
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Host-bound tools</h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          OG workspace, thumbnail generator, scope chat, contact, and similar
          tools call host{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            /api/*
          </code>{" "}
          routes. They render in the catalog but need those APIs (and env) in a
          real app. Marked{" "}
          <span className="font-medium text-foreground">Host API</span> in the
          sidebar.
        </p>
      </section>
    </article>
  )
}
