"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { navigation } from "@/lib/navigation"
import { TransitionLink } from "@/components/view-transitions"
import { dialogTween, panelTween } from "@/lib/motion"
import { cn } from "@/lib/utils"

type NavItem = { href: string; label: string; menu?: boolean }

const items: NavItem[] = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/components", label: "Components", menu: true },
  { href: "/blog", label: "Blog" },
]

const categories = navigation
  .filter((s) => s.title !== "Getting Started")
  .map((s) => ({
    title: s.title,
    count: s.items.length,
    sample: s.items.slice(0, 3).map((i) => i.title),
  }))

function isActive(pathname: string, href: string) {
  if (href === "/docs/components") return pathname.startsWith("/docs/components")
  if (href === "/docs")
    return pathname === "/docs" || pathname.startsWith("/docs/")
      ? !pathname.startsWith("/docs/components")
      : false
  return pathname === href || pathname.startsWith(`${href}/`)
}

function ComponentsMenu({ onNavigate }: { onNavigate: () => void }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.98 }}
      transition={dialogTween}
      className="absolute left-0 top-full z-50 pt-3"
    >
      <div className="w-[40rem] overflow-hidden rounded-xl border border-border-subtle bg-popover/95 p-2 shadow-[0_24px_60px_-24px_color-mix(in_oklch,var(--brand)_45%,transparent)] backdrop-blur-xl">
        <div className="grid grid-cols-3 gap-1.5">
          <TransitionLink
            href="/docs/components"
            transitionTypes={[]}
            onClick={onNavigate}
            className="col-span-1 row-span-2 flex flex-col justify-between rounded-lg border border-brand/30 bg-brand/10 p-4 transition-colors hover:bg-brand/15"
          >
            <div>
              <p className="ds-sketch text-lg text-foreground">Gallery</p>
              <p className="ds-meta mt-1">
                Browse every block with real, running previews.
              </p>
            </div>
            <span className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-brand">
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
                <span className="ds-sketch text-base text-foreground">
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
  const reduce = useReducedMotion()
  const [hovered, setHovered] = React.useState<string | null>(null)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )

  function openMenu() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMenuOpen(true)
  }
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMenuOpen(false), 120)
  }

  return (
    <nav
      aria-label="Primary"
      className="relative ml-1 hidden items-center md:ml-2 md:flex lg:ml-3"
      onMouseLeave={() => setHovered(null)}
    >
      {items.map((item) => {
        const active = isActive(pathname, item.href)
        const isHovered = hovered === item.href

        if (item.menu) {
          return (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => {
                setHovered(item.href)
                openMenu()
              }}
              onMouseLeave={scheduleClose}
            >
              <TransitionLink
                href={item.href}
                transitionTypes={[]}
                aria-expanded={menuOpen}
                onFocus={openMenu}
                className={cn(
                  "relative flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors xl:px-3",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isHovered && !reduce ? (
                  <motion.span
                    layoutId="site-nav-pill"
                    className="absolute inset-0 -z-10 rounded-lg bg-white/[0.07]"
                    transition={panelTween}
                  />
                ) : null}
                <span className="relative z-10">{item.label}</span>
                <ChevronDown
                  className={cn(
                    "relative z-10 size-3.5 transition-transform duration-200",
                    menuOpen && "rotate-180"
                  )}
                  aria-hidden
                />
                {active ? (
                  <span className="absolute inset-x-2.5 -bottom-px h-px bg-brand" aria-hidden />
                ) : null}
              </TransitionLink>

              <AnimatePresence>
                {menuOpen ? (
                  <div onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
                    <ComponentsMenu onNavigate={() => setMenuOpen(false)} />
                  </div>
                ) : null}
              </AnimatePresence>
            </div>
          )
        }

        return (
          <div
            key={item.href}
            className="relative"
            onMouseEnter={() => setHovered(item.href)}
          >
            <TransitionLink
              href={item.href}
              transitionTypes={[]}
              className={cn(
                "relative block rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors xl:px-3",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isHovered && !reduce ? (
                <motion.span
                  layoutId="site-nav-pill"
                  className="absolute inset-0 -z-10 rounded-lg bg-white/[0.07]"
                  transition={panelTween}
                />
              ) : null}
              <span className="relative z-10">{item.label}</span>
              {active ? (
                <span className="absolute inset-x-2.5 -bottom-px h-px bg-brand" aria-hidden />
              ) : null}
            </TransitionLink>
          </div>
        )
      })}
    </nav>
  )
}
