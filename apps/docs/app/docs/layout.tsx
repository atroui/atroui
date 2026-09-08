import { DocsLayoutShell } from "@/components/docs-layout"
import { DocsExitFooter } from "@/components/docs/docs-exit-footer"
import { DocsHeader } from "@/components/docs/docs-header"

/**
 * Docs book room — Zed/mdBook spine + shared site chrome.
 * One type stack with the rest of the site (Merriweather + DM Sans via root). The book gets its
 * own sparse header and a thin exit strip below the chapter pager; the nav megas
 * and the mega sitemap are marketing-only (Zed dual-shell: docs.zed.dev keeps
 * the book, zed.dev keeps the storefront).
 */
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs-book">
      <DocsHeader />
      <DocsLayoutShell>{children}</DocsLayoutShell>
      <DocsExitFooter />
    </div>
  )
}
