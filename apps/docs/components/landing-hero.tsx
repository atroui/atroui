import { ArrowRight } from "lucide-react"
import { AtroHero } from "@/components/landing/hero"
import { CategoryGallery } from "@/components/landing/category-gallery"
import { FeatureBento } from "@/components/landing/feature-bento"
import { HeroShowcase } from "@/components/landing/hero-showcase"
import { HowItWorks } from "@/components/landing/how-it-works"
import { SiteFooter } from "@/components/site-footer"
import { UpdatesSignup } from "@/components/updates-signup"
import { TransitionLink } from "@/components/view-transitions"

/** Landing — ui-layouts "AI Infrastructure" hero adapted for AtroUI, then a
 *  guided descent through how-it-works, a live showcase, features, catalog,
 *  and a closing CTA. One unified, dark-first product surface. */
export function LandingHero() {
  return (
    <>
      <AtroHero />

      <HowItWorks />

      {/* Live showcase */}
      <section className="border-t border-border-subtle">
        <div className="atro-shell py-16 lg:py-24">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="ms-stamp mx-auto w-fit">See it live</p>
            <h2 className="ds-headline mt-5 text-3xl text-foreground sm:text-4xl md:text-[2.75rem]">
              Real components, <span className="ds-sketch-accent">running</span>
            </h2>
            <p className="ds-lede mx-auto mt-4 max-w-xl">
              Switch blocks and copy the exact install command. Every preview is
              the source the CLI writes into your repo.
            </p>
          </div>
          <div className="atro-beam mx-auto max-w-3xl">
            <HeroShowcase />
          </div>
        </div>
      </section>

      <FeatureBento />

      <CategoryGallery />

      {/* Closing CTA */}
      <section className="border-t border-border-subtle">
        <div className="atro-shell py-16 lg:py-24">
          <div className="atro-tile relative overflow-hidden p-10 text-center sm:p-14 lg:p-20">
            <div className="mx-auto max-w-2xl">
              <h2 className="ds-headline text-3xl text-foreground sm:text-4xl md:text-5xl">
                Ship your next page <span className="ds-sketch-accent">today</span>
              </h2>
              <p className="ds-lede mx-auto mt-4 max-w-lg">
                Copy a block, edit the content, deploy. That&rsquo;s the whole
                workflow.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <TransitionLink
                  href="/docs/components"
                  transitionTypes={[]}
                  className="ms-cta h-11 px-5"
                >
                  Browse components
                  <ArrowRight className="size-4" aria-hidden />
                </TransitionLink>
                <TransitionLink
                  href="/docs/installation"
                  transitionTypes={[]}
                  className="ms-cta-ghost h-11 px-5"
                >
                  Installation guide
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Updates */}
      <section className="border-t border-border-subtle">
        <div className="atro-shell py-16 lg:py-24">
          <div className="atro-tile grid gap-10 p-8 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-14 lg:p-14">
            <div>
              <p className="ms-stamp">Stay in the loop</p>
              <h2 className="ds-headline mt-5 text-2xl text-foreground sm:text-3xl md:text-4xl">
                Major updates, <span className="ds-sketch-accent">only</span>
              </h2>
              <p className="ds-lede mt-4 max-w-md">
                We write when something ships that changes how you install or
                build with AtroUI. Same voice as the blog. Unsubscribe anytime.
              </p>
            </div>
            <div>
              <UpdatesSignup source="landing" compact />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
