function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

const QUOTES = [
  {
    text: "Finally a registry where the hero lands in src/components and I can diff it in PRs. No black-box runtime.",
    name: "Maya Chen",
    role: "Frontend lead",
  },
  {
    text: "Host APIs with BYOK is the missing piece. I wire Resend once and every waitlist block just works.",
    name: "Jordan Okonkwo",
    role: "Indie founder",
  },
  {
    text: "Docs, install path, and blocks all speak the same language. It feels like one product.",
    name: "Sam Rivera",
    role: "OSS maintainer",
  },
] as const

export function LandingTestimonials() {
  return (
    <section className="atro-section">
      <div className="atro-section-inner">
        <h2 className="text-center text-xl font-medium tracking-[-0.025em] text-foreground sm:text-2xl">
          Trusted by builders shipping their own UI
        </h2>

        <div className="atro-quote-grid mt-12">
          {QUOTES.map((quote) => (
            <figure key={quote.name} className="atro-quote">
              <blockquote className="atro-quote-text">
                &ldquo;{quote.text}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="atro-avatar" aria-hidden>
                  {initials(quote.name)}
                </span>
                <span>
                  <span className="block text-[13px] font-medium text-foreground">
                    {quote.name}
                  </span>
                  <span className="text-[12px] text-muted-foreground">
                    {quote.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
