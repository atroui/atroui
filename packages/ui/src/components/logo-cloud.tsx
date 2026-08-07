/**
 * Logo / name strip for social proof when you have real partners.
 * Placeholder names only — not mounted on atroui.com until you have logos.
 */

const CONTENT = {
  stamp: "Trusted by",
  lede: "Swap NAMES for clients or stack partners. Prefer real marks when you have them.",
}

/** Text marks — replace with <Image> when you have SVG/PNG assets. */
const NAMES = [
  "Northline",
  "Cascade",
  "Harbor",
  "Kiln",
  "Fieldwork",
  "Orbit",
] as const

export function LogoCloud() {
  return (
    <section className="border-t border-border-subtle">
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle px-6 py-10 sm:px-10 sm:py-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-md">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                {CONTENT.stamp}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {CONTENT.lede}
              </p>
            </div>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border-subtle bg-border-subtle sm:grid-cols-3 md:grid-cols-6">
            {NAMES.map((name) => (
              <li
                key={name}
                className="flex min-h-16 items-center justify-center bg-background px-3 py-4"
              >
                <span className="text-sm font-medium tracking-tight text-muted-foreground">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
