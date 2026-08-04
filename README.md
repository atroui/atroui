# Meridian

Personal component catalog for components Koustav ships across projects — starting with **Makershot / ogsaas**. Not a generic UI kit.

Docs site: Next.js 15 · Package: `@meridian/ui` · Tokens: Makershot stone OKLCH + copper brand (Outfit + Fraunces)

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
import { Button, HomeWho, ThemeProvider } from "@meridian/ui"
import "@meridian/ui/globals.css"

export function Example() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Button>Hire us</Button>
      <HomeWho />
    </ThemeProvider>
  )
}
```

### Tailwind v4

Import the package CSS (it already includes `@import "tailwindcss"` and `@source` paths for the UI package). Host apps should scan their own app files and load `@meridian/ui/globals.css` once at the root.

Peer deps: **Next.js**, **React**, **next-themes**.

## Catalog

Curated in docs as:

| Group | Examples |
|-------|----------|
| **Primitives** | Button, Card, FormSelect, ThemeToggle, FadeIn… |
| **Sections** | Home bands, SiteHeader, CTAs, Contact, Journal… |
| **Tools** | OG workspace, Thumbnail, Planner, Scope (often need host `/api/*`) |
| **Headless** | Analytics, JSON-LD |

Makershot / iamk links inside demos are intentional portfolio branding.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the docs site |
| `pnpm build` | Build all packages/apps |
| `pnpm typecheck` | Type-check the monorepo |

Storybook scaffolding exists under `packages/ui` but has no stories yet — use the docs site as the playground.

## Theming

Colors and type live as CSS variables in `@meridian/ui/globals.css` (OKLCH). Override `:root` / `.dark`. Dark mode uses a `.dark` class via `next-themes`.

## Source

Components were copied into `packages/ui` from the ogsaas codebase. That source repo is not modified by this library.

## License

MIT
