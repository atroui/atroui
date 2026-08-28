"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PRODUCT_OUTER } from "@/lib/product-layout"

/** shadcn-style quiet footer — hidden on docs reading room. */
export function ProductFooter() {
  const pathname = usePathname()
  const onDocs = pathname === "/docs" || pathname.startsWith("/docs/")
  if (onDocs) return null

  return (
    <footer
      className="border-t border-border-subtle"
      style={{ minHeight: "var(--footer-height)" }}
    >
      <div
        className={`${PRODUCT_OUTER} flex flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8`}
      >
        <p>
          Built by{" "}
          <Link href="/" className="bam-link font-medium text-foreground">
            AtroUI
          </Link>
          . MIT — own the UI, borrow the API.
        </p>
        <p className="ds-meta">
          <a
            href="https://github.com/atroui/atroui"
            target="_blank"
            rel="noopener noreferrer"
            className="bam-link"
          >
            GitHub
          </a>
          {" · "}
          <Link href="/docs/registry" className="bam-link">
            Registry
          </Link>
          {" · "}
          <Link href="/docs/host-api" className="bam-link">
            Host APIs
          </Link>
        </p>
      </div>
    </footer>
  )
}
