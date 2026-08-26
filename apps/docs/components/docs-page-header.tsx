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
 * Shared docs page header. Professionalism = Outfit hierarchy, quiet eyebrow.
 * Sketch/stamp voice stays on landing — not every docs H1.
 * Family Values: one idea first (title), depth later on the page.
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
      className={cn(
        "space-y-3 border-b border-border-subtle pb-8 sm:space-y-4 sm:pb-10",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <p className="ds-eyebrow m-0">{eyebrow}</p>
        {meta}
      </div>
      <h1 className="ds-headline text-[1.75rem] leading-tight tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <div className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          {description}
        </div>
      ) : null}
    </header>
  )
}
