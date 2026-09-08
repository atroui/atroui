"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { catalogSections, toolApps } from "@/lib/navigation"
import { TransitionLink } from "@/components/view-transitions"
import { dialogTween, revealTween } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * One IA spine — Components · Docs · Blog.
 * Components owns the catalog and the tool rooms, Docs owns the reading spine,
 * Blog owns news. Megas reveal depth only on intent (gradual revelation).
 */
type MenuId = "components" | "docs"

type NavItem = {
  href: string
  label: string
  menu?: MenuId
}

const items: NavItem[] = [
  { href: "/docs/components", label: "Components", menu: "components" },
  { href: "/docs", label: "Docs", menu: "docs" },
  { href: "/blog", label: "Blog" },
]

const categories = catalogSections.map((section) => ({
  title: section.megaLabel ?? section.title,
  href: `/docs/components?category=${encodeURIComponent(section.title)}`,
  count: section.items.length,
  sample: section.items.slice(0, 3).map((item) => item.title),
}))

const docsGroups = [
  {
    heading: "Start",
    links: [
      { href: "/docs", title: "Getting Started", body: "What AtroUI is" },
      {
        href: "/docs/installation",
        title: "Installation",
        body: "shadcn CLI setup",
      },
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
        href: "/docs/theming",
        title: "Theming",
        body: "Dark-first tokens you control",
      },
    ],
  },
  {
    heading: "Reference",
    links: [
      {
        href: "/docs/guides/launch-workflow",
        title: "Launch workflow",
        body: "Scope → social card",
      },
      {
        href: "/docs/collections",
        title: "Collections",
        body: "Jobs: forms, OG, launch",
      },
      {
        href: "/docs/compare",
        title: "Compare",
        body: "vs copy-paste kits",
      },
      { href: "/docs/brand", title: "Brand kit", body: "Logo & voice" },
      { href: "/docs/changelog", title: "Changelog", body: "Releases" },
    ],
  },
] as const

function isActive(pathname: string, label: string) {
  if (label === "Components") {
    return (
      pathname.startsWith("/docs/components") ||
      toolApps.some(
        (tool) =>
          pathname === tool.href || pathname.startsWith(`${tool.href}/`)
      )
    )
  }
  if (label === "Docs") {
    return (
      pathname === "/docs" ||
      (pathname.startsWith("/docs/") &&
        !pathname.startsWith("/docs/components"))
    )
  }
  if (label === "Blog") {
    return pathname.startsWith("/blog") || pathname.startsWith("/updates")
  }
  return false
}

const RULE_CLASS = "absolute inset-x-2.5 -bottom-px h-px bg-foreground/70"

/** One ink for the whole spine — it travels between Components/Docs/Blog. */
function ActiveRule({ reduce }: { reduce: boolean | null }) {
  if (reduce) return <span className={RULE_CLASS} aria-hidden />
  return (
    <motion.span
      layoutId="site-nav-rule"
      transition={revealTween}
      className={RULE_CLASS}
      aria-hidden
    />
  )
}

function MenuSurface({
  id,
  width,
  children,
}: {
  id: string
  width: string
  children: React.ReactNode
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 4 }}
      transition={dialogTween}
      className="absolute left-0 top-full z-50 pt-3"
    >
      <div
        id={id}
        className={cn(
          "overflow-hidden rounded-xl border border-border-subtle bg-popover/98 p-2 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.75)] backdrop-blur-xl",
          width
        )}
      >
        {children}
      </div>
    </motion.div>
  )
}

function MenuLink({
  href,
  title,
  body,
  onNavigate,
}: {
  href: string
  title: string
  body: string
  onNavigate: () => void
}) {
  return (
    <TransitionLink
      href={href}
      transitionTypes={[]}
      onClick={onNavigate}
      className="rounded-lg border border-transparent p-3 transition-colors hover:border-border-subtle hover:bg-white/[0.04]"
    >
      <span className="text-[13px] font-medium text-foreground">{title}</span>
      <p className="ds-meta mt-1">{body}</p>
    </TransitionLink>
  )
}

