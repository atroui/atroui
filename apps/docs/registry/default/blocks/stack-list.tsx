const CONTENT = {
  stamp: "Stack",
}

const SECTIONS = [
  {
    title: "Everyday",
    entries: [
      { label: "Editor", value: "Cursor / VS Code" },
      { label: "Runtime", value: "Node · pnpm · Next.js" },
      { label: "UI", value: "React · Tailwind · AtroUI" },
    ],
  },
  {
    title: "Ship",
    entries: [
      { label: "Hosting", value: "Vercel" },
      { label: "Repo", value: "GitHub" },
      { label: "Design", value: "Figma" },
    ],
  },
]

export function StackList({
  stamp = CONTENT.stamp,
  sections = SECTIONS,
  className,
}: {
  stamp?: string
  sections?: Array<{
    title: string
    entries: Array<{ label: string; value: string }>
  }>
  className?: string
} = {}) {
  return (
    <div className={className ?? "mx-auto max-w-[640px] space-y-12"}>
      {stamp ? (
        <h2 className="font-mono text-[10.5px] tracking-[0.12em] text-muted-foreground uppercase">
          {stamp}
        </h2>
      ) : null}
      {sections.map((section) => (
        <section key={section.title}>
          <h3 className="mb-4 font-mono text-[10.5px] tracking-[0.12em] text-muted-foreground uppercase">
            {section.title}
          </h3>
          <dl className="divide-y divide-border-subtle border-y border-border-subtle">
            {section.entries.map((e) => (
              <div
                key={e.label}
                className="grid grid-cols-[96px_1fr] gap-4 py-3 sm:grid-cols-[140px_1fr]"
              >
                <dt className="pt-[4px] font-mono text-[10.5px] tracking-[0.1em] text-muted-foreground uppercase">
                  {e.label}
                </dt>
                <dd className="text-[14.5px] leading-[1.55] text-foreground">
                  {e.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  )
}
