# atroui

## 0.5.0

### Minor Changes

- [#87](https://github.com/atroui/atroui/pull/87) [`61c97e6`](https://github.com/atroui/atroui/commit/61c97e6dcf7a4751b5cfdd163c86d34ae10044be) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Add Adaptive Theme Switch: a light/dark control that lifts muted type to WCAG AA so designed palettes stay readable.

### Patch Changes

- [#92](https://github.com/atroui/atroui/pull/92) [`c56efec`](https://github.com/atroui/atroui/commit/c56efec0f93cc4b2027975af92a81f7552cf203b) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Declare `tailwindcss` as a dependency (and peer) so `atroui/globals.css` can resolve `@import "tailwindcss"` in Next/webpack and pnpm workspaces.

- [#86](https://github.com/atroui/atroui/pull/86) [`15e2f4c`](https://github.com/atroui/atroui/commit/15e2f4c17390906770dd16eb8750ea092860f550) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Newsletter subscribe uses Resend global Contacts + Segments (RESEND_SEGMENT_ID or RESEND_AUDIENCE_ID). Form sends honeypot + optional source.

- [#95](https://github.com/atroui/atroui/pull/95) [`edec2df`](https://github.com/atroui/atroui/commit/edec2df6591365b4ad6ac913ed929067e3aaa079) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Clarify the npm package description: public `@atroui` install, Tailwind v4, optional Host APIs with BYOK, not hosted AI.

- Fix OG text preview on Vercel: embed Inter fonts in the package, and serve docs `/api/generate` previewOnly via next/og so live downloads no longer HTML-500 from sharp/satori module init.

## 0.4.2

### Patch Changes

- [#78](https://github.com/atroui/atroui/pull/78) [`ba1d94a`](https://github.com/atroui/atroui/commit/ba1d94a54a998da4faef5e2144a0bce08766312f) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Strengthen homepage Organization / SoftwareApplication JSON-LD (disambiguatingDescription, Brand, sameAs to npm + shadcn directory) so search engines treat AtroUI as a software product entity.

- [#81](https://github.com/atroui/atroui/pull/81) [`0109ba2`](https://github.com/atroui/atroui/commit/0109ba2e230b9f450db1622938a9b83624961c2b) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Fix OG Quick-mode text preview downloads: rasterize Satori overlays with sharp instead of resvg so Host API `/api/generate` previewOnly no longer 500s under Next.js.

- [#79](https://github.com/atroui/atroui/pull/79) [`4fb7bb6`](https://github.com/atroui/atroui/commit/4fb7bb61cbd5ca8b594b97e71d21f6e0fc210445) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Add ProjectBrief helpers (`buildOgHref`, scope seed) and light Scope Chat / Project Planner links into the OG workspace for the launch workflow.

## 0.4.1

### Patch Changes

- [#76](https://github.com/atroui/atroui/pull/76) [`98c7757`](https://github.com/atroui/atroui/commit/98c7757215dc7965c89b52effef3af82d734ec6b) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - HomeHero OG style chips: Tech first (and default), then Paper, Dark, Editorial.

- [#73](https://github.com/atroui/atroui/pull/73) [`dbe4ce7`](https://github.com/atroui/atroui/commit/dbe4ce77b9075ce52654b48595eb205e1f144609) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Updated the Satori OG Image composer to dynamically render the current project domain (`getBrand().domain`) as a watermark instead of using a hardcoded `"atroui.com"` label.

- [#70](https://github.com/atroui/atroui/pull/70) [`205c24f`](https://github.com/atroui/atroui/commit/205c24fbec9355f482ac3020592f66e367c5f0fb) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - ThemeToggle chrome uses soft-rect radius (`rounded-lg`) instead of full pills, matching docs header consistency.

## 0.4.0

### Minor Changes

- [#56](https://github.com/atroui/atroui/pull/56) [`c4a2445`](https://github.com/atroui/atroui/commit/c4a24458ea1e24484b91b4cfd6e61245da1b90bc) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Ship Home Crafts, Feature Grid, and Logo Cloud; add a distinct SiteFooter (no longer an alias of BoldFooter); export the personal site kit (command menu, changelog, narrow chrome, countdown, and related blocks) with cmdk support.

### Patch Changes

- [#51](https://github.com/atroui/atroui/pull/51) [`536045a`](https://github.com/atroui/atroui/commit/536045ac60546023e98b4f05f45d412002301a08) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Bump nodemailer, AI SDK, and related transitive pins (postcss, sharp, undici) to clear Dependabot advisories.

- [#57](https://github.com/atroui/atroui/pull/57) [`f5980ea`](https://github.com/atroui/atroui/commit/f5980eaa88bb1bd42a40f1150e79fe60f4594868) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Personal Hero optional portrait slot; Reading Shelf typographic covers (no next/image remote host requirement).

- [#58](https://github.com/atroui/atroui/pull/58) [`bfb2593`](https://github.com/atroui/atroui/commit/bfb2593349495f9eaf64f50f373e89b00d4af45d) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Personal Hero: use Tailwind size tokens (`size-18`, `max-w-160`) for layout consistency.

- [#63](https://github.com/atroui/atroui/pull/63) [`82dc2c6`](https://github.com/atroui/atroui/commit/82dc2c652091ab98d6e480c1006191456f48d387) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Soft-rect defaults: CTAs and stamps use `--radius` instead of capsules; chip badges align to `rounded-md`. Document `--radius` for sharp vs soft on theming.

- [#52](https://github.com/atroui/atroui/pull/52) [`6991064`](https://github.com/atroui/atroui/commit/6991064cd113ebc29e65dc8683a82ef84f674f20) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Optional Upstash / Vercel KV backend for Host API rate limits (same checkRateLimit API; memory remains default).

## 0.3.0

### Minor Changes

- [#42](https://github.com/atroui/atroui/pull/42) [`70452b0`](https://github.com/atroui/atroui/commit/70452b010fbaf29265dbccc072b7061b6aba7c26) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Ship out-of-the-box Host API handlers for forms and AI tools (`atroui/api/contact|waitlist|newsletter|generate|thumbnail|scope`). Consumers supply their own keys; AtroUI never ships secrets. Includes validation, body caps, and in-memory rate limiting.

### Patch Changes

- [#39](https://github.com/atroui/atroui/pull/39) [`10d0bd3`](https://github.com/atroui/atroui/commit/10d0bd35f86bc5a7914106a932c377ddab5448fa) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Allow ArticleJsonLd and BlogJsonLd to target /blog; drop npm-install phrasing from default SEO description.

## 0.2.3

### Patch Changes

- [#29](https://github.com/atroui/atroui/pull/29) [`f25c71d`](https://github.com/atroui/atroui/commit/f25c71db3b334b52299da234ab0646f8b3ef5605) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Prefer canonical brand site URL over Vercel deployment hosts in production JSON-LD, and point Organization logo at /favicon-192.png.

## 0.2.2

### Patch Changes

- [#24](https://github.com/atroui/atroui/pull/24) [`337fde5`](https://github.com/atroui/atroui/commit/337fde5622f470f7b5b08237e8dad3a81a3fa1a6) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Ship component media inside the package (founder portrait, OG example PNGs, badge SVGs) and wire FounderAvatar / OgExamples / MadeWithEmbed to bundled assets so consumer apps do not need matching /public files.

- [#22](https://github.com/atroui/atroui/pull/22) [`9bb3bda`](https://github.com/atroui/atroui/commit/9bb3bda22bc7ee53755ba07ce238d5fbfdd0ca80) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Document consumer install steps: next-themes, transpilePackages, ThemeProvider, Outfit, and globals.css.

- [#26](https://github.com/atroui/atroui/pull/26) [`fa8deb4`](https://github.com/atroui/atroui/commit/fa8deb452728e9da9b9d3f7c557288f8967b7600) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Normalize punctuation in package README, demo content, and UI copy (replace em/en dashes with plain punctuation).

## 0.2.1

### Patch Changes

- [#18](https://github.com/atroui/atroui/pull/18) [`7e97b46`](https://github.com/atroui/atroui/commit/7e97b466982b4308c981aaa8022a10808f3ce490) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Default brand contact email is now hello@iamk.xyz until an atroui.com mailbox is ready.

- [#20](https://github.com/atroui/atroui/pull/20) [`72a3d33`](https://github.com/atroui/atroui/commit/72a3d335c14f4858d97139e6ff16d17854da5c8f) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Fix fresh Next.js installs: keep MDX article loaders off the main import graph, declare CSS deps (tw-animate-css, shadcn), and document transpilePackages + next-themes.

- [#10](https://github.com/atroui/atroui/pull/10) [`53d633d`](https://github.com/atroui/atroui/commit/53d633d8a5b8bc59e4c7cac740f2a5f485c9fd75) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - New interrupted-A logo mark, richer SiteGraph / SoftwareApplication JSON-LD (no personal founder byline), and SEO-oriented brand tagline defaults for atroui.com.

- [#11](https://github.com/atroui/atroui/pull/11) [`00e875f`](https://github.com/atroui/atroui/commit/00e875f27642bd676b93a01ab58eec2861a30719) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Launch positioning copy on the npm package and README; SEO JSON-LD / brand surfaces already track AtroUI at atroui.com.

- [#17](https://github.com/atroui/atroui/pull/17) [`e5d2c38`](https://github.com/atroui/atroui/commit/e5d2c38a90d64edeb6418445c0d87c44d6dc7e51) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Link the package README License section to the repo MIT LICENSE file.

- [#12](https://github.com/atroui/atroui/pull/12) [`ec8511c`](https://github.com/atroui/atroui/commit/ec8511c853f2bad2be2ffe9fef77353147f5bc73) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Default brand siteUrl is now https://www.atroui.com to match production canonical host.

## 0.2.0

### Minor Changes

- [#2](https://github.com/atroui/atroui/pull/2) [`3ed5bbd`](https://github.com/atroui/atroui/commit/3ed5bbdb1c0002b25d4b2d317749adfabe856807) Thanks [@KOUSTAV2409](https://github.com/KOUSTAV2409)! - Foundations: brand isolation via `getBrand()` / `NEXT_PUBLIC_SITE_*`, packaging cleanup, Vitest, CI, and Changesets release pipeline. SEO brand constants are call-time only (no module-load freeze).

## 0.1.0

### Major Changes

- Initial public component catalog: dark-first design system, primitives, sections, tools, and headless SEO helpers. Brand chrome defaults to AtroUI via `getBrand()` / `NEXT_PUBLIC_SITE_*`.
