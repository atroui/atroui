"use client"

import { Github, Star } from "lucide-react"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "atroui"
import { LogoMark } from "@/components/logo-mark"
import { CommandMenu } from "@/components/command-menu"
import { MobileNav } from "@/components/mobile-nav"
import { SidebarTrigger } from "@/components/sidebar-provider"
import {
  SharedBrand,
  SharedOwnCta,
  TransitionLink,
} from "@/components/view-transitions"
import { isPrimaryNavActive, primaryNav } from "@/lib/primary-nav"
import { PRODUCT_OUTER } from "@/lib/product-layout"
import { cn } from "@/lib/utils"

const GITHUB_REPO = "https://github.com/atroui/atroui"

/**
 * One header everywhere (shadcn). Landing `/` uses void glass;
 * product routes use theme tokens so previews + ThemeToggle stay honest.
 * MobileNav is sitewide (primary + docs tree).
 */
export function SiteHeader({ docs = false }: { docs?: boolean }) {
  const pathname = usePathname()
  const onLanding = pathname === "/"

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b pt-[env(safe-area-inset-top)] backdrop-blur-md",
        onLanding
          ? "border-white/10 bg-black/80 text-white"
          : "border-border-subtle bg-background/90 text-foreground"
      )}
      style={{ viewTransitionName: "site-header" }}
    >
      <div
        className={cn(
          PRODUCT_OUTER,
          "flex h-(--header-height) items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8"
        )}
      >
        <MobileNav tone={onLanding ? "landing" : "product"} />
        {docs ? <SidebarTrigger /> : null}

        <SharedBrand>
          <TransitionLink
            href="/"
            className="flex min-w-0 items-center gap-2.5"
            aria-label="AtroUI home"
          >
            <LogoMark
              className={cn(
                "h-7 w-7 shrink-0 sm:h-8 sm:w-8",
                onLanding ? "text-white" : "text-foreground"
              )}
            />
            <span
              className={cn(
                "ds-sketch truncate text-xl tracking-tight sm:text-2xl",
                onLanding ? "text-white" : "text-foreground"
              )}
            >
              AtroUI
            </span>
          </TransitionLink>
        </SharedBrand>

        <nav
          aria-label="Primary"
          className={cn(
            "ml-2 hidden items-center gap-1 md:flex lg:ml-3",
            onLanding ? "text-white/65" : "text-muted-foreground"
          )}
        >
          {primaryNav.map((item) => {
            const active = isPrimaryNavActive(pathname, item.href)
            return (
              <TransitionLink
                key={item.href}
                href={item.href}
                transitionTypes={onLanding ? undefined : []}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? onLanding
                      ? "text-white"
                      : "text-foreground"
                    : onLanding
                      ? "hover:text-white"
                      : "hover:text-foreground"
                )}
              >
                {item.label}
              </TransitionLink>
            )
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="md:hidden">
            <CommandMenu compact onLanding={onLanding} />
          </div>
          <div className="hidden md:block">
            <CommandMenu onLanding={onLanding} />
          </div>
          <ThemeToggle />
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Star AtroUI on GitHub"
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-lg border px-2.5 transition-colors sm:h-10 sm:gap-2 sm:px-3.5",
              onLanding
                ? "border-white/15 bg-white/4 text-white hover:border-white/25 hover:bg-white/8"
                : "border-border-subtle bg-white/[0.03] text-foreground hover:bg-white/[0.06]"
            )}
          >
            <Github className="size-3.5" aria-hidden />
            <span className="hidden text-sm font-medium sm:inline">Star</span>
            <Star className="size-3.5 opacity-80" aria-hidden />
          </a>
          <SharedOwnCta>
            <TransitionLink
              href="/docs/registry"
              transitionTypes={onLanding ? undefined : []}
              className={cn(
                "hidden h-9 items-center px-3.5 text-sm font-medium md:inline-flex lg:h-10 lg:px-4",
                onLanding
                  ? "rounded-lg bg-white text-black hover:bg-white/90"
                  : "ms-cta"
              )}
            >
              Own the UI
            </TransitionLink>
          </SharedOwnCta>
        </div>
      </div>
    </header>
  )
}
