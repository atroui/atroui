import Link from "next/link"
import { cn } from "@/lib/utils"

/** Inner article rhythm when already inside DocsPageShell (shell owns max-width). */
export const productArticleBody = "product-article w-full space-y-8"

export const productArticleWideBody =
  "product-article-wide w-full space-y-8 sm:space-y-10"

/** Standard docs column (~65ch prose width in shadcn terms). */
export const productArticle =
  "product-article mx-auto w-full max-w-3xl space-y-8"

export const productArticleWide =
  "product-article-wide mx-auto w-full max-w-6xl space-y-8 sm:space-y-10"

export const productProse = "product-prose mx-auto w-full max-w-prose space-y-8"

/** Anchor + scroll offset for in-page TOC (matches --header-height). */
export const docSectionHeading =
  "ds-headline scroll-mt-[calc(var(--header-height,3.5rem)+0.75rem)] text-base text-foreground"

type ProductPageHeaderProps = {
  stamp: string
  title: React.ReactNode
  lede?: React.ReactNode
  hint?: string
  badges?: React.ReactNode
  className?: string
}

/**
 * shadcn doc title rhythm — calm headline, not marketing display scale.
 * Landing sections keep ds-display; product pages use ds-headline.
 */
export function ProductPageHeader({
  stamp,
  title,
  lede,
  hint,
  badges,
  className,
}: ProductPageHeaderProps) {
  return (
    <header className={cn("space-y-2", className)}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="ms-stamp">{stamp}</p>
        {badges}
      </div>
      <h1 className="ds-headline text-2xl tracking-tight text-foreground sm:text-3xl">
        {title}
      </h1>
      {lede ? (
        <div className="docs-prose ds-lede max-w-2xl text-[15px] leading-relaxed sm:text-base">
          {lede}
        </div>
      ) : null}
      {hint ? (
        <p className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase">
          {hint}
        </p>
      ) : null}
    </header>
  )
}

export function ProductPanel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "product-panel divide-y divide-border-subtle",
        className
      )}
    >
      {children}
    </div>
  )
}

export function ProductPanelLink({
  href,
  title,
  description,
  trailing,
}: {
  href: string
  title: string
  description?: string
  trailing?: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-3 px-4 py-3.5 transition-colors hover:bg-white/5"
    >
      <span className="min-w-0">
        <span className="font-medium text-foreground transition-colors group-hover:text-brand">
          {title}
        </span>
        {description ? (
          <span className="ds-meta mt-0.5 block">{description}</span>
        ) : null}
      </span>
      <span className="flex shrink-0 items-center gap-3">
        {trailing}
        <span className="text-muted-foreground" aria-hidden>
          →
        </span>
      </span>
    </Link>
  )
}
