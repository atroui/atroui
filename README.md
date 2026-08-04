# AtroUI

Personal component catalog packaged as **[`atroui`](https://www.npmjs.com/package/atroui)** · site: [atroui.com](https://atroui.com)

Dark-first design system: black canvas, electric blue brand (`#0b7bff`), glass surfaces, pill CTAs.

## Structure

```
/
├── apps/
│   └── docs/          # Landing + documentation (@atroui/docs)
├── packages/
│   ├── ui/            # atroui — publishable component package
│   └── typescript-config/
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Quick start

```bash
pnpm install
pnpm dev          # Docs → http://localhost:3000
```

Copy [`.env.example`](.env.example) to `apps/docs/.env.local` (or your host app) when you need email, analytics, or image-gen APIs.

## Scripts

| Command | What it does |
|---------|----------------|
| `pnpm dev` | Docs site on :3000 |
| `pnpm build` | Build all packages / docs |
| `pnpm typecheck` | `tsc --noEmit` across the workspace |
| `pnpm test` | Vitest (package helpers) |
| `pnpm lint` | Lint task (placeholder until ESLint is wired) |

## Install (when published)

```bash
npm install atroui
```

```tsx
import { Button, ThemeProvider } from "atroui"
import "atroui/globals.css"

export function Example() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Button>Get started</Button>
    </ThemeProvider>
  )
}
```

Load Outfit in the host layout and expose `--font-outfit`.

## Brand chrome vs demo content

Chrome (logo, headers, footers, SEO, mail defaults) uses `getBrand()` from `atroui/lib/brand` — **AtroUI** by default. Override with:

```bash
NEXT_PUBLIC_SITE_NAME=AtroUI
NEXT_PUBLIC_SITE_DOMAIN=atroui.com
NEXT_PUBLIC_SITE_EMAIL=hello@atroui.com
NEXT_PUBLIC_SITE_URL=https://atroui.com
```

Modules under `atroui/content/*` may still show **Makershot** studio copy as portfolio demos. Swap those imports or pass props when shipping your own site.

## Design system

Tokens live in `packages/ui/src/globals.css`:

- **Canvas** — black (`oklch(0 0 0)`) with cool undertones
- **Brand** — hero blues (`#0b7bff` / `#92dbe0`)
- **CTAs** — rounded-full primary (white on dark) + glass ghost
- **Surfaces** — `ms-panel` / `md-glass` blur panels

## Catalog notes

Some modules call host `/api/*` routes (OG, thumbnail, scope, contact). They render in the docs but need those APIs in a real app — marked **Host API** in the sidebar.

## Deploy docs (Vercel)

1. Create a Vercel project linked to this repo.
2. Set **Root Directory** to `apps/docs` (uses [`apps/docs/vercel.json`](apps/docs/vercel.json) for monorepo install/build).
3. Add env vars from [`.env.example`](.env.example) as needed (`NEXT_PUBLIC_SITE_*` for brand, plus any Host API secrets).

CI runs typecheck, lint, test, and build on PRs and `main` via [`.github/workflows/ci.yml`](.github/workflows/ci.yml).
