"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { LogoMark } from "@/components/logo-mark"
import { OverlayShell } from "@/components/overlay-shell"
import { DocsSidebar } from "@/components/sidebar"
import { useSidebarOptional } from "@/components/sidebar-provider"
import { isPrimaryNavActive, primaryNav } from "@/lib/primary-nav"

/**
 * shadcn MobileNav — sitewide: primary doors + docs tree.
 * On docs routes, open state is shared with SidebarProvider (⌘B).
 */
export function MobileNav({
  className,
  tone = "product",
}: {
  className?: string
  /** Landing void chrome vs token product chrome. */
  tone?: "product" | "landing"
}) {
  const sidebar = useSidebarOptional()
  const [localOpen, setLocalOpen] = React.useState(false)
  const pathname = usePathname()
  const onDocs = pathname === "/docs" || pathname.startsWith("/docs/")

  const open = sidebar ? sidebar.openMobile : localOpen
  const setOpen = sidebar ? sidebar.setOpenMobile : setLocalOpen

  React.useEffect(() => {
    setOpen(false)
  }, [pathname, setOpen])

  const triggerClass =
    tone === "landing"
      ? "inline-flex size-9 items-center justify-center rounded-lg border border-white/15 bg-white/4 text-white"
      : "inline-flex size-9 items-center justify-center rounded-lg border border-border-subtle bg-white/5 text-foreground"

  const panelClass =
    tone === "landing"
      ? "w-[min(20rem,calc(100vw-2.5rem))] border-white/10 bg-black p-4 pt-[max(1.25rem,env(safe-area-inset-top))] shadow-[-24px_0_48px_rgba(0,0,0,0.65)] sm:p-5"
      : "w-[min(20rem,calc(100vw-2.5rem))] border-border-subtle bg-background p-4 pt-[max(1.25rem,env(safe-area-inset-top))] shadow-[0_0_40px_color-mix(in_oklch,var(--color-brand)_20%,transparent)] sm:p-5"

  return (
    <div className={cn("lg:hidden", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={triggerClass}
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>
      <OverlayShell
        open={open}
        onClose={() => setOpen(false)}
        side="left"
        label="Site menu"
        trapFocus
        className="lg:hidden"
        panelClassName={panelClass}
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <LogoMark
              className={
                tone === "landing" ? "text-white" : "text-foreground"
              }
            />
            <span
              className={cn(
                "ds-sketch truncate text-xl tracking-tight",
                tone === "landing" ? "text-white" : "text-foreground"
              )}
            >
              AtroUI
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className={cn(
              "inline-flex size-9 shrink-0 items-center justify-center rounded-lg",
              tone === "landing" ? "text-white" : "text-foreground"
            )}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav aria-label="Primary" className="mb-6 space-y-0.5">
          <p
            className={cn(
              "ds-nav-section mb-2 px-2",
              tone === "landing" && "text-white/45"
            )}
          >
            Site
          </p>
          {primaryNav.map((item) => {
            const active = isPrimaryNavActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex rounded-md px-3 py-2 text-[14px] font-medium transition-colors",
                  tone === "landing"
                    ? active
                      ? "bg-white/10 text-white"
                      : "text-white/55 hover:bg-white/5 hover:text-white"
                    : active
                      ? "bg-white/10 text-foreground"
                      : "text-muted-foreground hover:bg-white/4 hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain border-t border-border-subtle pt-4 pb-[env(safe-area-inset-bottom)]">
          <p
            className={cn(
              "ds-nav-section mb-3 px-2",
              tone === "landing" && "text-white/45"
            )}
          >
            {onDocs ? "On this section" : "Docs"}
          </p>
          <DocsSidebar />
        </div>
      </OverlayShell>
    </div>
  )
}

/** @deprecated Use MobileNav — kept as alias for any leftover imports. */
export function MobileSidebar() {
  return <MobileNav />
}
