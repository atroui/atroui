import { AtroHero } from "@/components/landing/hero"
import { LandingAnnouncement } from "@/components/landing/landing-announcement"
import { LandingBlog } from "@/components/landing/landing-blog"
import { LandingCatalogEcosystem } from "@/components/landing/landing-catalog-ecosystem"
import { LandingFinalCta } from "@/components/landing/landing-final-cta"
import { LandingHostApiStrip } from "@/components/landing/landing-host-api-strip"
import { LandingJustWorks } from "@/components/landing/landing-just-works"
import { LandingReveal } from "@/components/landing/landing-reveal"
import { SiteFooter } from "@/components/site-footer"

/**
 * Landing — Atro room spine:
 * announce → hero → just works → Host API BYOK → catalog → blog → close
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
        <LandingHostApiStrip />
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
