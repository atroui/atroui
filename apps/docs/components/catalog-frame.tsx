"use client"

import * as React from "react"
import Link from "next/link"
import { Check, Copy } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import posthog from "posthog-js"
import { cn } from "@/lib/utils"
import { CodeBlock } from "@/components/code-block"
import { revealTween } from "@/lib/motion"

export type CatalogFrameTone = "product" | "landing"

export function CatalogCopyBtn({
  text,
  tone = "product",
  className,
}: {
  text: string
  tone?: CatalogFrameTone
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      posthog.capture("documentation_code_copied", {
        language: "bash",
        embedded: true,
        kind: "install",
      })
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy install command"}
      className={cn(
        "inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors",
        tone === "landing"
          ? "text-[color:var(--ds-cyan,#92dbe0)] hover:bg-[color:var(--ds-cyan,#92dbe0)]/15 hover:text-white"
          : "catalog-install-btn",
        className
      )}
    >
      {copied ? (
        <Check className="size-3.5" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
    </button>
  )
}

export function CatalogMetaToolbar({
  tone = "product",
  registrySlug,
  blurb,
  installCommand,
  trailing,
  className,
}: {
  tone?: CatalogFrameTone
  registrySlug?: string
  blurb?: string
  installCommand?: string
  trailing?: React.ReactNode
  className?: string
}) {
  if (!registrySlug && !blurb && !installCommand && !trailing) return null

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-3 px-3 py-2.5 sm:flex-row sm:items-center sm:gap-4 sm:px-4",
        tone === "landing"
          ? "border-b border-white/10"
          : "catalog-frame-toolbar",
        className
      )}
    >
      <div className="min-w-0 flex-1">
        {registrySlug || blurb ? (
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            {registrySlug ? (
              <span
                className={cn(
                  "font-mono text-[12px]",
                  tone === "landing"
                    ? "text-[color:var(--ds-cyan,#92dbe0)]"
                    : "catalog-slug"
                )}
              >
                {registrySlug}
              </span>
            ) : null}
            {registrySlug && blurb ? (
              <span
                className={cn(
                  "text-[12px]",
                  tone === "landing" ? "text-white/35" : "text-muted-foreground/50"
                )}
              >
                ·
              </span>
            ) : null}
            {blurb ? (
              <span
                className={cn(
                  "text-[12px]",
                  tone === "landing" ? "text-white/50" : "text-muted-foreground"
                )}
              >
                {blurb}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
      {installCommand || trailing ? (
        <div className="flex min-w-0 items-center gap-2 sm:ml-auto sm:max-w-[min(100%,28rem)]">
          {installCommand ? (
            <div
              className={cn(
                "flex min-w-0 flex-1 items-center gap-1.5 rounded-lg py-1 pr-1 pl-2.5 sm:gap-2 sm:pl-3",
                tone === "landing"
                  ? "border border-[color:var(--ds-cyan,#92dbe0)]/25 bg-[color:var(--ds-cyan,#92dbe0)]/10"
                  : "catalog-install"
              )}
            >
              <span
                className={cn(
                  "hidden shrink-0 font-mono text-[12px] font-medium sm:inline",
                  tone === "landing"
                    ? "text-[color:var(--ds-cyan,#92dbe0)]"
                    : "catalog-slug"
                )}
                aria-hidden
              >
                $
              </span>
              <code
                className={cn(
                  "min-w-0 flex-1 truncate font-mono text-[11px] sm:text-[12px]",
                  tone === "landing" && "text-white"
                )}
              >
                {installCommand}
              </code>
              <CatalogCopyBtn text={installCommand} tone={tone} />
            </div>
          ) : null}
          {trailing}
        </div>
      ) : null}
    </div>
  )
}

export function CatalogDocsLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-white/45 transition-colors hover:text-white"
    >
      Docs
    </Link>
  )
}

type CatalogTabBarProps = {
  tab: "preview" | "code"
  onTab: (tab: "preview" | "code") => void
  layoutId?: string
}

export function CatalogTabBar({
  tab,
  onTab,
  layoutId = "catalog-tab-indicator",
}: CatalogTabBarProps) {
  const reduce = useReducedMotion()

  return (
    <div className="catalog-frame-toolbar flex min-w-0 items-center gap-2 px-1.5">
      <div className="relative flex shrink-0 gap-0.5 p-1.5">
        {(["preview", "code"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => onTab(key)}
            className={cn(
              "relative px-3.5 py-1.5 text-[13px] font-medium capitalize transition-colors",
              tab === key
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab === key && !reduce ? (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-md bg-white/10"
                transition={revealTween}
              />
            ) : tab === key ? (
              <span className="absolute inset-0 rounded-md bg-white/10" />
            ) : null}
            <span className="relative z-1">{key}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export function CatalogFrameRoot({
  tone = "product",
  children,
  className,
}: {
  tone?: CatalogFrameTone
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        tone === "landing"
          ? "overflow-hidden rounded-xl border border-white/10 bg-white/2 text-white"
          : "catalog-frame text-foreground",
        className
      )}
    >
      {children}
    </div>
  )
}

type CatalogPreviewPaneProps = {
  children: React.ReactNode
  fullBleed?: boolean
  unclip?: boolean
  tone?: CatalogFrameTone
  viewportClassName?: string
}

export function CatalogPreviewPane({
  children,
  fullBleed,
  unclip,
  tone = "product",
  viewportClassName,
  viewportRef,
}: CatalogPreviewPaneProps & {
  viewportRef?: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div
      ref={viewportRef}
      className={cn(
        "relative",
        tone === "product" && "bg-background",
        fullBleed && unclip
          ? "overflow-visible"
          : fullBleed
            ? "max-h-[min(720px,70vh)] overflow-auto"
            : cn(
                tone === "landing"
                  ? "overflow-y-auto overscroll-contain"
                  : "flex min-h-50 items-center justify-center overflow-x-auto p-4 sm:min-h-70 sm:p-8 md:p-10",
                viewportClassName
              )
      )}
    >
      <div
        className={cn(
          "w-full min-w-0",
          !fullBleed && tone === "product" && "flex justify-center"
        )}
      >
        {children}
      </div>
    </div>
  )
}

/** Preview / Code — shared catalog frame (landing stage + docs). */
export function CatalogExample({
  preview,
  code,
  className,
  fullBleed,
  unclip,
  installCommand,
  registrySlug,
  blurb,
  layoutId = "docs-example-tab",
}: {
  preview: React.ReactNode
  code: string
  className?: string
  fullBleed?: boolean
  unclip?: boolean
  installCommand?: string
  registrySlug?: string
  blurb?: string
  layoutId?: string
}) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview")

  return (
    <CatalogFrameRoot className={className}>
      {(registrySlug || blurb || installCommand) && tab === "preview" ? (
        <CatalogMetaToolbar
          registrySlug={registrySlug}
          blurb={blurb}
          installCommand={installCommand}
        />
      ) : null}

      <CatalogTabBar tab={tab} onTab={setTab} layoutId={layoutId} />

      {tab === "preview" ? (
        <CatalogPreviewPane fullBleed={fullBleed} unclip={unclip}>
          {preview}
        </CatalogPreviewPane>
      ) : (
        <CodeBlock code={code} embedded className="border-0" />
      )}
    </CatalogFrameRoot>
  )
}
