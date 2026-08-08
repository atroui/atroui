import { ArrowRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"

/**
 * Edit PROJECTS to swap case studies. Matches docs Home Work band.
 */
const CONTENT = {
  stamp: "Selected work",
  headlineBefore: "Projects that",
  headlineAccent: "shipped",
  headlineAfter: ".",
  allHref: "/work",
  allLabel: "All case studies",
}

const PROJECTS = [
  {
    industry: "Studio product",
    type: "In-house product",
    meta: "Shipped · Free tool",
    title: "OG Image Generator - free AI social cards",
    challenge:
      "Indie makers still ship bland default OG images - or burn an afternoon in Figma for a 1200×630 card.",
    href: "/og",
    hrefLabel: "Open tool",
    outcomeLabel: "Outcome",
    outcomeValue: "1200×630",
    outcomeDetail: "Exact Open Graph canvas · free · no watermark",
    featured: true,
  },
  {
    industry: "Developer tools",
    type: "MVP Sprint",
    meta: "7 days · Fixed price",
    title: "B2B SaaS MVP shipped in 7 days",
    challenge:
      "Validated demand through a waitlist; needed auth, billing, and core workflow before a hard deadline.",
    href: "/work",
    hrefLabel: "Read case study",
    outcomeLabel: "Time to launch",
    outcomeValue: "7 days",
    featured: false,
  },
  {
    industry: "Creator tools",
    type: "AI Integration",
    meta: "2 weeks · From $2,400",
    title: "Streaming AI feature in an existing app",
    challenge:
      "Bolt-on chatbot UX was tanking retention. Needed cost-aware streaming with guardrails.",
    href: "/work",
    hrefLabel: "Read case study",
    outcomeLabel: "Activation",
    outcomeValue: "+28%",
    featured: false,
  },
  {
    industry: "Agency",
    type: "Design System",
    meta: "3 weeks · From $3,600",
    title: "Dark-first design system for a product team",
    challenge:
      "Three products, three visual languages. Needed tokens and components that scale.",
    href: "/work",
    hrefLabel: "Read case study",
    outcomeLabel: "Components",
    outcomeValue: "40+",
    featured: false,
  },
]

export function HomeWork() {
  const featured = PROJECTS.find((p) => p.featured) ?? PROJECTS[0]!
  const rest = PROJECTS.filter((p) => p !== featured)

  return (
    <section className="border-t border-border-subtle">
      <div className="border-b border-border-subtle">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border-x border-border-subtle px-6 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:py-16">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {CONTENT.stamp}
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
              {CONTENT.headlineBefore}{" "}
              <span className="italic text-[var(--color-brand,#0b7bff)]">
                {CONTENT.headlineAccent}
              </span>
              {CONTENT.headlineAfter}
            </h2>
          </div>
          <Link
            href={CONTENT.allHref}
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg border border-border-subtle px-4 text-sm font-medium"
          >
            {CONTENT.allLabel}
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </div>

      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <Link
            href={featured.href}
            className="group grid grid-cols-1 gap-0 lg:grid-cols-12"
          >
            <div className="flex flex-col justify-between gap-8 border-b border-border-subtle p-6 sm:p-8 lg:col-span-7 lg:border-r lg:border-b-0">
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span className="font-medium tracking-wide text-foreground uppercase">
                    {featured.industry}
                  </span>
                  <span aria-hidden>·</span>
                  <span>{featured.type}</span>
                  <span aria-hidden>·</span>
                  <span>{featured.meta}</span>
                </div>
                <h3 className="mt-4 text-2xl leading-tight font-medium text-foreground sm:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                  {featured.challenge}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-[var(--color-brand,#0b7bff)]">
                {featured.hrefLabel}
                <ArrowUpRight className="size-3.5" />
              </span>
            </div>
            <div className="flex flex-col justify-between gap-8 bg-muted/30 p-6 sm:p-8 lg:col-span-5">
              <div>
                <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                  {featured.outcomeLabel}
                </p>
                <p className="mt-3 text-4xl font-medium tracking-tight text-foreground">
                  {featured.outcomeValue}
                </p>
                {featured.outcomeDetail ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {featured.outcomeDetail}
                  </p>
                ) : null}
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <ul className="grid grid-cols-1 divide-y divide-border-subtle md:grid-cols-3 md:divide-x md:divide-y-0">
            {rest.map((study) => (
              <li key={study.title}>
                <Link href={study.href} className="group block p-6 sm:p-8">
                  <p className="text-xs text-muted-foreground">
                    {study.industry} · {study.type}
                  </p>
                  <h3 className="mt-3 text-lg font-medium text-foreground group-hover:text-[var(--color-brand,#0b7bff)]">
                    {study.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                    {study.challenge}
                  </p>
                  <p className="mt-4 font-mono text-[11px] text-muted-foreground">
                    {study.outcomeLabel}: {study.outcomeValue}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
