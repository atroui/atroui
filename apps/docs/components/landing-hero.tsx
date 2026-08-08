import Link from "next/link"
import { Star } from "lucide-react"
import { PresenceHero } from "@/components/landing/presence-hero"

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
    title: "Blocks",
    body: "Home bands, site chrome, CTAs - edit CONTENT at the top.",
    href: "/docs/components/home-who",
  },
  {
    title: "Headless",
    body: "Analytics, JSON-LD, reviews - no visible UI.",
    href: "/docs/components/seo-json-ld",
  },
] as const

const shell =
  "mx-auto w-full max-w-7xl px-4 py-12 sm:px-8 sm:py-16 md:px-12 lg:px-20 lg:py-20 xl:px-24"

/** Server-rendered landing shell — hero text paints without waiting on WebGL. */
export function LandingHero() {
  return (
    <div className="bg-black text-white">
      <PresenceHero />

      <section className="border-t border-white/10">
        <div className={shell}>
          <div className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <p className="ms-stamp">Inside</p>
              <h2 className="ds-display mt-4 text-2xl leading-snug sm:mt-5 sm:text-3xl md:text-4xl lg:text-5xl">
                What you&rsquo;ll{" "}
                <span className="ds-sketch-accent">find</span>
              </h2>
              <p className="ds-lede mt-3 max-w-sm text-neutral-300 sm:mt-4">
                Registry, Host APIs, blocks, and headless tools — one catalog.
              </p>
            </div>

            <ul className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-white/3 lg:col-span-7">
              {inside.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="group flex flex-col gap-1.5 px-4 py-4 transition-colors hover:bg-white/[0.04] sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:px-5 sm:py-5"
                  >
                    <span className="ds-sketch text-xl text-white transition-colors group-hover:text-sky-300 sm:text-2xl">
                      {item.title}
                    </span>
                    <span className="ds-meta max-w-prose text-neutral-400 sm:max-w-sm sm:text-right">
                      {item.body}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className={shell}>
          <div className="max-w-lg">
            <p className="ms-stamp">atroui.com</p>
            <h2 className="ds-display mt-4 text-2xl leading-snug sm:mt-5 sm:text-3xl md:text-4xl">
              The home of{" "}
              <span className="ds-sketch-accent">AtroUI</span>
            </h2>
            <p className="ds-lede mt-3 text-neutral-400 sm:mt-4">
              AtroUI is the React component catalog at{" "}
              <span className="text-neutral-200">atroui.com</span>. Add it with
              the{" "}
              <Link
                href="/docs/registry"
                className="text-sky-300/90 underline underline-offset-2 hover:text-sky-200"
              >
                shadcn registry
              </Link>{" "}
              — source in your repo, editable{" "}
              <code className="break-all rounded bg-white/10 px-1.5 py-0.5 font-mono text-[12px] text-neutral-200">
                CONTENT
              </code>
              . Built by{" "}
              <a
                href="https://www.iamk.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-300/90 underline underline-offset-2 hover:text-sky-200"
              >
                iamk.xyz
              </a>{" "}
              at{" "}
              <a
                href="https://www.makershot.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-300/90 underline underline-offset-2 hover:text-sky-200"
              >
                makershot.tech
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 md:px-12 lg:px-20 xl:px-24">
          <p className="ds-meta text-neutral-500">
            © {new Date().getFullYear()}{" "}
            <span className="ds-sketch text-sm text-neutral-400">AtroUI</span>
            {" · "}atroui.com — React component library
          </p>
          <div className="ds-meta flex flex-wrap items-center gap-x-4 gap-y-2 text-neutral-500">
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="ds-hero-nav-link inline-flex items-center gap-1.5"
              aria-label="Star AtroUI on GitHub"
            >
              <Star className="size-3.5" aria-hidden />
              GitHub
            </a>
            <Link href="/docs/registry" className="ds-hero-nav-link">
              Registry
            </Link>
            <a
              href="https://www.iamk.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="ds-hero-nav-link"
            >
              iamk.xyz
            </a>
            <a
              href="https://www.makershot.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="ds-hero-nav-link"
            >
              makershot.tech
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
