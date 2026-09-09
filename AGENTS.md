# AtroUI — agent map

Always-loaded pointers. Read the linked skill/rule when the leading word fires. Do not restate README.

## Product

- **Registry-first** — ship UI via `npx shadcn add @atroui/…`; consumers own the files. **Do not promote npm UI imports** (`import { Button } from "atroui"`). Consumer-facing copy and samples must teach the registry path only.
- **Host API** — npm `atroui` exists for Host APIs (`atroui/api/*`) + docs-host `transpilePackages` only. Docs-host may import from `atroui` privately in app code; that is not the consumer install story.
- **One catalog** — source of truth: `apps/docs/registry.json` → `public/r/`. Never invent a second.

## Family Values

UI / UX / motion philosophy → [`.cursor/rules/family-values.mdc`](.cursor/rules/family-values.mdc)

## Registry

Install items, companions, `registry.json` / `public/r/` → [`.cursor/skills/atroui-registry/SKILL.md`](.cursor/skills/atroui-registry/SKILL.md)

## Host API

Published package surface, docs host, `transpilePackages` → [`.cursor/skills/atroui-host-api/SKILL.md`](.cursor/skills/atroui-host-api/SKILL.md)

## Axis

Orthogonal on `<html>` — do not overload next-themes:

| Axis | Mechanism |
| --- | --- |
| appearance | `.dark` |
| accent | `data-color-theme` |
| surface | `data-surface` |
| radius | `data-radius` |
| type | `data-type-display` / `data-type-body` |

**Soft-rect** — default radius via `--radius`; not capsule CTAs everywhere.

## Facade

Theme TypeScript: prefer deep `atroui/lib/theme` (`packages/ui/src/lib/theme.ts`) over six axis files + fat barrel. Do not re-add `atroui` to Next `optimizePackageImports`.

## Mirror

`packages/ui` owns these sources; sync with `pnpm registry:sync` → `apps/docs/registry/default`. CI: `pnpm registry:sync:check`. Pairs match `scripts/registry-sync.mjs`:

| Package source | Registry mirror |
| --- | --- |
| `lib/utils.ts` | `lib/utils.ts` |
| `lib/color-themes.ts` | `lib/color-themes.ts` |
| `lib/surface-themes.ts` | `lib/surface-themes.ts` |
| `lib/radius-themes.ts` | `lib/radius-themes.ts` |
| `lib/type-themes.ts` | `lib/type-themes.ts` |
| `lib/theme-boot.ts` | `lib/theme-boot.ts` |
| `lib/theme-export.ts` | `lib/theme-export.ts` |
| `lib/theme.ts` (facade) | `lib/theme.ts` |
| `components/ui/color-theme-picker.tsx` | `ui/color-theme-picker.tsx` |

**Registry-owned (not mirrored):** `theme-toggle`, `radius-theme-picker`. New UI primitives live under `apps/docs/registry/default` first — not everything ships through `packages/ui`.

## Companion

Additive SKUs only (`@atroui/theme-tide`, `@atroui/surface-paper`, …). Never mega themes.

## CSS layers

Face stacks → role tokens (`--font-heading`, `--font-body`) → utilities (`font-sans` → `var(--font-body)`).

## Changesets

Version / release → [`.cursor/skills/changesets-release/SKILL.md`](.cursor/skills/changesets-release/SKILL.md)

## Context.dev

Web search / scrape / styleguide → [`.cursor/rules/context-dev.mdc`](.cursor/rules/context-dev.mdc)

## Execution checklist

Daily plan + ship log → [`.cursor/rules/execution-checklist.mdc`](.cursor/rules/execution-checklist.mdc) → gitignored `executioncheklistdate.md`

## Modules

Deep-module vocab → [`.agents/skills/codebase-design/SKILL.md`](.agents/skills/codebase-design/SKILL.md)

## Guardrails

Keep secrets and `smallnotes.md` out of git. Prefer Axis + Companion over daisyUI-style theme soup. Never teach consumers to import UI from the `atroui` npm package.
