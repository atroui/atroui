import Link from "next/link"
import { Github } from "lucide-react"
import { LogoMark } from "@/components/logo-mark"

const GITHUB_REPO = "https://github.com/atroui/atroui"
const NPM_URL = "https://www.npmjs.com/package/atroui"

type FooterLink = { label: string; href: string; external?: boolean }

const columns: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Components", href: "/docs/components" },
      { label: "Registry", href: "/docs/registry" },
      { label: "Host APIs", href: "/docs/host-api" },
      { label: "Theming", href: "/docs/theming" },
      { label: "Collections", href: "/docs/collections" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Launch workflow", href: "/docs/guides/launch-workflow" },
      { label: "Compare", href: "/docs/compare" },
      { label: "Changelog", href: "/docs/changelog" },
    ],
  },
  {
    heading: "More",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Updates", href: "/updates" },
      { label: "Brand kit", href: "/docs/brand" },
      { label: "Glossary", href: "/docs/glossary" },
      { label: "npm · atroui", href: NPM_URL, external: true },
    ],
  },
]

function FooterAnchor({ link }: { link: FooterLink }) {
  const className =
    "text-[13px] text-muted-foreground transition-colors hover:text-foreground"
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {link.label}
      </a>
    )
  }
  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  )
}

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border-subtle bg-background">
      <div className="atro-shell py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              aria-label="AtroUI home"
            >
              <LogoMark className="size-7 text-foreground" />
              <span className="ds-sketch text-2xl tracking-tight text-foreground">
                AtroUI
              </span>
            </Link>
            <p className="ds-body mt-4 max-w-xs text-muted-foreground">
              Dark-first React &amp; Next.js catalog on the official shadcn
              registry. Own the source in your repo. Bring your own keys for
              Host APIs.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border-subtle bg-white/[0.03] px-3 text-[13px] font-medium text-foreground transition-colors hover:bg-white/[0.06]"
              >
                <Github className="size-4" aria-hidden />
                GitHub
              </a>
              <span className="atro-chip">MIT licensed</span>
              <span className="atro-chip">Tailwind v4</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {columns.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h3 className="ds-mono-label mb-3.5">{column.heading}</h3>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterAnchor link={link} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="ds-meta">
            © {new Date().getFullYear()}{" "}
            <span className="ds-sketch text-sm text-foreground">AtroUI</span>
            {" · "}atroui.com
          </p>
          <div className="ds-meta flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href="https://www.iamk.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              iamk.xyz
            </a>
            <a
              href="https://www.makershot.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              makershot.tech
            </a>
            <Link
              href="/docs"
              className="transition-colors hover:text-foreground"
            >
              Docs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
