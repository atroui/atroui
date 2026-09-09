import { LiveInstall } from "@/components/landing/live-install"
import { LandingSectionHeader } from "@/components/landing/landing-section-header"

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
    <section className="atro-section">
      <div className="atro-section-inner">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
          <div>
            <LandingSectionHeader
              variant="product"
              title="Three commands to production"
              lede="No registration, no private registry, no runtime you don't control."
            />

            <ol className="mt-8 space-y-7">
              {steps.map((step) => (
                <li key={step.n} className="flex gap-4">
                  <span className="atro-step-num mt-1 shrink-0">{step.n}</span>
                  <div>
                    <h3 className="ds-headline text-base text-foreground">
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

          <div className="lg:pt-1">
            <LiveInstall />
          </div>
        </div>
      </div>
    </section>
  )
}
