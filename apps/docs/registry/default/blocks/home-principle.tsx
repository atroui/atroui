/**
 * Edit CONTENT / PRINCIPLES to match your studio.
 * Matches the AtroUI docs Home Principle band.
 */
const CONTENT = {
  stamp: "How we work",
  headlineBefore: "You talk to the person who",
  headlineAccent: "builds it",
  headlineAfter: ".",
}

const PRINCIPLES = [
  {
    title: "Fixed scope",
    status: "Locked",
    detail: "Agreed before day one - no creep theatre.",
    tone: "ok" as const,
  },
  {
    title: "Fixed price",
    status: "Guaranteed",
    detail: "$4,800 MVP · from $2,400 AI feature.",
    tone: "brand" as const,
  },
  {
    title: "No handoffs",
    status: "Direct",
    detail: "One senior engineer. Not your 14th channel.",
    tone: "warm" as const,
  },
]

const toneText = {
  ok: "text-emerald-700 dark:text-emerald-400",
  brand: "text-[var(--color-brand,#0b7bff)]",
  warm: "text-amber-800 dark:text-amber-400",
} as const

const toneDot = {
  ok: "bg-emerald-700 dark:bg-emerald-400",
  brand: "bg-[var(--color-brand,#0b7bff)]",
  warm: "bg-amber-800 dark:bg-amber-400",
} as const

export function HomePrinciple() {
  return (
    <section className="border-t border-border-subtle">
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle px-6 py-12 sm:px-10 sm:py-16">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {CONTENT.stamp}
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
              {CONTENT.headlineBefore}{" "}
              <span className="italic text-[var(--color-brand,#0b7bff)]">
                {CONTENT.headlineAccent}
              </span>
              {CONTENT.headlineAfter}
            </h2>
          </div>
        </div>
      </div>

      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <ol className="grid grid-cols-1 divide-y divide-border-subtle md:grid-cols-3 md:divide-x md:divide-y-0">
            {PRINCIPLES.map((item, i) => (
              <li key={item.title} className="p-6 sm:p-8">
                <p className="font-mono text-[11px] tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-lg font-medium text-foreground">
                  {item.title}
                </h3>
                <p
                  className={`mt-2 flex items-center gap-1.5 text-sm font-medium ${toneText[item.tone]}`}
                >
                  <span
                    className={`size-1.5 shrink-0 rounded-full ${toneDot[item.tone]}`}
                    aria-hidden
                  />
                  {item.status}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