function ComponentsMenu({
  id,
  onNavigate,
}: {
  id: string
  onNavigate: () => void
}) {
  return (
    <MenuSurface id={id} width="w-[42rem]">
      <div className="grid grid-cols-[11rem_1fr] gap-2">
        <div className="flex flex-col gap-2">
          <TransitionLink
            href="/docs/components"
            transitionTypes={[]}
            onClick={onNavigate}
            className="flex flex-1 flex-col justify-between rounded-lg border border-border-subtle bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.05]"
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

          <div className="rounded-lg border border-border-subtle p-2">
            <h3 className="ds-mono-label mb-1.5 px-1">Tools</h3>
            <div className="flex flex-col">
              {toolApps.map((tool) => (
                <TransitionLink
                  key={tool.href}
                  href={tool.href}
                  transitionTypes={[]}
                  onClick={onNavigate}
                  className="rounded-md px-1 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
                >
                  {tool.title}
                </TransitionLink>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="ds-mono-label mb-1.5 px-3 pt-2">Catalog</h3>
          {/* Odd catalog count: let the last card fill the row instead of leaving a hole. */}
          <div className="grid grid-cols-2 gap-1 [&>a:last-child:nth-child(odd)]:col-span-2">
            {categories.map((category) => (
              <TransitionLink
                key={category.title}
                href={category.href}
                transitionTypes={[]}
                onClick={onNavigate}
                className="rounded-lg border border-transparent p-3 transition-colors hover:border-border-subtle hover:bg-white/[0.04]"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-base font-medium tracking-[-0.01em] text-foreground">
                    {category.title}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {category.count}
                  </span>
                </div>
                <p className="ds-meta mt-1 truncate">
                  {category.sample.join(" · ")}
                </p>
              </TransitionLink>
            ))}
          </div>
        </div>
      </div>
    </MenuSurface>
  )
}

function DocsMenu({ id, onNavigate }: { id: string; onNavigate: () => void }) {
  return (
    <MenuSurface id={id} width="w-[30rem]">
      <div className="grid grid-cols-2 gap-2">
        {docsGroups.map((group) => (
          <div key={group.heading}>
            <h3 className="ds-mono-label mb-1.5 px-3 pt-2">{group.heading}</h3>
            <div className="flex flex-col">
              {group.links.map((link) => (
                <MenuLink
                  key={link.href}
                  href={link.href}
                  title={link.title}
                  body={link.body}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </MenuSurface>
  )
}

export function SiteNav() {
  const pathname = usePathname() || "/"
  const reduce = useReducedMotion()
  const [openMenu, setOpenMenu] = React.useState<MenuId | null>(null)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )

  React.useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    },
    []
  )

  function show(id: MenuId) {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenMenu(id)
  }
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120)
  }
  function close() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenMenu(null)
  }

  return (
    <nav
      aria-label="Primary"
      className="relative ml-1 hidden items-center md:ml-2 md:flex lg:ml-3"
    >
      {items.map((item) => {
        const active = isActive(pathname, item.label)

        if (item.menu) {
          const menu = item.menu
          const isOpen = openMenu === menu
          const menuId = `site-nav-${menu}`
          return (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => show(menu)}
              onMouseLeave={scheduleClose}
              onKeyDown={(event) => {
                if (event.key === "Escape" && isOpen) close()
              }}
            >
              <TransitionLink
                href={item.href}
                transitionTypes={[]}
                aria-expanded={isOpen}
                aria-controls={isOpen ? menuId : undefined}
                aria-current={pathname === item.href ? "page" : undefined}
                onFocus={() => show(menu)}
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
                {active ? <ActiveRule reduce={reduce} /> : null}
              </TransitionLink>

              <AnimatePresence>
                {isOpen ? (
                  <div
                    onMouseEnter={() => show(menu)}
                    onMouseLeave={scheduleClose}
                  >
                    {menu === "components" ? (
                      <ComponentsMenu id={menuId} onNavigate={close} />
                    ) : (
                      <DocsMenu id={menuId} onNavigate={close} />
                    )}
                  </div>
                ) : null}
              </AnimatePresence>
            </div>
          )
        }

        return (
          <TransitionLink
            key={item.label}
            href={item.href}
            transitionTypes={[]}
            aria-current={pathname === item.href ? "page" : undefined}
            className={cn(
              "relative block px-2.5 py-1.5 text-[13px] font-medium transition-colors xl:px-3",
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
            {active ? <ActiveRule reduce={reduce} /> : null}
          </TransitionLink>
        )
      })}
    </nav>
  )
}
