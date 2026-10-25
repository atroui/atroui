import Link from "next/link"
import { FaqJsonLd } from "atroui"
import { DocsArticleHeader } from "@/components/docs/docs-article-header"
import { DocsPager } from "@/components/docs-pager"
import { atrouiFacts, competitors, tailwindPlusFacts } from "@/lib/competitors"

const PAGE = "/docs/compare/alternatives"

const OPTIONS = [
  {
    name: "AtroUI",
    href: "/docs",
    blurb: atrouiFacts.bestFor,
    price: atrouiFacts.paidFrom,
  },
  {
    name: competitors.aceternity.name,
    href: "/docs/compare/aceternity-alternative",
    blurb: competitors.aceternity.bestFor,
    price: competitors.aceternity.paidFrom,
  },
  {
    name: competitors["magic-ui"].name,
    href: "/docs/compare/magic-ui-alternative",
    blurb: competitors["magic-ui"].bestFor,
    price: competitors["magic-ui"].paidFrom,
  },
  {
    name: "shadcn/ui",
    href: "/docs/migrate",
    blurb:
      "Primitives and design-system foundation — then add AtroUI sections beside them",
    price: "$0",
  },
  {
    name: tailwindPlusFacts.name,
    href: "/docs/compare/tailwind-plus-alternative",
    blurb: tailwindPlusFacts.bestFor,
    price: tailwindPlusFacts.paidFrom,
  },
] as const

export function CompareAlternativesHub() {
  return (
    <article className="space-y-10">
      <DocsArticleHeader
        eyebrow="Alternatives"
        title="Alternatives to copy-paste UI kits"
        lede={
          <>
            Criteria for picking a shadcn-era catalog, then honest options —
            including when AtroUI is the wrong fit. Direct battles:{" "}
            <Link href="/docs/compare/vs-aceternity" className="bam-link">
              vs Aceternity
            </Link>
            ,{" "}
            <Link href="/docs/compare/vs-magic-ui" className="bam-link">
              vs Magic UI
            </Link>
            .
          </>
        }
      />

      <section className="space-y-3">
        <h2 className="docs-section-title" id="criteria">
          What to look for
        </h2>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed">
          <li>
            <strong className="text-foreground">Ownership</strong> — CLI copies
            source into your repo, or you stay locked to npm / a license token.
          </li>
          <li>
            <strong className="text-foreground">Altitude</strong> — primitives
            only vs production sections (heroes, pricing, waitlist).
          </li>
          <li>
            <strong className="text-foreground">Keys</strong> — whether forms/AI
            routes ship as BYOK Host APIs or DIY after paste.
          </li>
          <li>
            <strong className="text-foreground">Taste</strong> — soft-rect /
            dark-first vs high-motion spectacle.
          </li>
          <li>
            <strong className="text-foreground">Price to ship a page</strong> —
            MIT free-first vs Pro walls on sections.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="options">
          Options
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 font-medium">Option</th>
                <th className="py-2 pr-4 font-medium">Best for</th>
                <th className="py-2 font-medium">Price signal</th>
              </tr>
            </thead>
            <tbody>
              {OPTIONS.map((opt) => (
                <tr key={opt.name} className="border-b border-border/60 align-top">
                  <td className="py-2.5 pr-4">
                    <Link href={opt.href} className="bam-link">
                      {opt.name}
                    </Link>
                  </td>
                  <td className="py-2.5 pr-4 text-muted-foreground">{opt.blurb}</td>
                  <td className="py-2.5 text-foreground">{opt.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="docs-section-title" id="by-job">
          Pick by job
        </h2>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed">
          <li>
            <strong className="text-foreground">MIT sections + BYOK routes</strong>{" "}
            — AtroUI (
            <Link href="/docs/host-api" className="bam-link">
              Host APIs
            </Link>
            ).
          </li>
          <li>
            <strong className="text-foreground">Max motion / Pro blocks</strong>{" "}
            —{" "}
            <Link href="/docs/compare/magic-ui-alternative" className="bam-link">
              Magic UI
            </Link>{" "}
            or{" "}
            <Link href="/docs/compare/aceternity-alternative" className="bam-link">
              Aceternity
            </Link>
            .
          </li>
          <li>
            <strong className="text-foreground">Atoms only</strong> — shadcn/ui,
            then add a section catalog.
          </li>
          <li>
            <strong className="text-foreground">Had Plus, need a path forward</strong>{" "}
            —{" "}
            <Link
              href="/docs/compare/tailwind-plus-alternative"
              className="bam-link"
            >
              Tailwind Plus alternative
            </Link>
            .
          </li>
        </ul>
      </section>

      <div className="flex flex-wrap gap-3 pt-2">
        <Link href="/docs/installation" className="atro-btn">
          Install AtroUI
        </Link>
        <Link href="/docs/compare" className="atro-btn-ghost">
          Compare hub
        </Link>
      </div>

      <FaqJsonLd
        pagePath={PAGE}
        items={[
          {
            question: "What are the best alternatives to copy-paste UI kits?",
            answer:
              "Depends on the job: AtroUI for MIT sections and Host APIs with BYOK; Magic UI or Aceternity for Pro motion catalogs; shadcn/ui for primitives; Tailwind Plus only if you already hold a license.",
          },
          {
            question: "Is AtroUI free?",
            answer:
              "Yes for the MIT catalog and free-first product. Host APIs run on your provider keys.",
          },
        ]}
      />

      <DocsPager href={PAGE} kind="guides" />
    </article>
  )
}
