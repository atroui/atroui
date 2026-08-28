"use client"

import * as React from "react"
import { PanelLeft } from "lucide-react"
import { cn } from "@/lib/utils"

const SIDEBAR_COOKIE_NAME = "atroui_sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 30
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextValue = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean | ((value: boolean) => boolean)) => void
  openMobile: boolean
  setOpenMobile: (open: boolean | ((value: boolean) => boolean)) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

export function useSidebar() {
  const ctx = React.useContext(SidebarContext)
  if (!ctx) {
    throw new Error("useSidebar must be used within SidebarProvider.")
  }
  return ctx
}

export function useSidebarOptional() {
  return React.useContext(SidebarContext)
}

function readSidebarCookie(): boolean | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${SIDEBAR_COOKIE_NAME}=([^;]*)`)
  )
  if (!match?.[1]) return null
  return match[1] === "true"
}

function writeSidebarCookie(open: boolean) {
  document.cookie = `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}; SameSite=Lax`
}

function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [breakpoint])

  return isMobile
}

/**
 * shadcn-style SidebarProvider: cookie persistence, ⌘B / Ctrl+B, mobile sheet state.
 */
export function SidebarProvider({
  defaultOpen = true,
  children,
}: {
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const isMobile = useIsMobile()
  const [open, setOpenState] = React.useState(defaultOpen)
  const [openMobile, setOpenMobile] = React.useState(false)
  const hydrated = React.useRef(false)

  React.useEffect(() => {
    const saved = readSidebarCookie()
    if (saved !== null) setOpenState(saved)
    hydrated.current = true
  }, [])

  const setOpen = React.useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      setOpenState((prev) => {
        const next = typeof value === "function" ? value(prev) : value
        if (hydrated.current) writeSidebarCookie(next)
        return next
      })
    },
    []
  )

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) setOpenMobile((v) => !v)
    else setOpen((v) => !v)
  }, [isMobile, setOpen])

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.key.toLowerCase() !== SIDEBAR_KEYBOARD_SHORTCUT ||
        !(event.metaKey || event.ctrlKey) ||
        event.altKey
      ) {
        return
      }
      // Don't steal from inputs / command menu.
      const target = event.target
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        return
      }
      event.preventDefault()
      toggleSidebar()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [toggleSidebar])

  const value = React.useMemo<SidebarContextValue>(
    () => ({
      state: open ? "expanded" : "collapsed",
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    }),
    [open, setOpen, openMobile, isMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}

/** Header / rail control — collapses the docs left rail (desktop). */
export function SidebarTrigger({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const sidebar = useSidebarOptional()
  if (!sidebar) return null

  return (
    <button
      type="button"
      data-sidebar="trigger"
      aria-label={sidebar.open ? "Collapse sidebar" : "Expand sidebar"}
      aria-pressed={sidebar.open}
      title="Toggle sidebar (⌘B)"
      onClick={(event) => {
        props.onClick?.(event)
        sidebar.toggleSidebar()
      }}
      className={cn(
        "hidden size-8 items-center justify-center rounded-lg border border-border-subtle bg-white/5 text-muted-foreground transition-colors hover:text-foreground lg:inline-flex",
        className
      )}
      {...props}
    >
      <PanelLeft className="size-4" aria-hidden />
    </button>
  )
}
