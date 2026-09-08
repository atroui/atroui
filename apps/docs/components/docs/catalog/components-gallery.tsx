import Link from "next/link"
import { ComponentGallery } from "@/components/gallery/component-gallery"
import { catalogNavItems } from "@/lib/navigation"

const DOORS = [
  {
    href: "/docs/components/home-hero",
    label: "Hero",
    note: "Own the first scroll",
  },
  {
    href: "/docs/components/ui-button",
    label: "Button",
    note: "Canonical CTA",
  },
  {
    href: "/docs/components/brand-waitlist-form",
    label: "Waitlist",
    note: "Capture + Host API",
  },
] as const

export function ComponentsGalleryPage() {
  return (
    <article className="space-y-10">
      <header className="docs-book-header docs-catalog-arrival">
        <p className="docs-book-eyebrow">
          Catalog · {catalogNavItems.length}
        </p>
        <h1 className="docs-book-title">Components</h1>
        <p className="docs-book-lede docs-catalog-lede">
          Open a block, then{" "}
          <code>npx shadcn@latest add @atroui/…</code>. Previews live on each
          page —{" "}
          <Link href="/docs/host-api" className="bam-link">
            Host API
          </Link>{" "}
          items need your keys.
        </p>

        <ol className="docs-catalog-doors">
          {DOORS.map((door, i) => (
            <li key={door.href}>
              <Link href={door.href} className="docs-catalog-door">
                <span className="docs-catalog-door-index" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="docs-catalog-door-body">
                  <span className="docs-catalog-door-label">{door.label}</span>
                  <span className="docs-catalog-door-note">{door.note}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </header>

      <ComponentGallery />
    </article>
  )
}
