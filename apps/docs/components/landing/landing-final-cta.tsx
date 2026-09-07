import { ArrowRight } from "lucide-react"
import { TransitionLink } from "@/components/view-transitions"

export function LandingFinalCta() {
  return (
    <section className="atro-final-cta" aria-label="Get started">
      <div className="atro-shell">
        <div className="atro-final-cta-inner">
          <h2 className="atro-final-cta-title">Daily drive with AtroUI</h2>
          <p className="atro-final-cta-lede">
            Copy blocks you own. Wire APIs with your keys. Ship on your stack.
          </p>
          <div className="flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center sm:justify-center">
            <TransitionLink
              href="/docs/components"
              transitionTypes={[]}
              className="zed-btn"
            >
              Browse components
              <ArrowRight className="size-4" aria-hidden />
            </TransitionLink>
            <TransitionLink
              href="/docs/installation"
              transitionTypes={[]}
              className="zed-btn-ghost"
            >
              Installation
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  )
}
