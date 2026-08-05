import { ArrowRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"

/**
 * Edit TOOLS to swap the lab catalog. Matches docs Home Lab band.
 */
const CONTENT = {
  stamp: "Free tools",
  headlineBefore: "Proof between",
  headlineAccent: "client sprints",
  headlineAfter: ".",
  lede: "No signup. No watermark. Feel the craft before you hire it.",
  allHref: "/tools",
  allLabel: "All tools",
}

const TOOLS = [
  {
    name: "OG Image Generator",
    tagline: "Viral OG images in seconds",
    description:
      "Turn a single prompt into a polished 1200×630 Open Graph image.",
    href: "/og",
    status: "live" as const,
    highlights: ["1200×630", "One-prompt generate", "Instant download"],
    featured: true,
  },
  {
    name: "Thumbnail Generator",
    tagline: "Click-worthy thumbnails on demand",
    description:
      "YouTube, LinkedIn, and blog thumbnails from a prompt or a link.",
    href: "/thumbnail",
    status: "live" as const,
    highlights: ["YouTube 16:9", "LinkedIn", "Blog covers"],
    featured: false,
  },
  {
    name: "Smart PDF Tools",
    tagline: "Understand, extract, and transform PDFs",
    description: "Summarize, extract tables, and convert - built for makers.",
    href: "/tools#smart-pdf",
    status: "soon" as const,
    highlights: ["Summarize", "Extract tables", "Clean exports"],
    featured: false,
  },
  {
    name: "Link-to-Preview",
    tagline: "Beautiful preview cards from any URL",
    description: "Paste any link, get a designer-grade preview card.",
    href: "/tools#link-scraper",
    status: "soon" as const,
    highlights: ["Embed HTML", "Fast OG scrape", "Themeable"],
    featured: false,
  },
]

function statusLabel(status: "live" | "beta" | "soon") {
  if (status === "live") return "Live"
  if (status === "beta") return "Beta"
  return "Soon"
}

export function HomeLab() {
  const featured = TOOLS.find((t) => t.featured) ?? TOOLS[0]!
  const rest = TOOLS.filter((t) => t !== featured)

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
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              {CONTENT.lede}
            </p>
          </div>
          <Link
            href={CONTENT.allHref}
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-border-subtle px-4 text-sm font-medium"
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
            className="group grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="flex flex-col justify-between gap-8 border-b border-border-subtle p-6 sm:p-8 lg:col-span-5 lg:border-r lg:border-b-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-brand,#0b7bff)]">
                    <span className="size-1.5 animate-pulse rounded-full bg-[var(--color-brand,#0b7bff)]" />
                    {statusLabel(featured.status)}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-medium text-foreground sm:text-3xl">
                  {featured.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {featured.tagline}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  {featured.description}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium group-hover:text-[var(--color-brand,#0b7bff)]">
                Open tool
                <ArrowUpRight className="size-3.5" />
              </span>
            </div>
            <div className="flex items-center justify-center bg-muted/30 p-6 sm:p-8 lg:col-span-7">
              <div className="flex aspect-[1200/630] w-full max-w-xl flex-col justify-end rounded-xl bg-gradient-to-br from-[#0a0a0a] via-[#111827] to-[#0b7bff]/30 p-6 ring-1 ring-border-subtle">
                <p className="text-xl font-medium text-white sm:text-2xl">
                  Ship in days, not quarters.
                </p>
                <p className="mt-2 text-sm text-white/70">
                  {featured.highlights.join(" · ")}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <ul className="grid grid-cols-1 divide-y divide-border-subtle md:grid-cols-3 md:divide-x md:divide-y-0">
            {rest.map((tool) => (
              <li key={tool.name}>
                <Link href={tool.href} className="group block p-6 sm:p-8">
                  <p className="text-xs font-medium text-[var(--color-brand,#0b7bff)]">
                    {statusLabel(tool.status)}
                  </p>
                  <h3 className="mt-2 text-lg font-medium text-foreground group-hover:text-[var(--color-brand,#0b7bff)]">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                  <p className="mt-4 font-mono text-[11px] text-muted-foreground">
                    {tool.highlights.join(" · ")}
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
