/**
 * Brand chrome for copied AtroUI components.
 * Defaults match the docs catalog. Edit DEFAULT_BRAND or set NEXT_PUBLIC_SITE_*.
 */

export type Brand = {
  name: string
  domain: string
  email: string
  siteUrl: string
  tagline: string
}

export const DEFAULT_BRAND: Brand = {
  name: "AtroUI",
  domain: "atroui.com",
  email: "hello@iamk.xyz",
  siteUrl: "https://www.atroui.com",
  tagline: "Dark-first React and Next.js component library for production UI",
}

function readEnv(key: string): string | undefined {
  if (typeof process === "undefined" || !process.env) return undefined
  const value = process.env[key]?.trim()
  return value || undefined
}

export function getBrand(): Brand {
  return {
    name: readEnv("NEXT_PUBLIC_SITE_NAME") ?? DEFAULT_BRAND.name,
    domain: readEnv("NEXT_PUBLIC_SITE_DOMAIN") ?? DEFAULT_BRAND.domain,
    email: readEnv("NEXT_PUBLIC_SITE_EMAIL") ?? DEFAULT_BRAND.email,
    siteUrl: (
      readEnv("NEXT_PUBLIC_SITE_URL") ?? DEFAULT_BRAND.siteUrl
    ).replace(/\/$/, ""),
    tagline: readEnv("NEXT_PUBLIC_SITE_TAGLINE") ?? DEFAULT_BRAND.tagline,
  }
}

export function getBrandMailto(subject?: string): string {
  const { email } = getBrand()
  if (!subject) return `mailto:${email}`
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`
}
