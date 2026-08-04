# Meridian

Personal component catalog packaged as **`@meridian/ui`**. Dark-first design system: black canvas, electric blue brand (`#0b7bff`), glass surfaces, pill CTAs — based on the Digital Success hero.

Docs site: Next.js 15 · Package: `@meridian/ui` · Font: Outfit

## Structure

```
/
├── apps/
│   └── docs/          # Landing + documentation
├── packages/
│   ├── ui/            # @meridian/ui — production components
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

## Using components

```tsx
import { Button, ThemeProvider } from "@meridian/ui"
import "@meridian/ui/globals.css"

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

Demo content may reference the studios/apps where components shipped. Meridian chrome is independent of that content.
