import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { catalogNavItems, navigation } from "@/lib/navigation"

const blurbs: Record<string, string> = {
  Primitives: "Buttons, cards, inputs and theme controls — the building blocks.",
  Blocks: "Marketing sections and page chrome. Edit CONTENT and ship.",
  Indie: "Personal-site kit — now, projects, resume, clocks and more.",
  Tools: "OG images, thumbnails, planner and AI scoping workspaces.",
  Headless: "Analytics and structured-data helpers with no visible UI.",
}

export function CategoryGallery() {
  const sections = navigation.filter((s) => s.title !== "Getting Started")
  const total = catalogNavItems.length

  return (
    <section className="border-t border-border-subtle">
      <div className="atro-shell py-16 lg:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="ms-stamp">The catalog</p>
            <h2 className="ds-headline mt-5 text-3xl text-foreground sm:text-4xl md:text-[2.75rem]">
              {total}+ components, organized
            </h2>
            <p className="ds-lede mt-4 max-w-xl">
              Curated into clear families so you always know where to look — not
              a filesystem dump.
            </p>
          </div>
          <Link
            href="/docs/components"
            className="ms-cta-ghost h-11 shrink-0 self-start px-5 sm:self-auto"
          >
            Browse all
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => {
            const sample = section.items.slice(0, 5)
            return (
              <Link
                key={section.title}
                href="/docs/components"
                className="atro-tile group flex-col p-6"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="ds-sketch text-2xl text-foreground">
                    {section.title}
                  </h3>
                  <span className="atro-chip shrink-0">
                    {section.items.length}
                  </span>
                </div>
                <p className="ds-body mt-2 text-muted-foreground">
                  {blurbs[section.title]}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {sample.map((item) => (
                    <li
                      key={item.href}
                      className="rounded-md border border-border-subtle bg-white/[0.03] px-2 py-1 text-[12px] text-muted-foreground"
                    >
                      {item.title}
                    </li>
                  ))}
                  {section.items.length > sample.length ? (
                    <li className="rounded-md px-2 py-1 text-[12px] text-brand">
                      +{section.items.length - sample.length} more
                    </li>
                  ) : null}
                </ul>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
