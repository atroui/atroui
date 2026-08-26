import Link from "next/link"
import { ArrowRight, Send } from "lucide-react"
import { InstallCommand } from "@/components/catalog/install-command"
import { LogoMark } from "@/components/logo-mark"
import { FamilyCards } from "@/components/site/family-cards"
import { ThemeDots } from "@/components/site/theme-picker"
import { catalogCount, featuredCatalog } from "@/lib/catalog"

/**
 * Studio homepage — same beats as a craft portfolio: claim, rows, names, one card.
 */
export function LandingHero() {
  const names = featuredCatalog.slice(0, 11)

  return (
    <main className="wf-home">
      <div className="wf-claim-block">
        <ThemeDots />
        <h1 className="wf-claim">
          <span className="wf-claim-brand">AtroUI</span>
          <span className="wf-claim-rest">Component catalog</span>
        </h1>
      </div>
      <p className="wf-lede">
        Production sections for Next.js, shipped as source you keep. Heroes,
        pricing, Host APIs — files you own, defaults already decided, a catalog
        you can actually ship.
      </p>
      <div className="wf-cta-row">
        <Link href="/library" className="wf-home-btn">
          Browse components
        </Link>
        <Link href="/docs/host-api" className="wf-cta-text">
          <Send className="size-3.5" aria-hidden />
          Host APIs
        </Link>
      </div>

      <hr className="wf-rule" />

      <h2 className="wf-section-label">Catalog</h2>
      <FamilyCards />

      <hr className="wf-rule" />

      <h2 className="wf-section-label">On the registry</h2>
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
          Own the files. The CLI copies the source into your project — no
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
