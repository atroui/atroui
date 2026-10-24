# Contributing to AtroUI

Thanks for your interest in contributing. We're happy to have you here.

Please review this guide before your first pull request. Check [open issues](https://github.com/atroui/atroui/issues) and pull requests so you are not duplicating work.

## About this repository

- **Package manager:** [pnpm](https://pnpm.io) + [Turborepo](https://turbo.build)
- **Consumer UI path:** registry-first — `npx shadcn add @atroui/…`. New primitives go in `apps/docs/registry/default` first. Do **not** teach `import { Button } from "atroui"`.
- **Publishable package:** [`atroui`](https://www.npmjs.com/package/atroui) in `packages/ui` — Host APIs + docs-host transpile only (not the UI catalog install path)
- **Docs / landing:** `apps/docs` → [atroui.com](https://www.atroui.com)
- **Registry Mirror** (not “all UI”): only the pairs in `scripts/registry-sync.mjs` sync from `packages/ui` → `apps/docs/registry/default` via `pnpm registry:sync` (CI: `pnpm registry:sync:check`). Synced today: `utils`, `color`/`surface`/`radius`/`type` themes, `theme-boot`, `theme-export`, `theme` facade, `color-theme-picker`. Registry-owned (not mirrored): `theme-toggle`, `radius-theme-picker`, and the rest of the catalog.
- **Styling:** Tailwind CSS v4, design tokens in `packages/ui/src/globals.css`
- **Animation:** [motion](https://motion.dev) (`motion/react`)
- **Versioning:** [Changesets](https://github.com/changesets/changesets)

## Development

### Fork this repo

Use the **Fork** button on [github.com/atroui/atroui](https://github.com/atroui/atroui).

### Clone your fork

```bash
git clone https://github.com/<your-username>/atroui.git
cd atroui
```

### Create a branch

```bash
git checkout -b my-new-branch
```

Default branch is **`master`**.

### Install and run

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm typecheck
pnpm test
pnpm lint
```

Copy [`.env.example`](.env.example) to `apps/docs/.env.local` if you need Host API env vars locally.

### Package imports (docs host / Host APIs only)

Docs-host app code may import deep paths like `atroui/lib/theme` and Host API routes use `atroui/api/*`. Avoid relying on `optimizePackageImports` for `atroui`. **Do not** document or sample `import { Button } from "atroui"` for consumers — UI ships via the registry.

## Folder structure

```
/
├── apps/
│   └── docs/                      # Next.js docs + landing + registry catalog
│       ├── app/
│       ├── components/
│       ├── registry/              # Consumer-facing UI source (primitives live here)
│       │   └── default/
│       └── content/
├── packages/
│   ├── ui/                        # `atroui` npm — Host APIs + mirrored theme libs
│   │   ├── src/
│   │   │   ├── api/               # Host API handlers
│   │   │   ├── components/        # Mirrored picker(s) only (not the full catalog)
│   │   │   ├── lib/               # Mirrored theme/utils sources
│   │   │   ├── content/           # Optional demo / portfolio copy
│   │   │   └── globals.css
│   │   └── CHANGELOG.md
│   └── typescript-config/
├── .changeset/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── SECURITY.md
└── README.md
```

| Path | Publish? |
|------|----------|
| `packages/ui` (`atroui`) | Yes (Host APIs + mirrored theme libs; not “install UI from npm”) |
| `apps/docs` | No (docs site + registry catalog) |
| `packages/typescript-config` | No |

## Pull requests

1. Branch from `master` and make your change.
2. If you touch **`packages/ui`** (components, lib, tokens, exports), add a **changeset**:

   ```bash
   pnpm changeset
   ```

   - Package: `atroui`
   - Bump: **patch** (fixes), **minor** (features), **major** (breaking)
   - Short user-facing summary → lands in `packages/ui/CHANGELOG.md`
   - Commit the new `.changeset/*.md` with your PR

3. Docs-only / CI-only changes: add the GitHub label **`skip-changeset`** so the changeset check can pass.

4. Open a PR against `master`. CI runs typecheck, lint, test, and build.

## Commit convention

Please follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
category(scope): message
```

Categories:

| Category | Use for |
|----------|---------|
| `feat` | New feature or capability |
| `fix` | Bug fix |
| `refactor` | Code change that is neither fix nor feature |
| `docs` | README, CONTRIBUTING, docs site copy |
| `build` | Build tooling or dependency changes |
| `test` | Tests |
| `ci` | GitHub Actions / CI config |
| `chore` | Misc repo maintenance |

Examples:

```text
feat(ui): add ThemeToggle size prop
fix(docs): correct installation import path
docs(readme): add security policy link
chore(ci): pin actions to full SHAs
```

## Requests for new components

Open a [GitHub Discussion](https://github.com/atroui/atroui/discussions) or issue describing the component, intended API, and whether it needs a Host API. **Add new UI primitives under `apps/docs/registry/default` first** (then `registry.json` + `pnpm --filter @atroui/docs registry:build`). Only add to `packages/ui` when the file is on the Mirror list or is a Host API. Prefer patterns that match the existing dark-first Digital Success tokens.

## Release pipeline (maintainers)

```text
Contributor PR (+ changeset)
        ↓ merge to master
Release Action opens/updates “Version Packages” PR
  (bumps version + CHANGELOG)
        ↓ merge Version PR
changeset publish → npm (atroui@x.y.z)
```

### Secrets

**npm publish - pick one:**

1. **NPM token:** Automation token → repo **Settings → Secrets → Actions** → `NPM_TOKEN`
2. **Trusted Publishing (OIDC):** trust workflow `release.yml` on the `atroui` npm package

If org rules block automatic Version Packages PRs, open manually from `changeset-release/master` after the Release workflow runs:

`https://github.com/atroui/atroui/compare/master...changeset-release/master?expand=1`

## GitHub repo hygiene (maintainers)

On [github.com/atroui/atroui](https://github.com/atroui/atroui):

- **Description:** registry-first React / Next.js UI · Host APIs · atroui.com
- **Topics:** `react`, `nextjs`, `design-system`, `tailwind`, `ui`, `components`, `atroui`
- **Website:** `https://www.atroui.com`
- **License:** MIT (see [LICENSE](./LICENSE))
- **Security policy:** [SECURITY.md](./SECURITY.md)
- **Code of conduct:** [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- **Issue / PR templates:** `.github/ISSUE_TEMPLATE/`, `.github/PULL_REQUEST_TEMPLATE.md`

## Code of conduct

This project follows the [Contributor Covenant](./CODE_OF_CONDUCT.md). Be
respectful in issues, PRs, and discussions. Report enforcement concerns to
`hello@iamk.xyz` with subject `[CONDUCT] atroui …`.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
