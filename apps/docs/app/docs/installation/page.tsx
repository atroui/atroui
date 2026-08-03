import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "Installation",
}

export default function InstallationPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="font-display text-4xl tracking-tight">Installation</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Meridian is structured as a pnpm monorepo. Use the UI package from apps or publish it.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Clone & install</h2>
        <CodeBlock
          language="bash"
          code={`git clone <your-repo-url> meridian\ncd meridian\npnpm install`}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Run the docs</h2>
        <CodeBlock language="bash" code={`pnpm dev`} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Run Storybook</h2>
        <CodeBlock language="bash" code={`pnpm storybook`} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Use in an app</h2>
        <p className="text-muted-foreground">
          Add the workspace package and import components plus the global CSS:
        </p>
        <CodeBlock
          language="tsx"
          code={`import { Button } from "@meridian/ui"\nimport "@meridian/ui/globals.css"\n\nexport function Example() {\n  return <Button>Click me</Button>\n}`}
        />
        <p className="text-sm text-muted-foreground">
          Ensure Tailwind scans the UI package and extends the Meridian theme tokens
          (see <code className="rounded bg-muted px-1 text-xs">apps/docs/tailwind.config.ts</code>).
        </p>
      </section>
    </article>
  )
}
