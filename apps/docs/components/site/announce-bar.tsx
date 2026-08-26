import Link from "next/link"
import { catalogCount } from "@/lib/catalog"

/**
 * Thin top strip. Facts about AtroUI — not a cloned Pro banner.
 */
export function AnnounceBar() {
  return (
    <p className="ul-announce">
      <Link href="/docs/installation">
        Open source · MIT · {catalogCount} on the shadcn registry
      </Link>
    </p>
  )
}
