import Link from "next/link"
import { FaqJsonLd } from "atroui"
import { DocsArticleHeader } from "@/components/docs/docs-article-header"
import { DocsPager } from "@/components/docs-pager"
import { atrouiFacts, tailwindPlusFacts } from "@/lib/competitors"

const code =
  "rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground"

const PAGE = "/docs/compare/tailwind-plus-alternative"

export function CompareTailwindPlusAlternative() {
  return (
    <article className="space-y-10">
      <DocsArticleHeader
        eyebrow="Alternatives"
        title="Tailwind Plus alternative"
        lede={
          <>
            Tailwind Plus (ex–Tailwind UI) closed new purchases after Tailwind
            Labs joined Shopify. If you need ownable React / Next sections{" "}
            <em>without</em> a legacy Plus seat, AtroUI is a registry-native
            option — MIT sections plus Host APIs with BYOK.
          </>
        }
      />

      <section className="space-y-3">
        <h2 className="docs-section-title" id="status">
          What happened to Tailwind Plus
        </h2>
        <p className="leading-relaxed">
          <strong className="font-medium text-foreground">
            {tailwindPlusFacts.status}
          </strong>
          . Historical pricing was {tailwindPlusFacts.paidFrom}. Existing
          licensees keep access; new buyers cannot sign up. Demand for
          expert-shaped Tailwind blocks now flows toward shadcn registries and
          freemium kits.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="docs-section-title" id="atroui">
          AtroUI as a Tailwind Plus alternative
        </h2>
        <p className="leading-relaxed">
          AtroUI is not “cheaper Tailwind UI.” It is a dark-first{" "}
          <strong className="font-medium text-foreground">
            shadcn registry catalog
          </strong>
          :{" "}
          <code className={code}>npx shadcn add @atroui/…</code> copies source
          into your repo. Host APIs add hardened form and AI routes on your
          keys. Live rooms on atroui.com match the install.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 font-medium">Dimension</th>
                <th className="py-2 pr-4 font-medium">AtroUI</th>
                <th className="py-2 font-medium">Tailwind Plus</th>
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["New buyers", "Open — free-first MIT", tailwindPlusFacts.status],
                  ["Install", atrouiFacts.install, "Account download (legacy)"],
                  ["Host APIs", atrouiFacts.hostApis, tailwindPlusFacts.hostApis],
                  ["Taste", atrouiFacts.taste, "Clean corporate / expert examples"],
                ] as const
              ).map(([dim, a, b]) => (
                <tr key={dim} className="border-b border-border/60 align-top">
                  <td className="py-2.5 pr-4 text-muted-foreground">{dim}</td>
                  <td className="py-2.5 pr-4">{a}</td>
                  <td className="py-2.5">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="who">
          Who should pick what
        </h2>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed">
          <li>
            <strong className="text-foreground">Already own Plus</strong> —
            keep using your licensed examples; add AtroUI only where registry
            sections or Host APIs help.
          </li>
          <li>
            <strong className="text-foreground">Need sections now, no Plus seat</strong>{" "}
            — AtroUI, or Pro catalogs like{" "}
            <Link href="/docs/compare/aceternity-alternative" className="bam-link">
              Aceternity
            </Link>{" "}
            /{" "}
            <Link href="/docs/compare/magic-ui-alternative" className="bam-link">
              Magic UI
            </Link>{" "}
            if you want paid spectacle.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="docs-section-title" id="try">
          Try AtroUI
        </h2>
        <pre className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-[13px]">
          {`npx shadcn@latest add @atroui/home-hero
npx shadcn@latest add @atroui/waitlist-form`}
        </pre>
      </section>

      <div className="flex flex-wrap gap-3 pt-2">
        <Link href="/docs/installation" className="atro-btn">
          Installation
        </Link>
        <Link href="/docs/compare/alternatives" className="atro-btn-ghost">
          All alternatives
        </Link>
        <Link href="/docs/host-api" className="atro-btn-ghost">
          Host APIs
        </Link>
      </div>

      <FaqJsonLd
        pagePath={PAGE}
        items={[
          {
            question: "Is there a Tailwind Plus alternative in 2026?",
            answer:
              "Yes. New Tailwind Plus purchases are closed. AtroUI offers MIT shadcn-registry sections plus Host APIs with BYOK. Magic UI and Aceternity UI remain paid Pro options for motion-heavy catalogs.",
          },
          {
            question: "Can I still use Tailwind Plus if I already bought it?",
            answer:
              "Existing licensees keep access. AtroUI can sit beside Plus examples in the same Next app via the shadcn CLI.",
          },
          {
            question: "Is AtroUI the same as Tailwind UI?",
            answer:
              "No. AtroUI is a dark-first registry catalog with live rooms and optional BYOK Host APIs — not an official Tailwind Labs product.",
          },
        ]}
      />

      <DocsPager href={PAGE} kind="guides" />
    </article>
  )
}
