import { cn } from "@/lib/utils"

type DocsPageHeaderProps = {
  /** Quiet meta line — section or kind (Getting started, Primitive, …) */
  eyebrow: string
  title: string
  description?: React.ReactNode
  /** Optional trailing meta chips (CLI, Host API, …) */
  meta?: React.ReactNode
  className?: string
}

/**
 * Docs pages carry the same curatorial voice as the gallery: mono eyebrow,
 * serif title, one hairline closing the header.
 */
export function DocsPageHeader({
  eyebrow,
  title,
  description,
  meta,
  className,
}: DocsPageHeaderProps) {
  return (
    <header
      className={cn("border-b border-[var(--line)] pb-5 sm:pb-6", className)}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <p className="spec-label m-0">{eyebrow}</p>
        {meta}
      </div>
      <h1 className="spec-title mt-3 text-foreground">{title}</h1>
      {description ? (
        <div className="spec-lede mt-4 max-w-2xl">{description}</div>
      ) : null}
    </header>
  )
}
