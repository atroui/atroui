/**
 * Narrow “now” list — edit CONTENT after install.
 */

const CONTENT = {
  stamp: "Currently",
  updatedLabel: "Updated recently",
  items: [
    {
      label: "Focus",
      value: "Shipping the personal site kit",
      swatch: "var(--color-brand, #0b7bff)",
    },
    {
      label: "Build",
      value: "React / Next.js components for indie sites",
    },
    {
      label: "Read",
      value: "Something worth finishing",
    },
  ],
}

export function Currently({
  stamp = CONTENT.stamp,
  updatedLabel = CONTENT.updatedLabel,
  items = CONTENT.items,
  className,
}: {
  stamp?: string
  updatedLabel?: string
  items?: Array<{ label: string; value: string; swatch?: string }>
  className?: string
} = {}) {
  return (
    <section className={className ?? "mx-auto max-w-[640px]"}>
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-mono text-[10.5px] tracking-[0.12em] text-muted-foreground uppercase">
          {stamp}
        </h2>
        <span className="font-mono text-[11px] text-muted-foreground">
          {updatedLabel}
        </span>
      </div>

      <ul className="divide-y divide-border-subtle border-y border-border-subtle">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex items-start gap-3 py-[11px] text-[14.5px]"
          >
            {item.swatch ? (
              <span
                aria-hidden
                className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-[1px]"
                style={{ background: item.swatch }}
              />
            ) : (
              <span
                aria-hidden
                className="mt-[9px] h-[6px] w-[6px] shrink-0"
              />
            )}
            <span className="w-[76px] shrink-0 pt-[3px] font-mono text-[10.5px] tracking-[0.1em] text-muted-foreground uppercase">
              {item.label}
            </span>
            <span className="flex-1 leading-[1.55] text-foreground">
              {item.value}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
