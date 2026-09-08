import { ArrowRight } from "lucide-react"
import { LandingSectionHeader } from "@/components/landing/landing-section-header"
import { TransitionLink } from "@/components/view-transitions"

/**
 * Closing band — careful delight, compact.
 * One idea: ship now. Path is already in the lede; no step-card dump.
 */
export function LandingFinalCta() {
  return (
    <section className="atro-section atro-final-cta" aria-label="Get started">
      <div className="atro-section-inner atro-final-cta-inner">
        <LandingSectionHeader
          align="center"
          eyebrow="Get started"
          title={
            <>
              Your next ship starts{" "}
              <span className="ds-display-italic text-brand">right now</span>
            </>
          }
          lede="Copy a block. Edit CONTENT. Wire Host APIs only when you need them."
        />

        <TransitionLink href="/docs" transitionTypes={[]} className="atro-btn">
          Get started
          <ArrowRight className="size-3.5" aria-hidden />
        </TransitionLink>
      </div>
    </section>
  )
}
