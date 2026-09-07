import { ArrowRight } from "lucide-react"
import { AtroHero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { LandingAnnouncement } from "@/components/landing/landing-announcement"
import { LandingBlog } from "@/components/landing/landing-blog"
import { LandingCareGrid } from "@/components/landing/landing-care-grid"
import { LandingCatalogEcosystem } from "@/components/landing/landing-catalog-ecosystem"
import { LandingFinalCta } from "@/components/landing/landing-final-cta"
import { LandingJustWorks } from "@/components/landing/landing-just-works"
import { LandingLetter } from "@/components/landing/landing-letter"
import { LandingReveal } from "@/components/landing/landing-reveal"
import { LandingTestimonials } from "@/components/landing/landing-testimonials"
import { SiteFooter } from "@/components/site-footer"

/** Landing — Zed-clean product page. Design weight: hero demo > trust > tabs > rest. */
export function LandingHero() {
  return (
    <div className="atro-landing">
      <LandingAnnouncement />
      <AtroHero />

      <LandingReveal>
        <LandingTestimonials />
      </LandingReveal>

      <LandingReveal>
        <LandingJustWorks />
      </LandingReveal>

      <LandingReveal>
        <HowItWorks />
      </LandingReveal>

      <LandingReveal>
        <LandingCatalogEcosystem />
      </LandingReveal>

      <LandingReveal>
        <LandingCareGrid />
      </LandingReveal>

      <LandingReveal>
        <LandingLetter />
      </LandingReveal>

      <LandingReveal>
        <LandingBlog />
      </LandingReveal>

      <LandingFinalCta />
      <SiteFooter />
    </div>
  )
}
