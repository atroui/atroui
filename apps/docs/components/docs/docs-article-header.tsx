import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Shared docs page header — quiet mono stamp + product H1 (Zed-flat, no Caveat).
 */
export function DocsArticleHeader({
  stamp,
  title,
  lede,
  className,
}: {
  stamp: string
  title: ReactNode
  lede?: ReactNode
  className?: string
}) {
  return (
    <header className={cn("border-b border-border-subtle pb-8", className)}>
      <p className="ds-mono-label mb-3">{stamp}</p>
      <h1 className="ds-headline text-3xl tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      {lede ? (
        <div className="ds-lede mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground [&_code]:rounded-md [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[12px] [&_code]:text-foreground [&_strong]:font-medium [&_strong]:text-foreground">
          {lede}
        </div>
      ) : null}
    </header>
  )
}
