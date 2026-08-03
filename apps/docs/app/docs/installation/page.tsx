import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "Installation",
}

export default function InstallationPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-neutral-400">
          Getting started
        </p>
        <h1 className="text-[2rem] font-semibold tracking-tight text-neutral-950 sm:text-[2.35rem]">
          Installation
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-500 sm:text-base">
          Meridian is structured as a pnpm monorepo. Use the UI package from apps or publish it.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-[15px] font-semibold text-neutral-950">Clone & install</h2>
        <CodeBlock
          language="bash"
          code={`git clone <your-repo-url> meridian\ncd meridian\npnpm install`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-[15px] font-semibold text-neutral-950">Run the docs</h2>
        <CodeBlock language="bash" code={`pnpm dev`} />
      </section>

      <section className="space-y-4">
        <h2 className="text-[15px] font-semibold text-neutral-950">Run Storybook</h2>
        <CodeBlock language="bash" code={`pnpm storybook`} />
      </section>

      <section className="space-y-4">
        <h2 className="text-[15px] font-semibold text-neutral-950">Use in an app</h2>
        <p className="text-[15px] leading-relaxed text-neutral-500">
          Add the workspace package and import components plus the global CSS:
        </p>
        <CodeBlock
          language="tsx"
          code={`import { Button } from "@meridian/ui"\nimport "@meridian/ui/globals.css"\n\nexport function Example() {\n  return <Button>Click me</Button>\n}`}
        />
        <p className="text-[13px] text-neutral-400">
          Ensure Tailwind scans the UI package and extends Meridian theme tokens
          (see{" "}
          <code className="rounded-md bg-[#f7f8fa] px-1.5 py-0.5 font-mono text-[12px] text-neutral-700">
            apps/docs/tailwind.config.ts
          </code>
          ).
        </p>
      </section>
    </article>
  )
}
