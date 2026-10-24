import { ArrowRight } from "lucide-react"
import { LandingAxisStrip } from "@/components/landing/landing-axis-strip"
import { LandingPillars } from "@/components/landing/landing-pillars"
import { RegistryWorkspaceDemo } from "@/components/landing/registry-workspace-demo"
import { LandingReveal } from "@/components/landing/landing-reveal"
import { TransitionLink } from "@/components/view-transitions"

/**
 * First viewport = one Atro room.
 * Brand first · one headline · one lede · CTA group · live product visual.
 * Install lives in the workspace foot (not a second terminal under it).
 */
export function AtroHero() {
  return (
    <section className="atro-hero-canvas relative w-full bg-background text-foreground">
      <div className="atro-shell relative z-10 pb-8 pt-10 sm:pb-10 sm:pt-12 lg:pb-12">
        <LandingReveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="atro-hero-brand" aria-label="AtroUI">
            <span className="atro-hero-brand-name">Atro</span>
            <span className="atro-hero-brand-ui">UI</span>
          </p>

          <h1 className="atro-hero-title mt-5">
            Add the section.
            <br />
            Own the room.
          </h1>

          <p className="atro-hero-lede mt-4 max-w-md">
            Production bands via the shadcn CLI. Orthogonal theme axes. Host
            APIs on your keys — every file lands in your repo.
          </p>

          <div className="mt-6 flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center sm:justify-center">
            <TransitionLink
              href="/themes"
              transitionTypes={[]}
              className="atro-btn"
            >
              Enter Theme Studio
              <ArrowRight className="size-4" aria-hidden />
            </TransitionLink>
            <TransitionLink
              href="/docs/components"
              transitionTypes={[]}
              className="atro-btn-ghost"
            >
              Browse sections
            </TransitionLink>
          </div>

          <LandingAxisStrip className="mt-7" />
        </LandingReveal>

        <LandingReveal
          delay={0.08}
          className="atro-hero-product mx-auto mt-8 w-full max-w-5xl lg:mt-9"
        >
          <RegistryWorkspaceDemo className="w-full" />
          <LandingPillars attached />
        </LandingReveal>
      </div>
    </section>
  )
}
