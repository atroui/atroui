"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { navigation } from "@/lib/navigation"
import { TransitionLink } from "@/components/view-transitions"
import { dialogTween } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * Product / Resources IA — Zed grammar for a registry product.
 * Product → Components mega + Tools. Resources → Docs + Blog.
 */
type NavItem = {
  href: string
  label: string
  menu?: "components" | "product" | "resources"
}

const items: NavItem[] = [
  { href: "/docs/components", label: "Product", menu: "product" },
  { href: "/docs", label: "Resources", menu: "resources" },
  { href: "/docs/components", label: "Components", menu: "components" },
]

const categories = navigation
  .filter(
    (s) =>
      s.title !== "Getting Started" && s.title !== "More"
  )
  .map((s) => ({
    title: s.title,
    count: s.items.length,
    sample: s.items.slice(0, 3).map((i) => i.title),
  }))

function isActive(pathname: string, href: string, label: string) {
  if (label === "Product") {
    return (
      pathname.startsWith("/docs/components") ||
      pathname.startsWith("/docs/registry") ||
      pathname.startsWith("/docs/host-api") ||
      pathname === "/og" ||
      pathname === "/planner"
    )
  }
  if (label === "Resources") {
    return (
      pathname === "/docs" ||
      pathname.startsWith("/docs/installation") ||
      pathname.startsWith("/docs/changelog") ||
      pathname.startsWith("/blog") ||
      pathname.startsWith("/updates") ||
      (pathname.startsWith("/docs/") &&
        !pathname.startsWith("/docs/components") &&
        !pathname.startsWith("/docs/registry") &&
        !pathname.startsWith("/docs/host-api"))
    )
  }
  if (href === "/docs/components") return pathname.startsWith("/docs/components")
  return pathname === href || pathname.startsWith(`${href}/`)
}

