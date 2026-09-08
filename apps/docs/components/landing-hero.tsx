import { AtroHero } from "@/components/landing/hero"
import { LandingAnnouncement } from "@/components/landing/landing-announcement"
import { LandingBlog } from "@/components/landing/landing-blog"
import { LandingCatalogEcosystem } from "@/components/landing/landing-catalog-ecosystem"
import { LandingFinalCta } from "@/components/landing/landing-final-cta"
import { LandingJustWorks } from "@/components/landing/landing-just-works"
import { LandingReveal } from "@/components/landing/landing-reveal"
import { SiteFooter } from "@/components/site-footer"

/**
 * Landing — Zed product spine:
 * announce → hero (product visual + attached pillars) → just works → catalog → blog → close → footer
 */
export function LandingHero() {
  return (
    <>
      <LandingAnnouncement />
      <AtroHero />

      <LandingReveal>
        <LandingJustWorks />
      </LandingReveal>

      <LandingReveal>
        <LandingCatalogEcosystem />
      </LandingReveal>

      <LandingReveal>
        <LandingBlog />
      </LandingReveal>

      <LandingReveal>
        <LandingFinalCta />
      </LandingReveal>

      <SiteFooter />
    </>
  )
}
