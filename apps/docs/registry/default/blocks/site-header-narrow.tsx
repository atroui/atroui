"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { getBrand } from "@/lib/brand"
import { cn } from "@/lib/utils"

const CONTENT = {
  siteName: "",
  primaryNav: [
    { href: "/projects", label: "projects" },
    { href: "/writing", label: "writing" },
    { href: "/resume", label: "resume" },
  ] as Array<{ href: string; label: string; external?: boolean }>,
  moreNav: [
    { href: "/log", label: "log" },
    { href: "/stack", label: "stack" },
    { href: "/contact", label: "contact" },
  ] as Array<{ href: string; label: string }>,
}

/** Inlined icon toggle so this block stays installable alone. */
function ThemeToggleIcon({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === "dark"
  const next = isDark ? "light" : "dark"
  const label = `Switch to ${next} mode`

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(next)}
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground",
        className
      )}
    >
      {!mounted ? (
        <Sun className="h-[13px] w-[13px] opacity-0" aria-hidden />
      ) : isDark ? (
        <Sun className="h-[13px] w-[13px]" aria-hidden />
      ) : (
        <Moon className="h-[13px] w-[13px]" aria-hidden />
      )}
    </button>
  )
}

export function SiteHeaderNarrow({
  siteName,
  primaryNav = CONTENT.primaryNav,
  moreNav = CONTENT.moreNav,
  onOpenCommand,
  className,
}: {
  siteName?: string
  primaryNav?: Array<{ href: string; label: string; external?: boolean }>
  moreNav?: Array<{ href: string; label: string }>
  onOpenCommand?: () => void
  className?: string
} = {}) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = React.useState(false)
  const wordmark = siteName || CONTENT.siteName || getBrand().name

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b pt-[env(safe-area-inset-top)] transition-colors",
        scrolled
          ? "border-border-subtle bg-background/85 backdrop-blur-xl"
          : "border-border-subtle/60 bg-background/50 backdrop-blur-md",
        className
      )}
    >
      <div className="mx-auto flex h-[52px] max-w-[640px] items-center justify-between px-5">
        <Link
          href="/"
          aria-label="Home"
          className="inline-flex items-center gap-2 hover:opacity-80"
        >
          <span className="font-mono text-[12px] tracking-[-0.01em] text-muted-foreground">
            {wordmark}
          </span>
        </Link>

        <nav className="flex items-center gap-0.5 text-[13px]">
          {primaryNav.map((item) => {
            const active =
              !item.external &&
              (pathname === item.href ||
                pathname.startsWith(`${item.href}/`))
            const itemClass = cn(
              "rounded-md px-2 py-1 font-mono text-[12px] transition-colors",
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )

            if (item.external) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={itemClass}
                >
                  {item.label}
                </a>
              )
            }

            return (
              <Link key={item.href} href={item.href} className={itemClass}>
                {item.label}
              </Link>
            )
          })}

          {moreNav.length > 0 ? (
            <MoreMenu pathname={pathname} items={moreNav} />
          ) : null}

          <span className="mx-1 h-3.5 w-px bg-border-subtle" aria-hidden />
          {onOpenCommand ? (
            <button
              type="button"
              onClick={onOpenCommand}
              aria-label="Open command menu"
              title="Open command menu (⌘K)"
              className="ml-0.5 hidden items-center gap-1 rounded-md border border-border-subtle bg-muted px-1.5 py-[3px] font-mono text-[10.5px] text-muted-foreground hover:text-foreground sm:inline-flex"
            >
              <kbd className="font-mono">⌘</kbd>
              <kbd className="font-mono">K</kbd>
            </button>
          ) : null}
          <ThemeToggleIcon />
        </nav>
      </div>
    </header>
  )
}

function MoreMenu({
  pathname,
  items,
}: {
  pathname: string
  items: Array<{ href: string; label: string }>
}) {
  const [open, setOpen] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement>(null)

  const moreActive = items.some(
    (item) =>
      pathname === item.href || pathname.startsWith(`${item.href}/`)
  )

  React.useEffect(() => {
    if (!open) return
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onPointer)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onPointer)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label="More pages"
        aria-expanded={open}
        aria-haspopup="menu"
        title="More"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center justify-center rounded-md px-2 py-1 transition-colors",
          open || moreActive
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Menu size={15} strokeWidth={1.75} aria-hidden />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute top-[calc(100%+6px)] right-0 z-50 min-w-[132px] rounded-md border border-border-subtle bg-background py-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
        >
          {items.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                className={cn(
                  "block px-3 py-1.5 font-mono text-[12px] transition-colors",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
