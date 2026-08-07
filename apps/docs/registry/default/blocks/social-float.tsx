"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Github, Mail, X } from "lucide-react"

import { cn } from "@/lib/utils"

const CONTENT = {
  links: [
    { label: "Email", href: "mailto:hello@example.com", external: false },
    { label: "GitHub", href: "https://github.com", external: true },
    { label: "X / Twitter", href: "https://x.com", external: true },
    { label: "Contact", href: "/contact", external: false },
  ] as Array<{
    label: string
    href: string
    external?: boolean
    icon?: "mail" | "github" | "x" | null
  }>,
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.259 5.672L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  )
}

export function SocialFloat({
  links = CONTENT.links,
  className,
}: {
  links?: Array<{
    label: string
    href: string
    external?: boolean
    icon?: "mail" | "github" | "x" | null
  }>
  className?: string
} = {}) {
  const [open, setOpen] = React.useState(false)
  const reduceMotion = useReducedMotion()
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    const onPointer = (e: MouseEvent | TouchEvent) => {
      if (
        rootRef.current &&
        e.target instanceof Node &&
        !rootRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("mousedown", onPointer)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("mousedown", onPointer)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className={cn(
        "pointer-events-none fixed right-4 bottom-5 z-40 sm:right-6 sm:bottom-7",
        className
      )}
    >
      <div className="pointer-events-auto flex flex-col items-end gap-2">
        <AnimatePresence>
          {open ? (
            <motion.div
              key="connect-panel"
              role="dialog"
              aria-label="Connect"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-[220px] rounded-[8px] border border-border-subtle bg-background py-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
            >
              <p className="px-3 pt-2 pb-1 font-mono text-[10.5px] tracking-[0.1em] text-muted-foreground/70 uppercase">
                Connect
              </p>
              <ul>
                {links.map((item) => {
                  const iconKind =
                    item.icon ??
                    (item.href.startsWith("mailto:")
                      ? "mail"
                      : item.label.toLowerCase().includes("github")
                        ? "github"
                        : item.label.toLowerCase().includes("twitter") ||
                            item.label.toLowerCase() === "x" ||
                            item.label.toLowerCase().startsWith("x /")
                          ? "x"
                          : null)
                  const classNameRow =
                    "flex w-full items-center gap-2.5 px-3 py-2 font-mono text-[12px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  const inner = (
                    <>
                      {iconKind === "mail" ? (
                        <Mail className="h-3.5 w-3.5 shrink-0" />
                      ) : iconKind === "github" ? (
                        <Github className="h-3.5 w-3.5 shrink-0" />
                      ) : iconKind === "x" ? (
                        <XIcon className="h-3.5 w-3.5 shrink-0" />
                      ) : (
                        <span
                          className="inline-block w-3.5 text-center text-[10px]"
                          aria-hidden
                        >
                          →
                        </span>
                      )}
                      {item.label}
                    </>
                  )
                  return (
                    <li key={item.href}>
                      {item.external || item.href.startsWith("mailto:") ? (
                        <a
                          href={item.href}
                          {...(item.external
                            ? {
                                target: "_blank",
                                rel: "noopener noreferrer",
                              }
                            : {})}
                          className={classNameRow}
                          onClick={() => setOpen(false)}
                        >
                          {inner}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className={classNameRow}
                          onClick={() => setOpen(false)}
                        >
                          {inner}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close connect menu" : "Open connect menu"}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "inline-flex h-9 items-center gap-2 rounded-md border border-border-subtle bg-background px-3",
            "font-mono text-[11.5px] text-muted-foreground",
            "transition-colors hover:text-foreground",
            "focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:outline-none"
          )}
        >
          {open ? (
            <>
              <X className="h-3.5 w-3.5" strokeWidth={1.75} />
              close
            </>
          ) : (
            "connect"
          )}
        </button>
      </div>
    </div>
  )
}
