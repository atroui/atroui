/**
 * Brand chrome for copied AtroUI components.
 * Edit DEFAULT_BRAND or set NEXT_PUBLIC_SITE_* in your app.
 */

export type Brand = {
  name: string
  domain: string
  email: string
  siteUrl: string
  tagline: string
}

export const DEFAULT_BRAND: Brand = {
  name: "Acme",
  domain: "acme.test",
  email: "hello@acme.test",
  siteUrl: "https://acme.test",
  tagline: "Your product tagline",
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
