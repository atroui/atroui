const PILLARS = [
  {
    label: "Altitude",
    body: "Sections, not atoms. Add @atroui/home-hero and edit CONTENT.",
  },
  {
    label: "Taste",
    body: "Axes recolor the room. Pin 390 in the workspace — stacking still holds.",
  },
  {
    label: "Ownership",
    body: "Registry files in your git. Host APIs with your keys — or a 503.",
  },
] as const

/** Three-column value strip — attached to hero demo. */
export function LandingPillars({ attached = false }: { attached?: boolean }) {
  return (
    <div
      className={
        attached ? "atro-pillar-grid atro-pillar-grid--attached" : "atro-pillar-grid"
      }
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
