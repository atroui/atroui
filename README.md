# AtroUI

**Production React / Next.js component catalog** and dark-first design system.

Docs: [atroui.com](https://www.atroui.com) · Registry: [atroui.com/docs/registry](https://www.atroui.com/docs/registry)

Black canvas · electric blue (`#0b7bff` / `#92dbe0`) · glass surfaces · pill CTAs. Primitives, page sections, and host-bound tools extracted from real products - delivered via the **shadcn CLI**.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![CI](https://github.com/atroui/atroui/actions/workflows/ci.yml/badge.svg)](https://github.com/atroui/atroui/actions/workflows/ci.yml)

## Features

- **Registry (own the files)** - `npx shadcn add @atroui/home-hero` copies source into your repo
- **Dark-first sections** - heroes, chrome, CTAs with editable `CONTENT`
- **Primitives** - Button, logo, theme toggle
- **Tools** - OG workspace, thumbnail, scope (host APIs)
- **Headless** - analytics, JSON-LD, reviews helpers

## Install

```bash
npx shadcn@latest init
npx shadcn@latest registry add @atroui=https://www.atroui.com/r/{name}.json
npx shadcn@latest add @atroui/home-hero
```

Full guide: [atroui.com/docs/installation](https://www.atroui.com/docs/installation) · Catalog: [atroui.com/docs/registry](https://www.atroui.com/docs/registry) · Host APIs: [atroui.com/docs/host-api](https://www.atroui.com/docs/host-api)

Open the installed file and edit `CONTENT` / `DEFAULT_BRAND` at the top - that is the point.

### Install modes

Never lead with `npm i atroui` for pure UI. Use the CLI first; add the package only when `/api` handlers appear.

| Mode | What you get | Install |
|------|--------------|---------|
| **Registry UI only** | Heroes, chrome, form UI — owned source files | `npx shadcn add @atroui/…`. No `atroui` package. |
| **Forms** | Contact / waitlist / newsletter UI + hardened routes | `npm i atroui`, `transpilePackages: ["atroui"]`, then `@atroui/contact-form` + `@atroui/api-contact` (same for waitlist / newsletter). |
| **AI tools** | OG, thumbnail, scope chat + matching APIs | Same package setup + `@atroui/og-workspace` / `thumbnail-workspace` / `scope-chat` + `@atroui/api-*`. |

## Monorepo structure

```
/
├── apps/
│   └── docs/                 # Landing + docs + registry (@atroui/docs)
├── packages/
│   ├── ui/                   # Publishable `atroui` (Host APIs + docs host)
│   └── typescript-config/
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Development

Requires [pnpm](https://pnpm.io) and Node 20+ (engines: `>=20`).

```bash
pnpm install
pnpm dev          # Docs → http://localhost:3000
```

| Command | Description |
|---------|-------------|
| `pnpm dev` | Docs site on :3000 |
| `pnpm build` | Build workspace |
| `pnpm typecheck` | Typecheck all packages |
| `pnpm test` | Vitest |
| `pnpm lint` | ESLint |
| `pnpm changeset` | Add a version bump note for `atroui` |

Copy [`.env.example`](.env.example) to `apps/docs/.env.local` when you need email, analytics, or image-gen APIs.

## Docs & catalog

| Link | What |
|------|------|
| [atroui.com](https://www.atroui.com) | Landing |
| [Docs](https://www.atroui.com/docs) | Introduction |
| [Installation](https://www.atroui.com/docs/installation) | CLI + install modes |
| [Host APIs](https://www.atroui.com/docs/host-api) | Forms / AI routes, BYOK |
| [Components](https://www.atroui.com/docs/components) | Catalog |
| [Brand kit](https://www.atroui.com/docs/brand) | Logo & voice |
| [Blog](https://www.atroui.com/blog) | Articles |
| [Changelog](https://www.atroui.com/docs/changelog) | Release notes |

Some catalog modules call host `/api/*` routes (OG, thumbnail, scope, contact). They need your own keys in production — see [Host APIs](https://www.atroui.com/docs/host-api) (**Host API** in the sidebar).

## Brand chrome vs demo content

Chrome (logo, headers, SEO, mail) resolves through `getBrand()` - **AtroUI** by default. Override with `NEXT_PUBLIC_SITE_*`. Sample studio data under `atroui/content/*` is optional portfolio copy; replace when shipping your own product.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup, PR flow, changesets, and commit conventions.

## Security

See [SECURITY.md](./SECURITY.md) to report vulnerabilities.

## License

[MIT](./LICENSE) © AtroUI contributors
