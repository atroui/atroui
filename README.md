# AtroUI

Dark-first **landing sections** and Host APIs for indie Next.js — on the **official shadcn registry**. MIT. You own the copied files. Not a 50-primitive peer to shadcn/ui.

```bash
npx shadcn@latest add @atroui/home-hero
```

Public namespace `@atroui` — listed in [shadcn registries.json](https://ui.shadcn.com/r/registries.json). No GitHub token. Not a private GitHub registry. Best with **Tailwind CSS v4**.

Optional **Host APIs** (`npm i atroui` + `transpilePackages`): contact, waitlist, newsletter, OG, thumbnail, scope. **BYOK** (SMTP/Resend, Hugging Face/Gemini/xAI). AtroUI never holds your keys and does not run paid AI on atroui.com. Missing keys → `503` on your app.

Docs: [atroui.com](https://www.atroui.com) · [Installation](https://www.atroui.com/docs/installation) · [Host APIs](https://www.atroui.com/docs/host-api) · [Compare](https://www.atroui.com/docs/compare) · [Collections](https://www.atroui.com/docs/collections) · [Registry](https://www.atroui.com/docs/registry)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![CI](https://github.com/atroui/atroui/actions/workflows/ci.yml/badge.svg)](https://github.com/atroui/atroui/actions/workflows/ci.yml)

## Features

- **Registry (own the files)** - `npx shadcn add @atroui/…` copies source into your repo
- **Dark landing sections** - heroes, chrome, CTAs with editable `CONTENT`
- **Host API forms & tools** - contact, waitlist, OG, thumbnail, scope (BYOK)
- **Headless** - analytics, JSON-LD, reviews helpers
- **A few primitives** - Button, logo, theme toggle (supporting, not the pitch)

## Install

```bash
npx shadcn@latest init
npx shadcn@latest add @atroui/home-hero
```

Open the installed file and edit `CONTENT` / `DEFAULT_BRAND` at the top - that is the point. Tailwind v4 config (`@source`, monorepo scanning) stays in **your** project.

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
See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for community standards.

## Security

See [SECURITY.md](./SECURITY.md) to report vulnerabilities.

## License

[MIT](./LICENSE) © AtroUI contributors
