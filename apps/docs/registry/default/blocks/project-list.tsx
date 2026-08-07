import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

/** Edit titles, descriptions, and links after install. */
const CONTENT = {
  stamp: "Projects",
  viewAllHref: "/projects",
  viewAllLabel: "view all →",
}

const PROJECTS = [
  {
    title: "Personal site kit",
    description: "Narrow chrome, command menu, and indie home sections.",
    href: "https://www.atroui.com",
    tags: ["Next.js", "Registry"],
  },
  {
    title: "Studio tools",
    description: "OG images, scope chat, and host-bound demos.",
    href: "https://www.atroui.com/docs",
    tags: ["Tools", "Docs"],
  },
  {
    title: "Open source UI",
    description: "Dark-first React components you own in your repo.",
    href: "https://github.com/atroui/atroui",
    tags: ["OSS", "React"],
  },
]

export function ProjectList({
  stamp = CONTENT.stamp,
  viewAllHref = CONTENT.viewAllHref,
  viewAllLabel = CONTENT.viewAllLabel,
  projects = PROJECTS,
  limit = 4,
  className,
}: {
  stamp?: string
  viewAllHref?: string
  viewAllLabel?: string
  projects?: Array<{
    title: string
    description: string
    href: string
    tags?: string[]
  }>
  limit?: number
  className?: string
} = {}) {
  const shown = projects.slice(0, limit)
  if (shown.length === 0) return null

  return (
    <section
      id="projects"
      className={className ?? "mx-auto max-w-[640px] scroll-mt-20"}
    >
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-mono text-[10.5px] tracking-[0.12em] text-muted-foreground uppercase">
          {stamp}
        </h2>
        {projects.length > limit ? (
          <Link
            href={viewAllHref}
            className="font-mono text-[11px] text-muted-foreground hover:text-foreground"
          >
            {viewAllLabel}
          </Link>
        ) : null}
      </div>
      <ul className="divide-y divide-border-subtle border-y border-border-subtle">
        {shown.map((p) => {
          const external = /^https?:\/\//.test(p.href)
          const body = (
            <>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 text-[14.5px] font-medium text-foreground">
                  <span>{p.title}</span>
                  <ArrowUpRight
                    className="h-[12px] w-[12px] shrink-0 text-muted-foreground/50 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[2px] group-hover:translate-x-[2px] group-hover:text-muted-foreground"
                    aria-hidden
                  />
                </div>
                <p className="mt-0.5 text-[13px] leading-[1.5] text-muted-foreground">
                  {p.description}
                </p>
              </div>
              {p.tags && p.tags.length > 0 ? (
                <div className="mt-[3px] hidden shrink-0 pt-[1px] text-right font-mono text-[10.5px] text-muted-foreground/70 sm:block">
                  {p.tags.join(" · ")}
                </div>
              ) : null}
            </>
          )
          const classNameRow =
            "group -mx-0 flex items-start justify-between gap-4 rounded py-[11px] pr-1 transition-[padding,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-muted/50 hover:pl-2"

          return (
            <li key={p.href}>
              {external ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classNameRow}
                >
                  {body}
                </a>
              ) : (
                <Link href={p.href} className={classNameRow}>
                  {body}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
