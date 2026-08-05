# atroui

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
