"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@meridian/ui"
import { LogoMark } from "@/components/logo-mark"
import { navigation } from "@/lib/navigation"

export function DocsSidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>({})

  return (
    <nav className={cn("space-y-7", className)}>
      {navigation.map((section) => {
        const isCollapsed = collapsed[section.title]
        return (
          <div key={section.title}>
            <button
              type="button"
              className="mb-2.5 flex w-full items-center justify-between px-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-neutral-400"
              onClick={() =>
                setCollapsed((prev) => ({
                  ...prev,
                  [section.title]: !prev[section.title],
                }))
              }
            >
              {section.title}
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  isCollapsed && "-rotate-90"
                )}
              />
            </button>
            {!isCollapsed ? (
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const active = pathname === item.href
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-full px-3 py-2 text-[13px] font-medium transition-colors",
                          active
                            ? "bg-white text-neutral-950 shadow-[0_1px_3px_rgb(0,0,0,0.06)]"
                            : "text-neutral-500 hover:bg-white/70 hover:text-neutral-900"
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
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-[0_1px_2px_rgb(0,0,0,0.04)]"
      >
        <Menu className="h-4 w-4" />
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 bg-neutral-950/20 backdrop-blur-[2px]">
          <div className="fixed inset-y-0 left-0 flex w-[18rem] flex-col bg-[#f2f4f6] p-5 shadow-[0_8px_40px_rgb(0,0,0,0.12)]">
            <div className="mb-6 flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                <LogoMark />
                <span className="text-[15px] font-semibold text-neutral-950">Meridian</span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-y-auto">
              <DocsSidebar />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
