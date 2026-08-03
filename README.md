# Meridian

A polished, accessible React component library built with **Radix UI**, **Tailwind CSS**, and shadcn/ui patterns — plus a Next.js documentation site and Storybook.

## Structure

```
/
├── apps/
│   └── docs/          # Next.js 15 documentation & playground
├── packages/
│   ├── ui/            # @meridian/ui component library + Storybook
│   └── typescript-config/
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Quick start

```bash
pnpm install
pnpm dev          # Docs site → http://localhost:3000
pnpm storybook    # Storybook → http://localhost:6006
```

## Using components

```tsx
import { Button, Card, CardHeader, CardTitle } from "@meridian/ui"
import "@meridian/ui/globals.css"

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello Meridian</CardTitle>
      </CardHeader>
      <Button>Get started</Button>
    </Card>
  )
}
```

Ensure your Tailwind config:

1. Scans `packages/ui/src/**/*.{ts,tsx}`
2. Extends Meridian color / radius tokens (see `apps/docs/tailwind.config.ts`)
3. Uses `darkMode: ["class"]` with `tailwindcss-animate`

## Components

Accordion · Avatar · Badge · Button · Card · Checkbox · Dialog · Dropdown Menu · Input · Label · Popover · Radio Group · Select · Separator · Skeleton · Switch · Tabs · Textarea · Toast · Tooltip

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the docs site |
| `pnpm build` | Build all packages/apps |
| `pnpm storybook` | Start Storybook |
| `pnpm typecheck` | Type-check the monorepo |

## Theming

Colors and radius live as CSS variables in `@meridian/ui/globals.css`. Override `:root` / `.dark` to brand the system. Dark mode is driven by a `.dark` class (compatible with `next-themes`).

## License

MIT
