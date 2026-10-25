import Link from "next/link"
import { FaqJsonLd } from "atroui"
import { DocsArticleHeader } from "@/components/docs/docs-article-header"
import { DocsPager } from "@/components/docs-pager"
import {
  atrouiFacts,
  compareHref,
  competitors,
  type CompetitorSlug,
} from "@/lib/competitors"

const code =
  "rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground"

type Props = {
  slug: CompetitorSlug
  /** Primary SEO question for FAQ schema */
  faqPrimary: { question: string; answer: string }
}

export function CompareBattle({ slug, faqPrimary }: Props) {
  const peer = competitors[slug]
  const otherSlug: CompetitorSlug =
    slug === "aceternity" ? "magic-ui" : "aceternity"
  const other = competitors[otherSlug]
  const pagePath = compareHref(slug)

  const rows: [string, string, string][] = [
    ["Shelf", atrouiFacts.sectionsModel, peer.sectionsModel],
    ["Price to ship sections", atrouiFacts.paidFrom, peer.paidFrom],
    ["Free tier", atrouiFacts.freeTier, peer.freeTier],
    ["Host APIs / BYOK", atrouiFacts.hostApis, peer.hostApis],
    ["Live rooms", atrouiFacts.liveRooms, peer.liveRooms],
    ["Install", atrouiFacts.install, peer.install],
    ["Agents", atrouiFacts.agents, peer.agents],
    ["Taste", atrouiFacts.taste, peer.taste],
  ]

  return (
    <article className="space-y-10">
      <DocsArticleHeader
        eyebrow="Compare"
        title={
          <>
            AtroUI vs {peer.name}
          </>
        }
        lede={
          <>
            Honest side-by-side for shadcn builders. Both install via the
            registry. The fork is sections you own for free, Host APIs on your
            keys, and taste — not who has more beams. Hub:{" "}
            <Link href="/docs/compare" className="bam-link">
              Compare
            </Link>
            .
          </>
        }
      />

      <section className="space-y-3">
        <h2 className="docs-section-title" id="tldr">
          TL;DR
        </h2>
        <p className="leading-relaxed">
          <strong className="font-medium text-foreground">{peer.name}</strong>{" "}
          wins on {peer.strengths[0]?.toLowerCase() ?? "catalog mindshare"} and
          a paid Pro surface for landing blocks.{" "}
          <strong className="font-medium text-foreground">AtroUI</strong> wins
          when you want MIT production sections, Host APIs with BYOK, and live
          rooms that match{" "}
          <code className={code}>npx shadcn add @atroui/…</code>. Pick{" "}
          {peer.name} if you need their Pro catalog. Pick AtroUI if lock-in,
          paywalls on sections, or AI-slop atmosphere are the deal-breakers.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="at-a-glance">
          At a glance
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
              {rows.map(([dim, a, b]) => (
                <tr key={dim} className="border-b border-border/60 align-top">
                  <td className="py-2.5 pr-4 text-muted-foreground">{dim}</td>
                  <td className="py-2.5 pr-4 text-foreground">{a}</td>
                  <td className="py-2.5 text-foreground">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[13px] text-muted-foreground">
          Peer pricing from{" "}
          <a
            href={peer.pricingUrl}
            className="bam-link"
            rel="noopener noreferrer"
            target="_blank"
          >
            their pricing page
          </a>{" "}
          (checked 2026-10-25). Verify before buying.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="sections">
          Sections and ownership
        </h2>
        <p className="leading-relaxed">
          {peer.name} ships a strong free layer of animated components, then
          puts most composed marketing sections behind Pro (
          {peer.paidFrom}). That is a clear business — and a wall if you need
          heroes, pricing, and waitlists without a license token.
        </p>
        <p className="leading-relaxed">
          AtroUI ships production sections on the official{" "}
          <code className={code}>@atroui</code> registry under MIT. You run the
          CLI, edit{" "}
          <code className={code}>CONTENT</code> at the top of the file, and own
          the PR. No Pro registry token for the catalog.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="host-apis">
          Host APIs and keys
        </h2>
        <p className="leading-relaxed">
          {peer.name} does not sell a Host API / BYOK line. Forms and AI tools
          are your problem after you paste the UI.
        </p>
        <p className="leading-relaxed">
          AtroUI pairs UI with hardened{" "}
          <Link href="/docs/host-api" className="bam-link">
            Host API
          </Link>{" "}
          routes (
          <code className={code}>atroui/api/*</code>
          ): waitlist, contact, newsletter, OG, thumbnail, scope. Keys stay in{" "}
          <em>your</em>{" "}
          <code className={code}>.env</code>. Missing keys → 503 on paid paths —
          we never run your OpenAI bill on atroui.com.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="taste">
          Taste and rooms
        </h2>
        <p className="leading-relaxed">
          {peer.name}: {peer.taste}. That is a feature if spectacle is the job.
        </p>
        <p className="leading-relaxed">
          AtroUI: soft-rect defaults, dark-first axes, live rooms (
          <Link href="/landing" className="bam-link">
            /landing
          </Link>
          ,{" "}
          <Link href="/launch" className="bam-link">
            /launch
          </Link>
          ,{" "}
          <Link href="/themes" className="bam-link">
            /themes
          </Link>
          ) that preview the same installables. We refuse glow-orb identity on
          purpose.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="who">
          Who should pick which
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-[15px] font-medium text-foreground">
              Pick AtroUI if…
            </h3>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              {atrouiFacts.bestFor}.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-[15px] font-medium text-foreground">
              Pick {peer.name} if…
            </h3>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              {peer.bestFor}.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="try">
          Try AtroUI without a rewrite
        </h2>
        <p className="leading-relaxed">
          Keep {peer.name} effects you already like. Add one AtroUI section
          beside them — same CLI model as shadcn.
        </p>
        <pre className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-[13px] text-foreground">
          {`npx shadcn@latest add @atroui/home-hero
npx shadcn@latest add @atroui/api-waitlist`}
        </pre>
        <p className="text-[14px] text-muted-foreground">
          Agents:{" "}
          <Link href="/docs/guides/for-agents" className="bam-link">
            for-agents
          </Link>{" "}
          ·{" "}
          <Link href="/docs/mcp" className="bam-link">
            MCP
          </Link>
          . Also see{" "}
          <Link href={compareHref(otherSlug)} className="bam-link">
            AtroUI vs {other.name}
          </Link>
          .
        </p>
      </section>

      <div className="flex flex-wrap gap-3 pt-2">
        <Link href="/docs/installation" className="atro-btn">
          Installation
        </Link>
        <Link href="/launch" className="atro-btn-ghost">
          Open Launch Room
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
            question: `Does AtroUI replace ${peer.name}?`,
            answer: `No. Many teams keep ${peer.name} free effects and add AtroUI sections or Host APIs beside them. Both use the shadcn registry ownership model.`,
          },
          {
            question: "Is AtroUI free?",
            answer:
              "Yes for the MIT catalog and free-first product. Host APIs run on your keys — you pay your own providers, not an AtroUI Pro seat for sections.",
          },
          {
            question: `When should I stay on ${peer.name}?`,
            answer: peer.bestFor,
          },
        ]}
      />

      <DocsPager href={pagePath} kind="guides" />
    </article>
  )
}
