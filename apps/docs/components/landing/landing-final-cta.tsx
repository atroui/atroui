"use client"

import { ArrowRight } from "lucide-react"
import { LabelRoll } from "atroui"
import { TransitionLink } from "@/components/view-transitions"

/**
 * Closing band — simple living, high thinking.
 * Clear ask. LabelRoll on hover. Nothing else.
 */
export function LandingFinalCta() {
  return (
    <section className="atro-section atro-final-cta" aria-label="Get started">
      <div className="atro-section-inner atro-final-cta-inner">
        <div className="mx-auto max-w-2xl text-center">
          <p className="ds-eyebrow mx-auto w-fit">Get started</p>
          <h2 className="atro-section-title mt-3">
            Your next ship starts right now
          </h2>
          <p className="ds-lede mt-2 mx-auto max-w-xl !text-[0.9375rem] leading-relaxed">
            Copy a block. Edit CONTENT. Wire Host APIs only when you need them.
          </p>
        </div>

        <TransitionLink href="/docs" transitionTypes={[]} className="group atro-btn">
          <LabelRoll secondary="Open the docs">Get started</LabelRoll>
          <ArrowRight className="size-3.5" aria-hidden />
        </TransitionLink>
      </div>
    </section>
  )
}
