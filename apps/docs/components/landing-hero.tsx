import { ArrowRight, Github, Star } from "lucide-react"
import { CategoryGallery } from "@/components/landing/category-gallery"
import { FeatureBento } from "@/components/landing/feature-bento"
import { HeroShowcase } from "@/components/landing/hero-showcase"
import { HowItWorks } from "@/components/landing/how-it-works"
import { LiveMarquee } from "@/components/landing/live-marquee"
import { SiteFooter } from "@/components/site-footer"
import { UpdatesSignup } from "@/components/updates-signup"
import { TransitionLink } from "@/components/view-transitions"
import { catalogNavItems } from "@/lib/navigation"

const GITHUB_REPO = "https://github.com/atroui/atroui"

const trust = [
  "MIT licensed",
  "Tailwind v4",
  "shadcn registry",
  `${catalogNavItems.length}+ components`,
  "Own the source",
]

/** Landing — rebuilt from scratch: centered hero + live marquee, then a
 *  guided descent through how-it-works, a live showcase, features, catalog,
 *  and a closing CTA. One unified, dark-first product surface. */
export function LandingHero() {
  return (
    <>
      <section className="atro-hero-canvas relative overflow-hidden border-b border-border-subtle">
        <div className="atro-shell pb-12 pt-16 text-center lg:pt-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <p className="ms-stamp">Dark-first React &amp; Next.js catalog</p>

            <h1 className="ds-headline mt-6 text-[clamp(2.75rem,8vw,5rem)] leading-[1.0] text-foreground">
              Own the UI.{" "}
              <span className="ds-sketch ds-sketch-accent">
                Borrow the API.
              </span>
            </h1>

            <p className="ds-lede mt-6 max-w-xl">
              {catalogNavItems.length}+ production sections on the official
              shadcn registry. The source lands in your repo; your keys stay in
              your env. No lock-in, no black boxes.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <TransitionLink
                href="/docs/components"
                transitionTypes={[]}
                className="ms-cta h-11 px-5"
              >
                Browse components
                <ArrowRight className="size-4" aria-hidden />
              </TransitionLink>
              <TransitionLink
                href="/docs"
                transitionTypes={[]}
                className="ms-cta-ghost h-11 px-5"
              >
                Read the docs
              </TransitionLink>
              <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-border-subtle bg-white/[0.03] px-4 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.06]"
                aria-label="Star AtroUI on GitHub"
              >
                <Github className="size-4" aria-hidden />
                Star
                <Star className="size-3.5 opacity-80" aria-hidden />
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap justify-center gap-2">
              {trust.map((item) => (
                <li key={item} className="atro-chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pb-16 lg:pb-20">
          <LiveMarquee />
        </div>
      </section>

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
          <div className="mx-auto max-w-3xl">
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
