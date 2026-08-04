# Contributing to AtroUI

Thanks for helping improve the catalog. This repo is a pnpm + Turborepo monorepo; the publishable package is **`atroui`** (`packages/ui`).

## Setup

```bash
pnpm install
pnpm dev          # docs at http://localhost:3000
pnpm test
pnpm typecheck
```

## Pull requests

1. Branch from `master`, make your change.
2. If you touch **`packages/ui`** (components, lib, tokens, package exports), add a **changeset**:

   ```bash
   pnpm changeset
   ```

   - Select package: `atroui`
   - Bump type: **patch** (fixes), **minor** (new features), **major** (breaking)
   - Write a short, user-facing summary — it lands in `packages/ui/CHANGELOG.md`
   - Commit the new `.changeset/*.md` file with your PR

3. Docs-only / CI-only / accidental `packages/ui` path noise: add the GitHub label **`skip-changeset`** so the changeset check can pass.

4. Open a PR against `master`. CI runs typecheck, tests, and build.

## Release pipeline (maintainers)

Automated with [Changesets](https://github.com/changesets/changesets):

```text
Contributor PR (+ changeset)
        ↓ merge to master
Release Action opens/updates “Version Packages” PR
  (bumps version + CHANGELOG)
        ↓ merge Version PR
changeset publish → npm (atroui@x.y.z)
```

### One-time secrets setup

**npm publish — pick one:**

1. **NPM token:** Automation token on npmjs.com → repo **Settings → Secrets → Actions** → `NPM_TOKEN`.
2. **Trusted Publishing (OIDC):** on the `atroui` package on npmjs.com, trust workflow `release.yml`.

**Version Packages PRs:** many orgs block both `GITHUB_TOKEN` and PATs from creating PRs.

What still works automatically: the Release workflow pushes branch `changeset-release/master` with the version bump + CHANGELOG.

**Your step after each release run that has pending changesets:**

1. Open:  
   `https://github.com/atroui/atroui/compare/master...changeset-release/master?expand=1`
2. Create the PR → merge it.
3. That merge triggers publish (`changeset publish` + `NPM_TOKEN`).

Optional: if your org allows it later, enable “Allow GitHub Actions to create and approve pull requests”, or add a working `GH_PAT` with Pull requests write + SSO authorize — then PRs can open automatically again.

## Package layout

| Path | Publish? |
|------|----------|
| `packages/ui` (`atroui`) | Yes |
| `apps/docs` | No (docs site) |
| `packages/typescript-config` | No |

Changelog UI: [/docs/changelog](https://atroui.com/docs/changelog) reads `packages/ui/CHANGELOG.md`.
