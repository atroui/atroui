/** Factual trust strip — no placeholder quotes. Zed rhythm, honest proof. */
const TRUST = [
  {
    title: "shadcn directory",
    body: "Official @atroui registry. Same init, add, and diff workflow.",
  },
  {
    title: "Source you own",
    body: "Every block copies into src/components — review it in PRs.",
  },
  {
    title: "Keys stay yours",
    body: "Host API routes for waitlist, contact, OG, and AI wire to your env.",
  },
] as const

export function LandingTrust() {
  return (
    <section className="atro-section">
      <div className="atro-section-inner">
        <h2 className="atro-trust-title">
          Built for teams who ship their own UI
        </h2>

        <div className="atro-trust-grid">
          {TRUST.map((item) => (
            <div key={item.title} className="atro-trust-item">
              <h3 className="atro-trust-item-title">{item.title}</h3>
              <p className="atro-trust-item-body">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
