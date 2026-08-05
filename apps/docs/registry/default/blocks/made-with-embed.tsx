"use client"

import { Check, Copy } from "lucide-react"
import { useCallback, useState } from "react"

import { getBrand } from "@/lib/brand"

/**
 * Edit CONTENT for badge link, image, and copy.
 * Set siteOrigin so the HTML snippet works before hydration.
 */
const CONTENT = {
  stamp: "Credit",
  headline: "Link back if it helped.",
  body: "Drop this badge on your site, README, or Notion footer. Free tools stay free when people share the source.",
  href: "/",
  /** Public URL or path to the badge image */
  badgeSrc: "/badge/atroui.svg",
  /** Used to absolutize relative href/badgeSrc in the snippet */
  siteOrigin: "https://www.atroui.com",
  badgeWidth: 160,
  badgeHeight: 40,
  snippetLabel: "HTML snippet",
  copyLabel: "Copy snippet",
  copiedLabel: "Copied",
}

export type MadeWithEmbedProps = {
  href?: string
  badgeSrc?: string
  brandName?: string
  className?: string
}

function absolutize(pathOrUrl: string, origin: string) {
  if (pathOrUrl.startsWith("http")) return pathOrUrl
  return `${origin.replace(/\/$/, "")}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`
}

export function MadeWithEmbed({
  href = CONTENT.href,
  badgeSrc = CONTENT.badgeSrc,
  brandName,
  className,
}: MadeWithEmbedProps) {
  const [copied, setCopied] = useState(false)
  const name = brandName ?? getBrand().name
  const alt = `Made with ${name}`
  const target = absolutize(href, CONTENT.siteOrigin)
  const snippetBadgeSrc = absolutize(badgeSrc, CONTENT.siteOrigin)
  const snippet = `<a href="${target}" target="_blank" rel="noopener noreferrer"><img src="${snippetBadgeSrc}" alt="${alt}" width="${CONTENT.badgeWidth}" height="${CONTENT.badgeHeight}" /></a>`

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(snippet)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [snippet])

  return (
    <div
      className={`grid gap-6 md:grid-cols-12 md:items-start ${className ?? ""}`}
    >
      <div className="md:col-span-5">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          {CONTENT.stamp}
        </p>
        <h2 className="mt-4 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          {CONTENT.headline}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {CONTENT.body}
        </p>
        <a
          href={href}
          className="mt-6 inline-block ring-1 ring-border-subtle transition-opacity hover:opacity-90"
          aria-label={`${name} badge preview`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={badgeSrc}
            alt={alt}
            width={CONTENT.badgeWidth}
            height={CONTENT.badgeHeight}
          />
        </a>
      </div>
      <div className="md:col-span-7">
        <p className="mb-3 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
          {CONTENT.snippetLabel}
        </p>
        <pre className="overflow-x-auto border border-border-subtle bg-muted/30 p-4 font-mono text-[11px] leading-relaxed break-all whitespace-pre-wrap text-foreground">
          {snippet}
        </pre>
        <button
          type="button"
          onClick={copy}
          className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background"
        >
          {copied ? (
            <>
              <Check className="size-4" aria-hidden />
              {CONTENT.copiedLabel}
            </>
          ) : (
            <>
              <Copy className="size-4" aria-hidden />
              {CONTENT.copyLabel}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
