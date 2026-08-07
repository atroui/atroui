"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Simple sun/moon theme toggle for narrow personal chrome.
 */
export function ThemeToggleIcon({ className }: { className?: string }) {
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
