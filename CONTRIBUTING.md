# Contributing to AtroUI

Thanks for your interest in contributing. We're happy to have you here.

Please review this guide before your first pull request. Check [open issues](https://github.com/atroui/atroui/issues) and pull requests so you are not duplicating work.

## About this repository

- **Package manager:** [pnpm](https://pnpm.io) + [Turborepo](https://turbo.build)
- **Publishable package:** [`atroui`](https://www.npmjs.com/package/atroui) in `packages/ui`
- **Docs / landing:** `apps/docs` → [atroui.com](https://www.atroui.com)
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

## Folder structure

```
/
├── apps/
│   └── docs/                      # Next.js docs + landing
│       ├── app/
│       ├── components/
│       └── content/
├── packages/
│   ├── ui/                        # `atroui` (published)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── lib/
│   │   │   ├── content/           # Optional demo / portfolio copy
│   │   │   └── globals.css
│   │   └── CHANGELOG.md
│   └── typescript-config/
├── .changeset/
├── .github/workflows/
├── CONTRIBUTING.md
├── LICENSE
├── SECURITY.md
└── README.md
```

| Path | Publish? |
|------|----------|
| `packages/ui` (`atroui`) | Yes |
| `apps/docs` | No (docs site) |
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

Open a [GitHub Discussion](https://github.com/atroui/atroui/discussions) or issue describing the component, intended API, and whether it needs a Host API. Prefer patterns that match the existing dark-first Digital Success tokens.

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

- **Description:** production React / Next.js component library · atroui.com
- **Topics:** `react`, `nextjs`, `design-system`, `tailwind`, `ui`, `components`, `atroui`
- **Website:** `https://www.atroui.com`
- **License:** MIT (see [LICENSE](./LICENSE))
- **Security policy:** [SECURITY.md](./SECURITY.md)

## Code of conduct

Be respectful in issues, PRs, and discussions. Harassment or spam will be closed.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
