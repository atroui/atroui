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

## Design system

Tokens live in `packages/ui/src/globals.css`:

- **Canvas** — black (`oklch(0 0 0)`) with cool undertones
- **Brand** — hero blues (`#0b7bff` / `#92dbe0`)
- **CTAs** — rounded-full primary (white on dark) + glass ghost
- **Surfaces** — `ms-panel` / `md-glass` blur panels

## Catalog notes

Some modules call host `/api/*` routes (OG, thumbnail, scope, contact). They render in the docs but need those APIs in a real app — marked **Host API** in the sidebar.

Demo content may reference the studios/apps where components shipped. AtroUI chrome is independent of that content.
