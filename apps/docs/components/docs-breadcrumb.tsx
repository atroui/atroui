import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type DocsCrumb = { label: string; href?: string }

export function DocsBreadcrumb({
  items,
  className,
}: {
  items: DocsCrumb[]
  className?: string
}) {
  if (items.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6", className)}>
      <ol className="flex flex-wrap items-center gap-1 text-[13px] text-muted-foreground">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1">
              {i > 0 ? (
                <ChevronRight
                  className="size-3.5 shrink-0 opacity-50"
                  aria-hidden
                />
              ) : null}
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(last && "text-foreground/80")}
                  aria-current={last ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
