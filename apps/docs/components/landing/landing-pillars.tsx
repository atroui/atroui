const PILLARS = [
  {
    label: "Own the source",
    body: "Blocks copy into your repo. Edit CONTENT, not node_modules.",
  },
  {
    label: "Host APIs",
    body: "Forms, AI tools, and OG routes on your keys — handlers included.",
  },
  {
    label: "shadcn native",
    body: "Official directory entry. Same CLI your team already uses.",
  },
] as const

/** Three-column value strip — attached to hero demo (Zed Fast / Agentic / Collaborative). */
export function LandingPillars({ attached = false }: { attached?: boolean }) {
  return (
    <div
      className={attached ? "atro-pillar-grid atro-pillar-grid--attached" : "atro-pillar-grid"}
      role="list"
    >
      {PILLARS.map((pillar) => (
        <div key={pillar.label} className="atro-pillar" role="listitem">
          <p className="atro-pillar-label">{pillar.label}</p>
          <p className="atro-pillar-body">{pillar.body}</p>
        </div>
      ))}
    </div>
  )
}
