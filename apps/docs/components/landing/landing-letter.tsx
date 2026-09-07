/** Zed "A letter" — small label, rule, human voice. */
export function LandingLetter() {
  return (
    <section className="atro-section">
      <div className="atro-section-inner">
        <p className="ds-eyebrow">A letter</p>
        <h2 className="ds-headline mt-4 text-3xl text-foreground sm:text-4xl">
          From the team
        </h2>
        <div className="atro-letter mt-8 max-w-3xl">
          <div className="atro-letter-body">
            <p>
              Programming and the tools we use to ship UI are changing. AtroUI
              started from a simple rule: the catalog should feel like one
              product — blocks, docs, Host APIs, and identity helpers written in
              the same voice.
            </p>
            <hr className="my-6 border-border-subtle" />
            <p>
              We are confident the future of component libraries is source you
              own, not packages you rent. Listed on the shadcn directory, copied
              into your repo, wired with your keys — that is the workflow we
              are building toward.
            </p>
          </div>
          <p className="atro-letter-sign">AtroUI · atroui.com</p>
        </div>
      </div>
    </section>
  )
}
