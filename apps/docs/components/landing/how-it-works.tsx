import { LiveInstall } from "@/components/landing/live-install"

const steps = [
  {
    n: "01",
    title: "Init your project",
    body: "Point the shadcn CLI at your repo once. Tailwind v4 tokens and aliases are ready to go.",
  },
  {
    n: "02",
    title: "Add any block",
    body: "npx shadcn add @atroui/… copies the real source — components, not a dependency you can't touch.",
  },
  {
    n: "03",
    title: "Own & edit",
    body: "Edit CONTENT at the top of the file, wire Host API routes with your own keys, and ship.",
  },
]

export function HowItWorks() {
  return (
    <section className="border-t border-border-subtle">
      <div className="atro-shell py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <p className="ms-stamp">How it works</p>
            <h2 className="ds-headline mt-5 text-3xl text-foreground sm:text-4xl md:text-[2.75rem]">
              Three commands to <span className="ds-sketch-accent">production</span>
            </h2>
            <p className="ds-lede mt-4 max-w-md">
              No registration, no private registry, no runtime you don&rsquo;t
              control. Copy the source and make it yours.
            </p>

            <ol className="mt-8 space-y-6">
              {steps.map((step) => (
                <li key={step.n} className="flex gap-4">
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-brand/40 bg-brand/10 font-mono text-[13px] text-brand">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="ds-sketch text-lg text-foreground">
                      {step.title}
                    </h3>
                    <p className="ds-body mt-1 max-w-sm text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:pl-6">
            <LiveInstall />
          </div>
        </div>
      </div>
    </section>
  )
}