function ProductMenu({ onNavigate }: { onNavigate: () => void }) {
  const reduce = useReducedMotion()
  const links = [
    {
      href: "/docs/registry",
      title: "Registry",
      body: "Own source via shadcn add @atroui/…",
    },
    {
      href: "/docs/host-api",
      title: "Host APIs",
      body: "Forms & AI routes on your keys",
    },
    {
      href: "/docs/components",
      title: "Components",
      body: "Live gallery of primitives & blocks",
    },
    {
      href: "/og",
      title: "OG workspace",
      body: "Generate social cards in the browser",
    },
    {
      href: "/planner",
      title: "Project planner",
      body: "Scope a build, hand off to OG",
    },
    {
      href: "/docs/theming",
      title: "Theming",
      body: "Dark-first tokens you control",
    },
  ] as const

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 4 }}
      transition={dialogTween}
      className="absolute left-0 top-full z-50 pt-3"
    >
      <div className="w-[28rem] overflow-hidden rounded-xl border border-border-subtle bg-popover/98 p-2 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.75)] backdrop-blur-xl">
        <div className="grid grid-cols-2 gap-1">
          {links.map((link) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              transitionTypes={[]}
              onClick={onNavigate}
              className="rounded-lg border border-transparent p-3 transition-colors hover:border-border-subtle hover:bg-white/[0.04]"
            >
              <span className="text-[13px] font-medium text-foreground">
                {link.title}
              </span>
              <p className="ds-meta mt-1">{link.body}</p>
            </TransitionLink>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function ResourcesMenu({ onNavigate }: { onNavigate: () => void }) {
  const reduce = useReducedMotion()
  const links = [
    { href: "/docs", title: "Getting Started", body: "What AtroUI is" },
    { href: "/docs/installation", title: "Installation", body: "CLI setup" },
    {
      href: "/docs/guides/launch-workflow",
      title: "Launch workflow",
      body: "Scope → social card",
    },
    { href: "/blog", title: "Blog", body: "Guides & essays" },
    { href: "/docs/changelog", title: "Changelog", body: "Releases" },
    { href: "/updates", title: "Updates", body: "Major news by email" },
  ] as const

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 4 }}
      transition={dialogTween}
      className="absolute left-0 top-full z-50 pt-3"
    >
      <div className="w-[26rem] overflow-hidden rounded-xl border border-border-subtle bg-popover/98 p-2 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.75)] backdrop-blur-xl">
        <div className="grid grid-cols-2 gap-1">
          {links.map((link) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              transitionTypes={[]}
              onClick={onNavigate}
              className="rounded-lg border border-transparent p-3 transition-colors hover:border-border-subtle hover:bg-white/[0.04]"
            >
              <span className="text-[13px] font-medium text-foreground">
                {link.title}
              </span>
              <p className="ds-meta mt-1">{link.body}</p>
            </TransitionLink>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function ComponentsMenu({ onNavigate }: { onNavigate: () => void }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 4 }}
      transition={dialogTween}
      className="absolute left-0 top-full z-50 pt-3"
    >
      <div className="w-[40rem] overflow-hidden rounded-xl border border-border-subtle bg-popover/98 p-2 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.75)] backdrop-blur-xl">
        <div className="grid grid-cols-3 gap-1.5">
          <TransitionLink
            href="/docs/components"
            transitionTypes={[]}
            onClick={onNavigate}
            className="col-span-1 row-span-2 flex flex-col justify-between rounded-lg border border-border-subtle bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.05]"
          >
            <div>
              <p className="text-lg font-medium tracking-[-0.02em] text-foreground">
                Gallery
              </p>
              <p className="ds-meta mt-1">
                Browse every block with real, running previews.
              </p>
            </div>
            <span className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              View all →
            </span>
          </TransitionLink>

          {categories.map((cat) => (
            <TransitionLink
              key={cat.title}
              href={`/docs/components?category=${encodeURIComponent(cat.title)}`}
              transitionTypes={[]}
              onClick={onNavigate}
              className="group rounded-lg border border-transparent p-3 transition-colors hover:border-border-subtle hover:bg-white/[0.04]"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-base font-medium tracking-[-0.01em] text-foreground">
                  {cat.title}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {cat.count}
                </span>
              </div>
              <p className="ds-meta mt-1 truncate">{cat.sample.join(" · ")}</p>
            </TransitionLink>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function SiteNav() {
  const pathname = usePathname() || "/"
  const [openMenu, setOpenMenu] = React.useState<string | null>(null)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )

  function show(id: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenMenu(id)
  }
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120)
  }

  return (
    <nav
      aria-label="Primary"
      className="relative ml-1 hidden items-center md:ml-2 md:flex lg:ml-3"
    >
      {items.map((item) => {
        const active = isActive(pathname, item.href, item.label)
        const menuId = item.menu ?? item.label

        if (item.menu) {
          const isOpen = openMenu === item.menu
          return (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => show(item.menu!)}
              onMouseLeave={scheduleClose}
            >
              <TransitionLink
                href={item.href}
                transitionTypes={[]}
                aria-expanded={isOpen}
                onFocus={() => show(item.menu!)}
                className={cn(
                  "relative flex items-center gap-1 px-2.5 py-1.5 text-[13px] font-medium transition-colors xl:px-3",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span>{item.label}</span>
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                  aria-hidden
                />
                {active ? (
                  <span
                    className="absolute inset-x-2.5 -bottom-px h-px bg-foreground/70"
                    aria-hidden
                  />
                ) : null}
              </TransitionLink>

              <AnimatePresence>
                {isOpen ? (
                  <div
                    onMouseEnter={() => show(item.menu!)}
                    onMouseLeave={scheduleClose}
                  >
                    {item.menu === "product" ? (
                      <ProductMenu onNavigate={() => setOpenMenu(null)} />
                    ) : null}
                    {item.menu === "resources" ? (
                      <ResourcesMenu onNavigate={() => setOpenMenu(null)} />
                    ) : null}
                    {item.menu === "components" ? (
                      <ComponentsMenu onNavigate={() => setOpenMenu(null)} />
                    ) : null}
                  </div>
                ) : null}
              </AnimatePresence>
            </div>
          )
        }

        return (
          <TransitionLink
            key={menuId}
            href={item.href}
            transitionTypes={[]}
            className={cn(
              "relative block px-2.5 py-1.5 text-[13px] font-medium transition-colors xl:px-3",
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
            {active ? (
              <span
                className="absolute inset-x-2.5 -bottom-px h-px bg-foreground/70"
                aria-hidden
              />
            ) : null}
          </TransitionLink>
        )
      })}
    </nav>
  )
}
