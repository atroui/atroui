import { AtroHero } from "@/components/landing/hero"
import { LandingAnnouncement } from "@/components/landing/landing-announcement"
import { LandingBlog } from "@/components/landing/landing-blog"
import { LandingCatalogEcosystem } from "@/components/landing/landing-catalog-ecosystem"
import { LandingFinalCta } from "@/components/landing/landing-final-cta"
import { LandingJustWorks } from "@/components/landing/landing-just-works"
import { LandingTasteProof } from "@/components/landing/landing-taste-proof"
import { LandingReveal } from "@/components/landing/landing-reveal"
import { SiteFooter } from "@/components/site-footer"

/**
 * Landing — Atro room spine:
 * announce → hero (brand + axes + product) → taste proof → just works → catalog → blog → close
 */
export function LandingHero() {
  return (
    <>
      <LandingAnnouncement />
      <AtroHero />

      <LandingReveal>
        <LandingTasteProof />
      </LandingReveal>

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
