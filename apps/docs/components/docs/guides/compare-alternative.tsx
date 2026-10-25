import Link from "next/link"
import { FaqJsonLd } from "atroui"
import { DocsArticleHeader } from "@/components/docs/docs-article-header"
import { DocsPager } from "@/components/docs-pager"
import {
  alternativeHref,
  atrouiFacts,
  compareHref,
  competitors,
  type CompetitorSlug,
} from "@/lib/competitors"

const code =
  "rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground"

type Props = {
  slug: CompetitorSlug
  faqPrimary: { question: string; answer: string }
}

/**
 * Singular “[Competitor] alternative” SEO page — honesty-first.
 * Complements vs pages; targets switch / alternative intent.
 */
export function CompareAlternative({ slug, faqPrimary }: Props) {
  const peer = competitors[slug]
  const otherSlug: CompetitorSlug =
    slug === "aceternity" ? "magic-ui" : "aceternity"
  const other = competitors[otherSlug]
  const pagePath = alternativeHref(slug)

  return (
    <article className="space-y-10">
      <DocsArticleHeader
        eyebrow="Alternatives"
        title={<>{peer.name} alternative</>}
        lede={
          <>
            Looking past {peer.name}? AtroUI is a shadcn-registry option for MIT
            production sections and Host APIs with BYOK. Stay on {peer.name} if{" "}
            {peer.bestFor.toLowerCase()}. Full table:{" "}
            <Link href={compareHref(slug)} className="bam-link">
              AtroUI vs {peer.name}
            </Link>
            .
          </>
        }
      />

      <section className="space-y-3">
        <h2 className="docs-section-title" id="why-look">
          Why people look for a {peer.name} alternative
        </h2>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed">
          {peer.limitations.map((item) => (
            <li key={item}>{item}</li>
          ))}
          <li>
            Prefer free-first sections without a Pro registry token for day-one
            shipping.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="docs-section-title" id="summary">
          AtroUI as an alternative
        </h2>
        <p className="leading-relaxed">
          <strong className="font-medium text-foreground">AtroUI</strong> ships
          dark-first production sections via{" "}
          <code className={code}>npx shadcn add @atroui/…</code>. You own the
          files. Optional Host APIs harden waitlist, contact, OG, and scope on{" "}
          <em>your</em> keys — missing keys return 503. Live rooms (
          <Link href="/launch" className="bam-link">
            /launch
          </Link>
          ,{" "}
          <Link href="/landing" className="bam-link">
            /landing
          </Link>
          ) match the install.
        </p>
        <p className="leading-relaxed">
          It is <strong className="font-medium text-foreground">not</strong> a
          beam/marquee catalog. If spectacle is the job, keep {peer.name}.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="comparison">
          Quick comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 font-medium text-foreground">
                  Dimension
                </th>
                <th className="py-2 pr-4 font-medium text-foreground">AtroUI</th>
                <th className="py-2 font-medium text-foreground">{peer.name}</th>
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["Sections price", atrouiFacts.paidFrom, peer.paidFrom],
                  ["Host APIs / BYOK", atrouiFacts.hostApis, peer.hostApis],
                  ["Taste", atrouiFacts.taste, peer.taste],
                  ["Install", atrouiFacts.install, peer.install],
                ] as const
              ).map(([dim, a, b]) => (
                <tr key={dim} className="border-b border-border/60 align-top">
                  <td className="py-2.5 pr-4 text-muted-foreground">{dim}</td>
                  <td className="py-2.5 pr-4 text-foreground">{a}</td>
                  <td className="py-2.5 text-foreground">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="who">
          Who should switch — and who should not
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-[15px] font-medium text-foreground">
              Switch to AtroUI if…
            </h3>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              {atrouiFacts.bestFor}.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-[15px] font-medium text-foreground">
              Stay on {peer.name} if…
            </h3>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              {peer.bestFor}.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="migrate">
          Switching without a rewrite
        </h2>
        <p className="leading-relaxed">
          Keep {peer.name} effects you already like. Add AtroUI sections beside
          them — same CLI ownership model as shadcn.
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-[15px] leading-relaxed">
          <li>
            Confirm Tailwind v4 and a working{" "}
            <code className={code}>components.json</code>.
          </li>
          <li>
            Run{" "}
            <code className={code}>
              npx shadcn@latest add @atroui/home-hero
            </code>
            .
          </li>
          <li>
            Edit <code className={code}>CONTENT</code> at the top of the file.
          </li>
          <li>
            Optional: add Host API routes from{" "}
            <Link href="/docs/host-api" className="bam-link">
              Host APIs
            </Link>
            .
          </li>
        </ol>
        <p className="text-[14px] text-muted-foreground">
          Also see{" "}
          <Link href={alternativeHref(otherSlug)} className="bam-link">
            {other.name} alternative
          </Link>
          ,{" "}
          <Link href="/docs/compare/alternatives" className="bam-link">
            kit alternatives hub
          </Link>
          , and{" "}
          <Link href="/docs/migrate" className="bam-link">
            Coming from…
          </Link>
          .
        </p>
      </section>

      <div className="flex flex-wrap gap-3 pt-2">
        <Link href="/docs/installation" className="atro-btn">
          Installation
        </Link>
        <Link href={compareHref(slug)} className="atro-btn-ghost">
          Full vs {peer.name}
        </Link>
        <Link href="/docs/host-api" className="atro-btn-ghost">
          Host APIs
        </Link>
      </div>

      <FaqJsonLd
        pagePath={pagePath}
        items={[
          faqPrimary,
          {
            question: `Is AtroUI a free ${peer.name} alternative?`,
            answer: `AtroUI’s MIT catalog is free-first with no Pro wall on sections. ${peer.name} offers a free layer plus paid Pro for most composed marketing sections (${peer.paidFrom}).`,
          },
          {
            question: `Can I use AtroUI with ${peer.name}?`,
            answer: `Yes. Both follow the shadcn registry model. Many teams keep ${peer.name} free effects and add AtroUI sections or Host APIs beside them.`,
          },
          {
            question: `When should I not switch from ${peer.name}?`,
            answer: peer.bestFor,
          },
        ]}
      />

      <DocsPager href={pagePath} kind="guides" />
    </article>
  )
}
