import Link from "next/link"
import { CatalogStage } from "@/components/landing/catalog-stage"
import {
  LandingModuleHeader,
  LandingPanel,
  LandingSection,
} from "@/components/landing/module"
import { PresenceHero } from "@/components/landing/presence-hero"
import { UpdatesSignup } from "@/components/updates-signup"

const GITHUB_REPO = "https://github.com/atroui/atroui"

const inside = [
  {
    title: "Registry",
    body: "shadcn CLI copies source into your repo.",
    href: "/docs/registry",
  },
  {
    title: "Host APIs",
    body: "UI + hardened routes. You bring the keys.",
    href: "/docs/host-api",
  },
  {
    title: "Sections",
    body: "Dark marketing bands — heroes, who, CTAs. Edit CONTENT.",
    href: "/docs/collections/dark-marketing",
  },
  {
    title: "Headless",
    body: "Analytics, JSON-LD, reviews — no visible UI.",
    href: "/docs/components/seo-json-ld",
  },
] as const

/** Server-rendered landing — one job: the component registry. */
export function LandingHero() {
  return (
    <div className="dark bg-black text-white">
      <PresenceHero />
      <CatalogStage />

      <LandingSection>
        <div className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <LandingModuleHeader
              stamp="Catalog"
              title={
                <>
                  What you&rsquo;ll{" "}
                  <span className="ds-sketch-accent">find</span>
                </>
              }
              lede="Landing sections and Host APIs for indie Next.js — not a 50-primitive peer kit."
            />
          </div>

          <LandingPanel className="divide-y divide-white/10 lg:col-span-7">
            <ul>
              {inside.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="group flex flex-col gap-1.5 px-4 py-4 transition-colors hover:bg-white/[0.04] sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:px-5 sm:py-5"
                  >
                    <span className="text-[17px] font-medium tracking-tight text-white transition-colors group-hover:text-sky-300 sm:text-lg">
                      {item.title}
                    </span>
                    <span className="ds-meta max-w-prose text-neutral-400 sm:max-w-sm sm:text-right">
                      {item.body}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </LandingPanel>
        </div>
      </LandingSection>

      <LandingSection labelledBy="home-band-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-6">
            <LandingModuleHeader
              stamp="Updates"
              titleId="home-band-title"
              title={
                <>
                  When the catalog{" "}
                  <span className="ds-sketch-accent">ships</span>
                </>
              }
              lede={
                <>
                  Major registry and Host API notes only — not a marketing drip.
                  Details live in{" "}
                  <Link
                    href="/updates"
                    className="text-sky-300/90 underline underline-offset-2 hover:text-sky-200"
                  >
                    Updates
                  </Link>
                  .
                </>
              }
            />
          </div>
          <div className="lg:col-span-6">
            <LandingPanel className="p-4 sm:p-5">
              <p className="mb-3 font-mono text-[10px] tracking-[0.14em] text-neutral-500 uppercase">
                Major updates only
              </p>
              <UpdatesSignup source="landing" compact />
            </LandingPanel>
          </div>
        </div>
      </LandingSection>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 md:px-12 lg:px-20 xl:px-24">
          <p className="ds-meta text-neutral-500">
            © {new Date().getFullYear()}{" "}
            <span className="text-sm text-neutral-400">AtroUI</span>
            {" · "}
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="ds-hero-nav-link"
            >
              GitHub
            </a>
            {" · "}
            <Link href="/docs/registry" className="ds-hero-nav-link">
              Registry
            </Link>
          </p>
          <p className="ds-meta text-neutral-600">
            Built by{" "}
            <a
              href="https://www.makershot.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 underline-offset-2 transition-colors hover:text-neutral-300 hover:underline"
            >
              Makershot
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
