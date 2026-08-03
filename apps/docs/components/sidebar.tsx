"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button, cn } from "@meridian/ui"
import { navigation } from "@/lib/navigation"

export function DocsSidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>({})

  return (
    <nav className={cn("space-y-6", className)}>
      {navigation.map((section) => {
        const isCollapsed = collapsed[section.title]
        return (
          <div key={section.title}>
            <button
              type="button"
              className="mb-2 flex w-full items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              onClick={() =>
                setCollapsed((prev) => ({
                  ...prev,
                  [section.title]: !prev[section.title],
                }))
              }
            >
              {section.title}
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition-transform", isCollapsed && "-rotate-90")}
              />
            </button>
            {!isCollapsed ? (
              <ul className="space-y-0.5 border-l border-border/80 pl-3">
                {section.items.map((item) => {
                  const active = pathname === item.href
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-md px-2 py-1.5 text-sm transition-colors",
                          active
                            ? "bg-accent font-medium text-accent-foreground"
                            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                        )}
                      >
                        {item.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </div>
        )
      })}
    </nav>
  )
}

export function MobileSidebar() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <div className="lg:hidden">
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="Open menu">
        <Menu className="h-5 w-5" />
      </Button>
      {open ? (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-72 border-r bg-background p-6 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <Link href="/" className="font-display text-xl font-semibold" onClick={() => setOpen(false)}>
                Meridian
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <DocsSidebar />
          </div>
        </div>
      ) : null}
    </div>
  )
}
