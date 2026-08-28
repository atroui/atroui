import Link from "next/link"

const shell =
  "mx-auto w-full max-w-7xl px-4 py-12 sm:px-8 sm:py-16 md:px-12 lg:px-20 lg:py-20 xl:px-24"

/**
 * Catalog bridge after the cinematic hero + stage (P2).
 * shadcn puts CardsDemo on `/`; we keep PresenceHero and land users in a
 * browseable grid that shares the same room as /docs/components.
 */
const FEATURED = [
  {
    title: "Site Header",
    href: "/docs/components/site-header",
    registry: "site-header",
    blurb: "Sticky product chrome",
  },
  {
    title: "Button",
    href: "/docs/components/ui-button",
    registry: "button",
    blurb: "Primary action control",
  },
  {
    title: "Home Hero",
    href: "/docs/components/home-hero",
    registry: "home-hero",
    blurb: "Production hero block",
  },
  {
    title: "Contact Form",
    href: "/docs/components/contact-contact-form",
    registry: "contact-form",
    blurb: "UI + Host API (BYOK)",
  },
  {
    title: "OG Workspace",
    href: "/docs/components/og-og-workspace",
    registry: "og-workspace",
    blurb: "Social cards on your keys",
  },
  {
    title: "Command Menu",
    href: "/docs/components/command-menu",
    registry: "command-menu",
    blurb: "⌘K navigation",
  },
  {
    title: "FAQ",
    href: "/docs/components/faq-interactive-preview",
    registry: "faq",
    blurb: "Interactive accordion",
  },
  {
    title: "Theme Toggle",
    href: "/docs/components/ui-theme-toggle",
    registry: "theme-toggle",
    blurb: "Light / system / dark",
  },
] as const

export function CatalogBridge() {
  return (
    <section
      className="border-t border-white/10"
      aria-labelledby="catalog-bridge-title"
    >
      <div className={shell}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="ms-stamp">Catalog</p>
            <h2
              id="catalog-bridge-title"
              className="ds-display mt-4 text-2xl leading-snug sm:mt-5 sm:text-3xl md:text-4xl"
            >
              Browse what you{" "}
              <span className="ds-sketch-accent">install</span>
            </h2>
            <p className="ds-lede mt-3 max-w-md text-neutral-400 sm:mt-4">
              Same exports as the docs previews — open a page, copy the install
              line, own the file.
            </p>
          </div>
          <Link
            href="/docs/components"
            className="ds-hero-nav-link shrink-0 self-start sm:self-auto"
          >
            All components →
          </Link>
        </div>

        <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((item) => (
            <li key={item.href} className="bg-black">
              <Link
                href={item.href}
                className="group flex h-full flex-col gap-2 bg-white/2 px-4 py-4 transition-colors hover:bg-white/5 sm:px-5 sm:py-5"
              >
                <span className="font-mono text-[11px] tracking-[0.12em] text-[color:var(--ds-cyan,#92dbe0)] uppercase">
                  {item.registry}
                </span>
                <span className="ds-sketch text-lg text-white transition-colors group-hover:text-sky-300 sm:text-xl">
                  {item.title}
                </span>
                <span className="ds-meta text-neutral-500">{item.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
