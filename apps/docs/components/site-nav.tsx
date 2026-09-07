"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { navigation } from "@/lib/navigation"
import { TransitionLink } from "@/components/view-transitions"
import { dialogTween } from "@/lib/motion"
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

/** Quiet mega-menu — one skin for landing + docs (Zed: no brand glow). */
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
    >
      {items.map((item) => {
        const active = isActive(pathname, item.href)

        if (item.menu) {
          return (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={openMenu}
              onMouseLeave={scheduleClose}
            >
              <TransitionLink
                href={item.href}
                transitionTypes={[]}
                aria-expanded={menuOpen}
                onFocus={openMenu}
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
                    menuOpen && "rotate-180"
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
          <TransitionLink
            key={item.href}
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
