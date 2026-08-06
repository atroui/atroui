# Submit `@atroui` to the shadcn registry directory

Official docs: https://ui.shadcn.com/docs/registry/registry-index

## Entry

See [`shadcn-directory-entry.json`](./shadcn-directory-entry.json).

## Steps

1. Confirm production catalog is live:
   - https://www.atroui.com/r/registry.json
   - https://www.atroui.com/r/button.json
2. Fork https://github.com/shadcn-ui/ui
3. Append the entry to `apps/v4/registry/directory.json` (do not reorder existing items)
4. Run `pnpm validate:registries` in that repo
5. Open a PR titled `feat(registry): add @atroui`

## PR body

```markdown
## Summary

Adds `@atroui` to the community registry directory.

- **Registry URL**: https://www.atroui.com/r/{name}.json
- **Homepage**: https://www.atroui.com
- **Description**: Dark-first React / Next.js components and marketing blocks. Install with the shadcn CLI and own the source.

## Test plan

- [ ] `curl https://www.atroui.com/r/registry.json` returns valid JSON
- [ ] `npx shadcn@latest add @atroui/button` installs successfully
- [ ] `npx shadcn@latest add @atroui/home-hero` installs successfully
```
