/** Zed "A letter" — small label, rule, human voice. */
export function LandingLetter() {
  return (
    <section className="atro-section">
      <div className="atro-section-inner">
        <p className="ds-eyebrow">A letter</p>
        <h2 className="ds-headline mt-3 text-2xl text-foreground sm:text-3xl">
          From the team
        </h2>
        <div className="atro-letter max-w-3xl">
          <div className="atro-letter-body">
            <p>
              AtroUI started from a simple rule: the catalog should feel like
              one product — blocks, docs, Host APIs, and identity helpers in the
              same voice.
            </p>
            <hr className="my-4 border-border-subtle" />
            <p>
              Source you own, not packages you rent. Listed on the shadcn
              directory, copied into your repo, wired with your keys.
            </p>
          </div>
          <p className="atro-letter-sign">AtroUI · atroui.com</p>
        </div>
      </div>
    </section>
  )
}
