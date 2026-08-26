import Link from "next/link"
import { catalogCount } from "@/lib/catalog"

const GITHUB_REPO = "https://github.com/atroui/atroui"

const columns = [
  {
    heading: "Catalog",
    links: [
      { href: "/library", label: "Components" },
      { href: "/library?family=Blocks", label: "Blocks" },
      { href: "/docs/host-api", label: "Host APIs" },
      { href: "/docs/registry", label: "Registry" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { href: "/docs", label: "Documentation" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/theming", label: "Theming" },
      { href: "/docs/glossary", label: "Glossary" },
    ],
  },
  {
    heading: "More",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/updates", label: "Updates" },
      { href: "/docs/changelog", label: "Changelog" },
      { href: GITHUB_REPO, label: "GitHub", external: true },
    ],
  },
] as const

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="spec-shell grid gap-10 py-10 md:grid-cols-[1.4fr_repeat(3,1fr)] md:gap-8">
        <div className="max-w-xs">
          <p className="text-lg font-medium tracking-[-0.03em] text-foreground">AtroUI</p>
          <p className="spec-body mt-3 text-muted-foreground">
            {catalogCount} production components and Host APIs for Next.js. Install
            with the shadcn CLI and own the source.
          </p>
        </div>

        {columns.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <h2 className="spec-label">{column.heading}</h2>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="spec-shell flex flex-col gap-2 border-t border-[var(--line)] py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="spec-num">MIT · © {new Date().getFullYear()} AtroUI</p>
        <p className="spec-num">
          Built by{" "}
          <a
            href="https://www.makershot.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Makershot
          </a>
        </p>
      </div>
    </footer>
  )
}
