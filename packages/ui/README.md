# atroui

**[AtroUI](https://www.atroui.com)** - production React / Next.js component catalog. Add components with the shadcn CLI:

```bash
npx shadcn@latest init
npx shadcn@latest registry add @atroui=https://www.atroui.com/r/{name}.json
npx shadcn@latest add @atroui/home-hero
```

Docs: [Installation](https://www.atroui.com/docs/installation) · [Registry](https://www.atroui.com/docs/registry)

## When you still need the npm package

UI blocks copy into your repo via the CLI. Host API route handlers (`atroui/api/contact`, `generate`, `thumbnail`, `scope`, …) stay in the published `atroui` package so you can reuse validation, rate limits, and compose logic without vendoring native image deps.

```bash
npm i atroui
# next.config: transpilePackages: ["atroui"]
npx shadcn@latest add @atroui/api-contact
```

## Docs

- Site: [www.atroui.com](https://www.atroui.com)
- Installation: [docs/installation](https://www.atroui.com/docs/installation)
- Registry: [docs/registry](https://www.atroui.com/docs/registry)
- Components: [docs/components](https://www.atroui.com/docs/components)
- Migration: [npm → shadcn registry](https://www.atroui.com/blog/npm-to-shadcn-registry)

## License

MIT
