/**
 * Landing feature grid — edit FEATURES for your product.
 * Not mounted on atroui.com; registry + docs preview only.
 */

const CONTENT = {
  stamp: "Product",
  headlineBefore: "Everything you need to",
  headlineAccent: "ship the page",
  headlineAfter: ".",
  lede: "Replace these with your real product pillars. Keep one job per card.",
}

const FEATURES = [
  {
    title: "Owned source",
    detail:
      "CLI installs land in your repo. Edit copy, fork layout, keep git history.",
  },
  {
    title: "Dark-first tokens",
    detail:
      "Black canvas, brand accent, glass surfaces — light mode as an alternate.",
  },
  {
    title: "Host APIs",
    detail:
      "Optional hardened /api handlers. Bring your own keys; AtroUI holds none.",
  },
  {
    title: "Production sections",
    detail:
      "Heroes, pricing, forms, and tools extracted from shipped studio work.",
  },
  {
    title: "Brand chrome",
    detail:
      "getBrand() keeps headers, footers, and mailto coherent across pages.",
  },
  {
    title: "BYOK tools",
    detail:
      "OG, thumbnail, and scope demos run preview/rules without paid keys.",
  },
] as const

export function FeatureGrid() {
  return (
    <section className="@container border-t border-border-subtle">
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle px-6 py-12 @min-[40rem]:px-10 @min-[40rem]:py-16">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {CONTENT.stamp}
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground @min-[40rem]:text-5xl">
              {CONTENT.headlineBefore}{" "}
              <span className="italic text-brand">
                {CONTENT.headlineAccent}
              </span>
              {CONTENT.headlineAfter}
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              {CONTENT.lede}
            </p>
          </div>
        </div>
      </div>

      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <ul className="grid grid-cols-1 gap-px overflow-hidden bg-border-subtle @min-[40rem]:grid-cols-2 @min-[64rem]:grid-cols-3">
            {FEATURES.map((feature, i) => (
              <li key={feature.title} className="bg-background p-6 @min-[40rem]:p-8">
                <p className="font-mono text-[11px] tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-lg font-medium text-foreground">
                  {feature.title}
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
