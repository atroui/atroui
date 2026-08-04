# Changesets

This folder stores **changeset** files — short notes that drive version bumps and the changelog.

## For contributors

When your PR changes the publishable `atroui` package (`packages/ui`), add a changeset:

```bash
pnpm changeset
```

Pick `atroui`, choose **patch** / **minor** / **major**, and write a short summary (user-facing). Commit the new file under `.changeset/`.

Docs-only or internal tooling PRs can skip a changeset (mark the PR with label `skip-changeset` if CI asks).

## Release flow (maintainers)

1. Merge feature PRs (with changesets) into `master`.
2. GitHub Action opens/updates a **Version Packages** PR — bumps `packages/ui` version + updates `CHANGELOG.md`.
3. Merge that PR → Action runs `changeset publish` and publishes `atroui` to npm.

See [CONTRIBUTING.md](../CONTRIBUTING.md).
