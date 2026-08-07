# atroui

**[AtroUI](https://www.atroui.com)** - production React / Next.js component catalog. Add components with the shadcn CLI:

```bash
npx shadcn@latest init
npx shadcn@latest registry add @atroui=https://www.atroui.com/r/{name}.json
npx shadcn@latest add @atroui/home-hero
```

Docs: [Installation](https://www.atroui.com/docs/installation) · [Registry](https://www.atroui.com/docs/registry) · [Host APIs](https://www.atroui.com/docs/host-api)

## Install modes

Never lead with `npm i atroui` for pure UI. Use the CLI first; add the package only when `/api` handlers appear.

| Mode | What you get | Install |
|------|--------------|---------|
| **Registry UI only** | Heroes, chrome, form UI — owned source files | `npx shadcn add @atroui/…`. No `atroui` package. |
| **Forms** | Contact / waitlist / newsletter UI + hardened routes | `npm i atroui`, `transpilePackages: ["atroui"]`, then `@atroui/contact-form` + `@atroui/api-contact` (same for waitlist / newsletter). |
| **AI tools** | OG, thumbnail, scope chat + matching APIs | Same package setup + `@atroui/og-workspace` / `thumbnail-workspace` / `scope-chat` + `@atroui/api-*`. |

## When you still need the npm package

UI blocks copy into your repo via the CLI. Host API route handlers (`atroui/api/contact`, `generate`, `thumbnail`, `scope`, …) stay in the published `atroui` package so you can reuse validation, rate limits, and compose logic without vendoring native image deps.

```bash
npm i atroui
# next.config: transpilePackages: ["atroui"]
npx shadcn@latest add @atroui/api-contact
```

Optional shared rate limits across instances: set `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` (or Vercel `KV_REST_API_*`). See [Host APIs](https://www.atroui.com/docs/host-api).

## Docs

- Site: [www.atroui.com](https://www.atroui.com)
- Installation: [docs/installation](https://www.atroui.com/docs/installation)
- Host APIs: [docs/host-api](https://www.atroui.com/docs/host-api)
- Registry: [docs/registry](https://www.atroui.com/docs/registry)
- Components: [docs/components](https://www.atroui.com/docs/components)
- Migration: [npm → shadcn registry](https://www.atroui.com/blog/npm-to-shadcn-registry)

## License

MIT
