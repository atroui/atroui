import {
  ArrowUpRight,
  Blocks,
  Gauge,
  Layers,
  Palette,
  Terminal,
  Zap,
} from "lucide-react"

/**
 * Edit CONTENT / FEATURES for your product. Bento grid — one wide card,
 * one tall card, and supporting cells. Soft-rect panels only.
 * After install this file lives in your repo.
 */
const CONTENT = {
  stamp: "Product",
  headlineBefore: "One kit,",
  headlineAccent: "every section",
  headlineAfter: ".",
  lede: "Replace these with your real product pillars. Keep one job per card.",
}

const FEATURES = [
  {
    icon: Layers,
    title: "Sections that compose",
    detail:
      "Heroes, pricing, FAQs, and forms share tokens — so any page looks designed, not assembled.",
    span: "md:col-span-2",
  },
  {
    icon: Zap,
    title: "Fast by default",
    detail: "Server-first blocks with motion that respects reduced motion.",
    span: "",
  },
  {
    icon: Palette,
    title: "Themed in minutes",
    detail: "Accent, surface, and radius axes — no theme soup.",
    span: "",
  },
  {
    icon: Terminal,
    title: "Owned source",
    detail: "The CLI installs files into your repo. Edit copy, fork layout, keep git history.",
    span: "",
  },
  {
    icon: Gauge,
    title: "Production hardening",
    detail: "Focus states, safe-area insets, and contrast checked before you ship.",
    span: "",
  },
  {
    icon: Blocks,
    title: "Grows with you",
    detail:
      "Start with a hero and a form. Add dashboards, tools, and docs without rewriting.",
    span: "md:col-span-2",
  },
]

export function FeatureBento() {
  return (
    <section className="border-t border-border-subtle bg-background text-foreground">
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle px-6 py-12 sm:px-10 sm:py-16">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {CONTENT.stamp}
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
              {CONTENT.headlineBefore}{" "}
              <span className="italic text-brand">{CONTENT.headlineAccent}</span>
              {CONTENT.headlineAfter}
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              {CONTENT.lede}
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {FEATURES.map((feature) => (
              <li
                key={feature.title}
                className={`group rounded-[var(--atro-panel-radius)] border border-border-subtle bg-card p-6 transition-colors hover:border-[color-mix(in_oklch,var(--brand)_45%,var(--border-subtle))] sm:p-7 ${feature.span}`}
              >
                <span className="inline-flex size-9 items-center justify-center rounded-[var(--atro-control-radius)] border border-border-subtle bg-muted/60 text-foreground transition-colors group-hover:border-[color-mix(in_oklch,var(--brand)_40%,transparent)] group-hover:text-brand">
                  <feature.icon className="size-4" aria-hidden />
                </span>
                <h3 className="mt-4 flex items-center gap-1.5 text-[15px] font-medium tracking-tight text-foreground">
                  {feature.title}
                  <ArrowUpRight
                    className="size-3.5 opacity-0 transition-opacity group-hover:opacity-60"
                    aria-hidden
                  />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
