import { featuredCatalog } from "@/lib/catalog"
import { Plate } from "@/components/catalog/plate"

/**
 * Equal preview cards for the landing wall — the same unit as /library.
 */
export function Featured({ className }: { className?: string }) {
  return (
    <ul className={className ?? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"}>
      {featuredCatalog.map((entry, index) => (
        <li key={entry.href} className="min-w-0">
          <Plate entry={entry} priority={index < 6} />
        </li>
      ))}
    </ul>
  )
}
