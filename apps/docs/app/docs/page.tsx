import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@meridian/ui"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "Introduction",
}

export default function DocsIntroPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="font-display text-4xl tracking-tight">Introduction</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Meridian is a production-ready React component library built on Radix UI primitives,
          Tailwind CSS, and the same composition patterns that make shadcn/ui delightful.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">What you get</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>Accessible, typed components with light and dark mode</li>
          <li>Variant APIs via <code className="rounded bg-muted px-1.5 py-0.5 text-xs">class-variance-authority</code></li>
          <li>A documentation site with live examples and props tables</li>
          <li>Storybook stories for visual development and regression</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Quick start</h2>
        <CodeBlock
          language="bash"
          code={`pnpm install\npnpm dev`}
        />
        <p className="text-sm text-muted-foreground">
          This starts the docs site at{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">http://localhost:3000</code>.
        </p>
      </section>

      <div className="flex gap-3 pt-2">
        <Button asChild>
          <Link href="/docs/installation">Installation</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs/components/button">Components</Link>
        </Button>
      </div>
    </article>
  )
}
