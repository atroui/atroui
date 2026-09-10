/**
 * Edit CONTENT / STATS for your metrics. Tabular numerals throughout so
 * values align. No motion deps.
 * After install this file lives in your repo.
 */
const CONTENT = {
  stamp: "By the numbers",
  headlineBefore: "Results our customers",
  headlineAccent: "can measure",
  headlineAfter: ".",
  lede: "Replace these with metrics you can defend.",
}

const STATS = [
  { value: "38k", label: "Teams shipping", note: "Active workspaces" },
  { value: "99.99%", label: "Uptime, trailing year", note: "Status page verified" },
  { value: "4.9/5", label: "Support rating", note: "12k reviews" },
  { value: "12ms", label: "Median edge latency", note: "Global p50" },
]

export function StatsBand() {
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

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--atro-panel-radius)] border border-border-subtle bg-border-subtle lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-background p-6 sm:p-8">
                <dd className="text-3xl font-medium tracking-tight tabular-nums text-foreground sm:text-4xl">
                  {stat.value}
                </dd>
                <dt className="mt-2 text-sm font-medium text-foreground">
                  {stat.label}
                </dt>
                <p className="mt-1 text-xs text-muted-foreground">{stat.note}</p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
