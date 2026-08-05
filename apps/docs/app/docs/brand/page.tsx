import type { Metadata } from "next"
import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Brand kit",
  description:
    "AtroUI brand kit - logo mark, Made with badge, colors, and voice guidelines for atroui.com and the npm package.",
  path: "/docs/brand",
})

export default function BrandKitPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header>
        <p className="ms-stamp mb-3">Brand</p>
        <h1 className="ds-display text-3xl text-foreground sm:text-4xl">
          Brand kit
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Assets and voice for AtroUI - the React / Next.js component library at{" "}
          <strong className="font-medium text-foreground">atroui.com</strong>.
          Use these when linking, embedding, or writing about the project.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Mark</h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Interrupted A - open letterform with a floating brand bar (
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">
            #0b7bff
          </code>
          ). Download SVGs from the docs public folder:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-[15px] text-muted-foreground">
          <li>
            <a href="/brand/atroui-mark.svg" className="bam-link" download>
              atroui-mark.svg
            </a>{" "}
            - transparent mark
          </li>
          <li>
            <a href="/brand/atroui-mark-app.svg" className="bam-link" download>
              atroui-mark-app.svg
            </a>{" "}
            - app tile
          </li>
        </ul>
        <div className="flex items-center gap-6 rounded-xl border border-border-subtle bg-black p-6">
          <img
            src="/brand/atroui-mark.svg"
            alt="AtroUI mark"
            width={48}
            height={48}
          />
          <img
            src="/brand/atroui-mark-app.svg"
            alt="AtroUI app icon"
            width={48}
            height={48}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">
          Made with badge
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Credit AtroUI on projects that ship with the catalog. Prefer linking to{" "}
          <a href="https://www.atroui.com" className="bam-link">
            www.atroui.com
          </a>
          .
        </p>
        <img
          src="/badge/atroui.svg"
          alt="Made with AtroUI"
          width={160}
          height={40}
        />
        <CodeBlock
          language="html"
          code={`<a href="https://www.atroui.com">\n  <img src="https://www.atroui.com/badge/atroui.svg" alt="Made with AtroUI" width="160" height="40" />\n</a>`}
        />
        <p className="text-[13px] text-muted-foreground">
          Or use the{" "}
          <Link href="/docs/components/seo-made-with-embed" className="bam-link">
            MadeWithEmbed
          </Link>{" "}
          component.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Colors</h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {[
            { name: "Canvas", hex: "#0a0a0a" },
            { name: "Brand", hex: "#0b7bff" },
            { name: "Accent mist", hex: "#92dbe0" },
          ].map((c) => (
            <li
              key={c.hex}
              className="overflow-hidden rounded-lg border border-border-subtle"
            >
              <div className="h-16" style={{ background: c.hex }} />
              <div className="px-3 py-2 text-xs">
                <p className="font-medium text-foreground">{c.name}</p>
                <p className="font-mono text-muted-foreground">{c.hex}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Voice</h2>
        <ul className="list-disc space-y-2 pl-5 text-[15px] text-muted-foreground">
          <li>
            Say <strong className="text-foreground">AtroUI</strong>,{" "}
            <strong className="text-foreground">atroui.com</strong>, and{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">
              npm i atroui
            </code>
            .
          </li>
          <li>
            Position as a production React / Next.js component catalog - not a
            generic shadcn clone.
          </li>
          <li>Precise, calm, product-first. Avoid hype and personal bylines on product pages.</li>
        </ul>
      </section>
    </article>
  )
}
