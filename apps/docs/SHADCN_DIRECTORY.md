# `@atroui` in the shadcn registry directory

Official docs: https://ui.shadcn.com/docs/registry/registry-index  
Directory UI: https://ui.shadcn.com/docs/directory?q=atroui  
Index JSON: https://ui.shadcn.com/r/registries.json

## Status

**Merged** — [shadcn-ui/ui#11420](https://github.com/shadcn-ui/ui/pull/11420) (`feat(registry): add @atroui`), Aug 10, 2026.

Consumers can install without a manual registry URL:

```bash
npx shadcn@latest init
npx shadcn@latest add @atroui/home-hero
```

## Entry (reference)

See [`shadcn-directory-entry.json`](./shadcn-directory-entry.json). Live copy lives in `apps/v4/registry/directory.json` on [shadcn-ui/ui](https://github.com/shadcn-ui/ui).

## Historical submit steps

1. Confirm production catalog is live:
   - https://www.atroui.com/r/registry.json
   - https://www.atroui.com/r/button.json
2. Fork https://github.com/shadcn-ui/ui
3. Append the entry to `apps/v4/registry/directory.json`
4. Run `pnpm validate:registries`
5. Open a PR titled `feat(registry): add @atroui`
