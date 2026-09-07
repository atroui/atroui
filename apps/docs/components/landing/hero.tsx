import { ArrowRight, Github } from "lucide-react"
import { HeroShowcase } from "@/components/landing/hero-showcase"
import { LandingPillars } from "@/components/landing/landing-pillars"
import { LandingReveal } from "@/components/landing/landing-reveal"
import { TransitionLink } from "@/components/view-transitions"

const GITHUB_REPO = "https://github.com/atroui/atroui"

export function AtroHero() {
  return (
    <section className="atro-hero-canvas relative w-full bg-background text-foreground">
      <div className="atro-shell relative z-10 pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pb-24">
        <LandingReveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1 className="atro-hero-title">
            Own the UI.
            <br />
            Borrow the API.
          </h1>

          <p className="atro-hero-lede mt-5 max-w-lg">
            A minimal component catalog for production React apps. Copy real
            source through the shadcn CLI — wire Host APIs with your keys.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center sm:justify-center">
            <TransitionLink
              href="/docs/components"
              transitionTypes={[]}
              className="zed-btn"
            >
              Browse components
              <ArrowRight className="size-4" aria-hidden />
            </TransitionLink>
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="zed-btn-ghost"
            >
              <Github className="size-4" aria-hidden />
              View source
            </a>
          </div>

          <p className="atro-platform-note mt-5">
            Available for React 19, Next.js 15, and Tailwind v4
          </p>
        </LandingReveal>

        <LandingReveal delay={0.08} className="atro-hero-product mx-auto mt-12 w-full max-w-5xl lg:mt-14">
          <HeroShowcase prominent clean />
          <LandingPillars attached />
        </LandingReveal>
      </div>
    </section>
  )
}
