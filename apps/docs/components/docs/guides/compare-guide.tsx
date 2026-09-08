import Link from "next/link"
import { FaqJsonLd } from "atroui"
import { DocsArticleHeader } from "@/components/docs/docs-article-header"
import { DocsPager } from "@/components/docs-pager"


export function CompareGuide() {
  return (
    <article className="space-y-10">
      <DocsArticleHeader
        eyebrow="Reference"
        title={
          <>
            AtroUI vs copy-paste kits
          </>
        }
        lede={
          <>
            Choose the tool that matches how you ship. Task paths if you already
            have a stack:{" "}
            <Link href="/docs/migrate" className="bam-link">
              Coming from…
            </Link>
            .
          </>
        }
      />

      <section className="space-y-4">
        <h2 className="docs-section-title" id="what-atroui-is">
          What AtroUI is
        </h2>
        <p className="leading-relaxed">
          A{" "}
          <strong className="font-medium text-foreground">
            production component catalog
          </strong>{" "}
          for React / Next.js, delivered the shadcn way: dark-first sections,
          site chrome, and optional Host API tools that expect your own
          backends. You add components with the CLI; source lives in your repo.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="what-copy-paste-kits-optimize-for">
          What copy-paste kits optimize for
        </h2>
        <p className="leading-relaxed">
          Many kits excel at{" "}
          <strong className="font-medium text-foreground">
            primitives you own in your repo
          </strong>{" "}
          - buttons, dialogs, forms - generated into your codebase. That is a
          strong workflow for greenfield design systems you maintain yourself.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="where-atroui-differs">
          Where AtroUI differs
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Same ownership model</strong> -{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">
              npx shadcn add @atroui/…
            </code>{" "}
            copies source into your project. Edit{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">
              CONTENT
            </code>{" "}
            at the top of each file. See the{" "}
            <Link href="/docs/registry" className="bam-link">
              Registry
            </Link>{" "}
            guide.
          </li>
          <li>
            <strong className="text-foreground">Blocks, not only atoms</strong>{" "}
            - heroes, who bands, footers, CTAs shaped by shipped products.
          </li>
          <li>
            <strong className="text-foreground">Brand chrome</strong> -{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">
              getBrand()
            </code>{" "}
            + env overrides so logos, SEO, and mail defaults stay coherent.
          </li>
          <li>
            <strong className="text-foreground">Dark-first system</strong> -
            tokens and surfaces designed for black-canvas products.
          </li>
          <li>
            <strong className="text-foreground">Host API tools</strong> -
            workspaces that call your{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">
              /api/*
            </code>{" "}
            with BYOK; docs do not burn shared LLM keys. See{" "}
            <Link href="/docs/host-api" className="bam-link">
              Host APIs
            </Link>
            .
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="when-to-pick-which">
          When to pick which
        </h2>
        <p className="leading-relaxed">
          Prefer a blank-slate kit if you want every primitive from scratch.
          Prefer AtroUI when you want a ready dark catalog with the same
          copy-into-repo workflow. Start at the{" "}
          <Link href="/docs/registry" className="bam-link">
            registry
          </Link>
          . Home:{" "}
          <a href="https://www.atroui.com" className="bam-link">
            www.atroui.com
          </a>
          .
        </p>
      </section>

      <div className="flex flex-wrap gap-3 pt-2">
        <Link href="/docs/registry" className="atro-btn">
          Own the UI
        </Link>
        <Link href="/docs/installation" className="atro-btn-ghost">
          Installation
        </Link>
        <Link href="/blog/atroui-vs-shadcn" className="atro-btn-ghost">
          AtroUI vs shadcn/ui
        </Link>
      </div>

      <FaqJsonLd
        pagePath="/docs/compare"
        items={[
          {
            question: "What is AtroUI?",
            answer: "AtroUI is a production-ready dark-first component catalog on the shadcn registry that lets you copy raw React and Next.js files directly into your repository. You retain 100% source code ownership.",
          },
          {
            question: "How does AtroUI differ from copy-paste UI kits?",
            answer: "Unlike typical copy-paste kits that provide only primitive atoms (like basic buttons or inputs), AtroUI provides fully designed blocks (heroes, pricing layouts, footers) and hardened Host API backend handlers for forms and AI workspaces under a Bring Your Own Keys (BYOK) paradigm.",
          },
          {
            question: "Does AtroUI require installing an npm dependency?",
            answer: "Pure UI layout blocks have no npm dependencies; they copy raw code. Only form components or AI workspaces that use our pre-hardened routes require installing the helper library 'atroui' to run rate-limiting and SMTP validation safely on your server.",
          },
        ]}
      />

      <DocsPager href="/docs/compare" kind="guides" />
    </article>
  )
}
