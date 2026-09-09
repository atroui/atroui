import Link from "next/link"
import { LogoMark } from "@/components/logo-mark"

const GITHUB_REPO = "https://github.com/atroui/atroui"

type ExitLink = { label: string; href: string; external?: boolean }

/**
 * Zed grammar: docs close with a thin exit strip, not the marketing sitemap.
 * Just enough to leave the book room — the mega footer lives on marketing pages.
 */
const links: ExitLink[] = [
  { label: "Home", href: "/" },
  { label: "Components", href: "/docs/components" },
  { label: "Blog", href: "/blog" },
  { label: "GitHub", href: GITHUB_REPO, external: true },
  { label: "Changelog", href: "/docs/changelog" },
]

function ExitAnchor({ link }: { link: ExitLink }) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="docs-exit-footer-link"
      >
        {link.label}
      </a>
    )
  }
  return (
    <Link href={link.href} className="docs-exit-footer-link">
      {link.label}
    </Link>
  )
}

export function DocsExitFooter() {
  return (
    <footer className="docs-exit-footer" aria-label="Docs footer">
      <nav
        className="docs-exit-footer-row text-muted-foreground"
        aria-label="Leave the docs"
      >
        <Link
          href="/"
          className="docs-exit-footer-mark"
          aria-label="AtroUI home"
        >
          <LogoMark className="size-4" />
        </Link>
        {links.map((link) => (
          <span key={link.label} className="docs-exit-footer-item">
            <span className="docs-exit-footer-sep" aria-hidden>
              ·
            </span>
            <ExitAnchor link={link} />
          </span>
        ))}
      </nav>
    </footer>
  )
}
