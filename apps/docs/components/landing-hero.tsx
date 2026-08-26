import Link from "next/link"
import { ArrowRight, Send } from "lucide-react"
import { InstallCommand } from "@/components/catalog/install-command"
import { LogoMark } from "@/components/logo-mark"
import { FamilyCards } from "@/components/site/family-cards"
import { catalogCount, featuredCatalog } from "@/lib/catalog"

/**
 * Specimen sheet. Each block has one copy job — name, category, proof, keep.
 */
export function LandingHero() {
  const names = featuredCatalog.slice(0, 11)

  return (
    <main className="wf-home">
      <p className="wf-stamp">
        {catalogCount.toLocaleString()} on the shadcn registry · MIT
      </p>
      <h1 className="wf-claim">AtroUI</h1>
      <p className="wf-role">Component catalog for Next.js</p>
      <p className="wf-lede">
        Install a production section and keep the source. Heroes, pricing, Host
        APIs — files in your repo, defaults already decided.
      </p>
      <div className="wf-cta-row">
        <Link href="/library" className="wf-home-btn">
          Browse the catalog
        </Link>
        <Link href="/docs/host-api" className="wf-cta-text">
          <Send className="size-3.5" aria-hidden />
          Host APIs
        </Link>
      </div>

      <hr className="wf-rule" />

      <h2 className="wf-section-label">What you install</h2>
      <FamilyCards />

      <hr className="wf-rule" />

      <h2 className="wf-section-label">Named on the registry</h2>
      <div className="wf-names">
        {names.map((entry) => (
          <Link key={entry.href} href={entry.href}>
            {entry.title}
          </Link>
        ))}
        <Link href="/library" className="wf-names-more">
          Browse all
          <ArrowRight className="size-3" aria-hidden />
        </Link>
      </div>

      <div className="wf-statement">
        <p>
          You own the files. The CLI copies AtroUI source into your project — no
          package lock-in, no black box.
        </p>
        <InstallCommand command="npx shadcn@latest add @atroui/home-hero" />
        <div className="wf-statement-foot">
          <span className="wf-statement-brand">
            <LogoMark className="size-4" />
            AtroUI
          </span>
          <span>MIT · {catalogCount} on the registry</span>
        </div>
      </div>
    </main>
  )
}
