/**
 * Bundled media shipped with the `atroui` package.
 * Components import these so consumer apps do not need matching `/public` files.
 *
 * PNG examples/portrait: static imports (Next/Turbopack emit URLs).
 * SVG badges/marks: data URLs (no SVG loader required in the host app).
 * Raw files also ship under `atroui/assets/*` for optional copy into `/public`.
 */
import type { StaticImageData } from "next/image"

import founderPortrait from "../../assets/images/founder-portrait.png"
import blogPostCover from "../../assets/examples/blog-post-cover.png"
import productLaunch from "../../assets/examples/product-launch.png"
import newsletterIssue from "../../assets/examples/newsletter-issue.png"
import podcastEpisode from "../../assets/examples/podcast-episode.png"
import changelogRelease from "../../assets/examples/changelog-release.png"
import indieRevenueUpdate from "../../assets/examples/indie-revenue-update.png"
import openSourceBanner from "../../assets/examples/open-source-banner.png"
import webinarEventPromo from "../../assets/examples/webinar-event-promo.png"

export type MediaSrc = string | StaticImageData

/** Resolve a bundled asset or URL string for <img> / next/image. */
export function mediaSrc(asset: MediaSrc): string {
  return typeof asset === "string" ? asset : asset.src
}

const ATROUI_BADGE_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="40" viewBox="0 0 160 40" role="img" aria-label="Made with AtroUI"><title>Made with AtroUI</title><rect width="160" height="40" fill="#0a0a0a"/><rect x="0.5" y="0.5" width="159" height="39" fill="none" stroke="#525252" stroke-opacity="0.55"/><g transform="translate(10, 7)"><path d="M4 22 L12 3 L20 22" stroke="#fafafa" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/><rect x="7.2" y="13" width="9.6" height="2.5" rx="1.25" fill="#0b7bff"/></g><text x="38" y="16" fill="#a3a3a3" font-family="ui-sans-serif, system-ui, sans-serif" font-size="8" font-weight="600" letter-spacing="0.12em">MADE WITH</text><text x="38" y="30" fill="#fafafa" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="-0.02em">AtroUI</text><rect x="148" y="8" width="4" height="24" fill="#0b7bff"/></svg>'

const MAKERSHOT_BADGE_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="40" viewBox="0 0 160 40" role="img" aria-label="Made with Makershot"><title>Made with Makershot</title><rect width="160" height="40" fill="#1c1917"/><rect x="0.5" y="0.5" width="159" height="39" fill="none" stroke="#a8a29e" stroke-opacity="0.45"/><text x="12" y="16" fill="#a8a29e" font-family="ui-sans-serif, system-ui, sans-serif" font-size="8" font-weight="600" letter-spacing="0.12em">MADE WITH</text><text x="12" y="30" fill="#e7e5e4" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="-0.02em">Makershot</text><rect x="148" y="8" width="4" height="24" fill="#c2410c"/></svg>'

function svgDataUrl(svg: string): string {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export const MEDIA = {
  founderPortrait,
  badge: {
    atroui: svgDataUrl(ATROUI_BADGE_SVG),
    makershot: svgDataUrl(MAKERSHOT_BADGE_SVG),
  },
  brand: {
    /** Prefer `LogoMark` in React; these URLs are for <img> / favicon copy. */
    mark: "/brand/atroui-mark.svg",
    markApp: "/brand/atroui-mark-app.svg",
  },
  examples: {
    "blog-post-cover": blogPostCover,
    "product-launch": productLaunch,
    "newsletter-issue": newsletterIssue,
    "podcast-episode": podcastEpisode,
    "changelog-release": changelogRelease,
    "indie-revenue-update": indieRevenueUpdate,
    "open-source-banner": openSourceBanner,
    "webinar-event-promo": webinarEventPromo,
  },
} as const

export type OgExampleSlug = keyof typeof MEDIA.examples
