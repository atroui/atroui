/**
 * Minimal SEO helpers for registry JSON-LD items.
 * Prefer NEXT_PUBLIC_SITE_DOMAIN / getBrand().domain.
 */

import { getBrand } from "@/lib/brand"

export function getSiteDomain(): string {
  return getBrand().domain
}
