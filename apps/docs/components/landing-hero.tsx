import Link from "next/link"
import { ArrowRight, Send } from "lucide-react"
import { FamilyCards } from "@/components/site/family-cards"
import { InstallCommand } from "@/components/catalog/install-command"
import { catalogCount, featuredCatalog } from "@/lib/catalog"

/**
 * Studio homepage — same beats as a craft portfolio: claim, rows, names, one card.
 */
export function LandingHero() {
  const names = featuredCatalog.slice(0, 11)

  return (
    <main className="wf-home">
      <h1 className="wf-claim">
        <span className="wf-swatches" aria-hidden>
          <span style={{ background: "#7dd3e8" }} />
          <span style={{ background: "#0eb3c9" }} />
          <span style={{ background: "#f5a623" }} />
          <span style={{ background: "#e85aaa" }} />
          <span style={{ background: "#8b5cf6" }} />
          <span style={{ background: "#363636" }} />
        </span>
        AtroUI
        <br />
        Component catalog
      </h1>
      <p className="wf-lede">
        Production sections for Next.js, shipped as source you keep. From heroes
        and pricing to Host APIs on your keys, the work focuses on files you own,
        thoughtful defaults, and a catalog you can actually ship. If that
        resonates, start with a section.
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

      <hr className="wf-rule" />

      <div className="wf-statement">
        <p>
          Own the files. The CLI copies the source into your project — no
          package lock-in, no black box.
        </p>
        <InstallCommand command="npx shadcn@latest add @atroui/home-hero" />
        <div className="wf-statement-foot">
          <span>AtroUI</span>
          <span>MIT · {catalogCount} on the registry</span>
        </div>
      </div>
    </main>
  )
}
