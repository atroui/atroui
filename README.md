# AtroUI

**Production React / Next.js component library** and dark-first design system.

Published as [`atroui`](https://www.npmjs.com/package/atroui) · Docs: [atroui.com](https://www.atroui.com)

Black canvas · electric blue (`#0b7bff` / `#92dbe0`) · glass surfaces · pill CTAs. Primitives, page sections, and host-bound tools extracted from real products.

[![npm](https://img.shields.io/npm/v/atroui)](https://www.npmjs.com/package/atroui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![CI](https://github.com/atroui/atroui/actions/workflows/ci.yml/badge.svg)](https://github.com/atroui/atroui/actions/workflows/ci.yml)

## Features

- **Dark-first design tokens** in `atroui/globals.css`
- **Primitives** - Button, Card, forms, theme toggle
- **Sections** - landing bands, chrome, CTAs
- **Tools** - OG workspace, thumbnail, scope (host APIs)
- **Headless** - analytics, JSON-LD, reviews helpers
- **ThemeProvider** via `next-themes`

## Install

```bash
npm install atroui
```

```tsx
import { Button, ThemeProvider } from "atroui"
import "atroui/globals.css"

export function Example({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Button>Get started</Button>
      {children}
    </ThemeProvider>
  )
}
```

Load **Outfit** in the host layout and expose `--font-outfit`. Full guide: [Installation](https://www.atroui.com/docs/installation).

## Monorepo structure

```
/
├── apps/
│   └── docs/                 # Landing + docs (@atroui/docs)
├── packages/
│   ├── ui/                   # Publishable `atroui` package
│   └── typescript-config/
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Development

Requires [pnpm](https://pnpm.io) and Node 22+.

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
| [Components](https://www.atroui.com/docs/components) | Catalog |
| [Brand kit](https://www.atroui.com/docs/brand) | Logo & voice |
| [Blog](https://www.atroui.com/blog) | Articles |
| [Changelog](https://www.atroui.com/docs/changelog) | Release notes |

Some catalog modules call host `/api/*` routes (OG, thumbnail, scope, contact). They need your own keys in production (**Host API** in the sidebar).

## Brand chrome vs demo content

Chrome (logo, headers, SEO, mail) resolves through `getBrand()` - **AtroUI** by default. Override with `NEXT_PUBLIC_SITE_*`. Sample studio data under `atroui/content/*` is optional portfolio copy; replace when shipping your own product.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup, PR flow, changesets, and commit conventions.

## Security

See [SECURITY.md](./SECURITY.md) to report vulnerabilities.

## License

[MIT](./LICENSE) © AtroUI contributors
