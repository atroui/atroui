import Link from "next/link"
import {
  ArrowUpRight,
  Boxes,
  Code2,
  LayoutGrid,
  ServerCog,
  Sparkles,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Pillar = {
  title: string
  body: string
  href: string
  icon: LucideIcon
  span: string
  accent?: boolean
}

const pillars: Pillar[] = [
  {
    title: "shadcn registry",
    body: "npx shadcn add @atroui/… copies real source into your repo. No lock-in, no black boxes — you own every line.",
    href: "/docs/registry",
    icon: Boxes,
    span: "lg:col-span-3",
    accent: true,
  },
  {
    title: "Host APIs · BYOK",
    body: "Contact, waitlist, newsletter, OG, thumbnail and scope routes. Hardened handlers that run on your keys, in your env.",
    href: "/docs/host-api",
    icon: ServerCog,
    span: "lg:col-span-3",
  },
  {
    title: "Production blocks",
    body: "Heroes, pricing, footers, CTAs — edit CONTENT at the top of the file and ship.",
    href: "/docs/components",
    icon: LayoutGrid,
    span: "lg:col-span-2",
  },
  {
    title: "Motion, built in",
    body: "Shared easings and view transitions. Fluid by default, quiet with reduced motion.",
    href: "/docs/components/motion-fade-in",
    icon: Sparkles,
    span: "lg:col-span-2",
  },
  {
    title: "Headless SEO",
    body: "Analytics, JSON-LD and review schema helpers — structured data, zero visible UI.",
    href: "/docs/components/seo-json-ld",
    icon: Code2,
    span: "lg:col-span-2",
  },
]

export function FeatureBento() {
  return (
    <section className="border-t border-border-subtle">
      <div className="atro-shell py-16 lg:py-24">
        <div className="max-w-2xl">
          <p className="ms-stamp">Why AtroUI</p>
          <h2 className="ds-headline mt-5 text-3xl text-foreground sm:text-4xl md:text-[2.75rem]">
            A component library that behaves like a{" "}
            <span className="ds-sketch-accent">product</span>
          </h2>
          <p className="ds-lede mt-4 max-w-xl">
            One catalog, one design language. Copy the source, wire the routes,
            keep your keys. Everything is dark-first, accessible, and tuned for
            Tailwind&nbsp;v4.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <Link
                key={pillar.title}
                href={pillar.href}
                className={`atro-tile group flex-col p-6 ${pillar.span}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex size-10 items-center justify-center rounded-lg border ${
                      pillar.accent
                        ? "border-brand/40 bg-brand/10 text-brand"
                        : "border-border-subtle bg-white/[0.04] text-foreground"
                    }`}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <ArrowUpRight
                    className="atro-tile-arrow size-4 text-muted-foreground"
                    aria-hidden
                  />
                </div>
                <h3 className="ds-sketch mt-5 text-xl text-foreground">
                  {pillar.title}
                </h3>
                <p className="ds-body mt-2 text-muted-foreground">
                  {pillar.body}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
