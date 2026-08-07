/**
 * Edit CONTENT / NAMES when you have real clients or partners.
 * Text marks by default — swap cells for Image when you have assets.
 */
const CONTENT = {
  stamp: "Trusted by",
  lede: "Swap NAMES for clients or stack partners. Prefer real marks when you have them.",
}

const NAMES = [
  "Northline",
  "Cascade",
  "Harbor",
  "Kiln",
  "Fieldwork",
  "Orbit",
]

export function LogoCloud() {
  return (
    <section className="border-t border-border-subtle">
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle px-6 py-10 sm:px-10 sm:py-12">
          <div className="max-w-md">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {CONTENT.stamp}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {CONTENT.lede}
            </p>
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
