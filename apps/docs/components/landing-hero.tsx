import { ArrowRight, Github, Star } from "lucide-react"
import { CategoryGallery } from "@/components/landing/category-gallery"
import { FeatureBento } from "@/components/landing/feature-bento"
import { HeroShowcase } from "@/components/landing/hero-showcase"
import { LiveInstall } from "@/components/landing/live-install"
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
]

/** Landing — editorial, dark-first, one unified product surface. */
export function LandingHero() {
  return (
    <>
      {/* Hero */}
      <section className="atro-hero-canvas border-b border-border-subtle">
        <div className="atro-shell grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-24">
          <div className="max-w-xl">
            <p className="ms-stamp">Dark-first React catalog</p>

            <h1 className="ds-headline mt-6 text-[clamp(2.6rem,7vw,4.25rem)] leading-[1.02] text-foreground">
              Own the UI.
              <br />
              <span className="ds-sketch ds-sketch-accent">
                Borrow the API.
              </span>
            </h1>

            <p className="ds-lede mt-6 max-w-md">
              Production React &amp; Next.js sections on the official shadcn
              registry. The source lands in your repo; your keys stay in your
              env. No lock-in.
            </p>

            <LiveInstall className="mt-8 max-w-md" />

            <div className="mt-8 flex flex-wrap items-center gap-3">
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

            <ul className="mt-8 flex flex-wrap gap-2">
              {trust.map((item) => (
                <li key={item} className="atro-chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pl-4">
            <HeroShowcase />
          </div>
        </div>
      </section>

      <FeatureBento />

      <CategoryGallery />

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
