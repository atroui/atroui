"use client"

import * as React from "react"
import { Command } from "cmdk"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Home,
  Mail,
  Moon,
  Sun,
} from "lucide-react"

/** Edit email, nav, and connect links after install. */
const CONTENT = {
  email: "hello@example.com",
  nav: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Writing", href: "/writing" },
    { label: "Log", href: "/log" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
  ] as Array<{ label: string; href: string; external?: boolean }>,
  connect: [
    {
      label: "GitHub",
      href: "https://github.com",
      external: true,
    },
    {
      label: "X / Twitter",
      href: "https://x.com",
      external: true,
    },
  ] as Array<{ label: string; href: string; external?: boolean }>,
}

export type CommandMenuPost = { slug: string; title: string; href?: string }
export type CommandMenuPage = {
  label: string
  href: string
  external?: boolean
}

export function CommandMenu({
  email = CONTENT.email,
  nav = CONTENT.nav,
  connect = CONTENT.connect,
  posts,
  pages,
}: {
  email?: string
  nav?: CommandMenuPage[]
  connect?: CommandMenuPage[]
  posts?: CommandMenuPost[]
  pages?: CommandMenuPage[]
} = {}) {
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const [open, setOpen] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isToggle =
        (e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)
      if (isToggle) {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const run = React.useCallback((action: () => void) => {
    setOpen(false)
    requestAnimationFrame(action)
  }, [])

  const copyEmail = React.useCallback(() => {
    navigator.clipboard?.writeText(email).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }, [email])

  const go = (href: string, external?: boolean) => {
    if (external || /^https?:\/\//.test(href) || href.startsWith("mailto:")) {
      window.open(href, "_blank", "noopener,noreferrer")
      return
    }
    router.push(href)
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      loop
    >
      <div className="cmdk-input-row">
        <Command.Input
          placeholder="Type a command or search…"
          className="cmdk-input"
        />
        <kbd className="cmdk-kbd">esc</kbd>
      </div>

      <Command.List className="cmdk-list">
        <Command.Empty className="cmdk-empty">No results.</Command.Empty>

        <Command.Group heading="Go" className="cmdk-group">
          {nav.map((item) => (
            <CmdItem
              key={item.href}
              icon={<Home size={14} />}
              label={item.label}
              shortcut={
                item.external ? <ArrowUpRight size="0.9em" /> : undefined
              }
              onSelect={() => run(() => go(item.href, item.external))}
            />
          ))}
        </Command.Group>

        {pages && pages.length > 0 ? (
          <Command.Group heading="Pages" className="cmdk-group">
            {pages.map((p) => (
              <CmdItem
                key={p.href}
                icon={<ArrowRight size={14} />}
                label={p.label}
                shortcut={
                  p.external ? <ArrowUpRight size="0.9em" /> : undefined
                }
                onSelect={() => run(() => go(p.href, p.external))}
              />
            ))}
          </Command.Group>
        ) : null}

        {posts && posts.length > 0 ? (
          <Command.Group heading="Posts" className="cmdk-group">
            {posts.map((p) => {
              const href = p.href ?? `/writing/${p.slug}`
              const external = /^https?:\/\//.test(href)
              return (
                <CmdItem
                  key={p.slug}
                  icon={<ArrowRight size={14} />}
                  label={p.title}
                  shortcut={
                    external ? <ArrowUpRight size="0.9em" /> : undefined
                  }
                  onSelect={() => run(() => go(href, external))}
                />
              )
            })}
          </Command.Group>
        ) : null}

        <Command.Group heading="Connect" className="cmdk-group">
          {connect.map((item) => (
            <CmdItem
              key={item.href}
              icon={<Github size={14} />}
              label={item.label}
              shortcut={<ArrowUpRight size="0.9em" />}
              onSelect={() => run(() => go(item.href, item.external ?? true))}
            />
          ))}
          <CmdItem
            icon={<Mail size={14} />}
            label={copied ? "Email copied" : "Copy email"}
            onSelect={copyEmail}
          />
        </Command.Group>

        <Command.Group heading="Appearance" className="cmdk-group">
          <CmdItem
            icon={
              resolvedTheme === "dark" ? <Sun size={14} /> : <Moon size={14} />
            }
            label={resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
            onSelect={() =>
              run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))
            }
          />
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  )
}

function CmdItem({
  icon,
  label,
  shortcut,
  onSelect,
}: {
  icon: React.ReactNode
  label: string
  shortcut?: React.ReactNode
  onSelect: () => void
}) {
  return (
    <Command.Item onSelect={onSelect} className="cmdk-item" value={label}>
      <span className="cmdk-item-icon" aria-hidden>
        {icon}
      </span>
      <span className="cmdk-item-label">{label}</span>
      {shortcut ? (
        <span className="cmdk-item-shortcut" aria-hidden>
          {shortcut}
        </span>
      ) : null}
    </Command.Item>
  )
}
