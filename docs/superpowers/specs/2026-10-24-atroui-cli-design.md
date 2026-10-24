# @atroui/cli — first-party registry installer

**Date:** 2026-10-24  
**Bet:** CLI (before MCP)  
**Branch:** `feat/atro-room` (extract from `ni2`; **do not merge master** until ready)  
**Status:** Design approved; package extracted onto `feat/atro-room` (2026-10-24).

## Problem

AtroUI is listed on the shadcn registry — `npx shadcn add @atroui/…` is the prestigious path. Non-shadcn users still need the same convenience: copy registry source into their repo without adopting the shadcn CLI.

## Sequencing (locked)

1. **CLI** (this doc)  
2. **MCP** — must emit both install commands without mismatch  
3. Landing-kit meta / lamp·parallax polish  

## Approach (locked)

Extract **only** `packages/cli` (+ changeset) from `ni2` onto `feat/atro-room`. Do not rebase the whole `ni2` branch (stale docs/hero noise). Same live registry: `https://www.atroui.com/r/{name}.json`.

## Product rules

- Registry JSON remains the single source of truth.  
- Shadcn path stays primary in public copy; CLI is the peer for non-shadcn.  
- Never teach `import { Button } from "atroui"` for UI.  
- CLI writes owned files + installs npm deps declared by registry items.

## v1 surface (from ni2)

```bash
npx @atroui/cli@latest add [names…]   # interactive if no names
npx @atroui/cli@latest list
```

Flags: `-y/--yes`, `-f/--overwrite`, `-p/--path`, `-r/--registry`.

## Non-goals (v1)

- `init` / components.json wizard (park for later)  
- MCP integration (next bet)  
- Replacing or hiding the shadcn install path  
- Mega landing-kit / hero work  

## Success criteria

- [ ] `@atroui/cli` builds on `feat/atro-room`  
- [ ] `list` shows current catalog from live (or local) registry  
- [ ] `add button` / `add home-hero` / `add launch-workflow` write files + deps in a scratch app  
- [ ] Docs Installation mentions both paths (shadcn first, CLI second) without contradiction  
- [ ] Changeset ready; no master merge until user asks  

## Open follow-ups after extract

- Fix any registry schema drift since `ni2`  
- Wire Installation docs dual-path matrix  
- Unpark `pseo.ts` CLI note only when published on a release branch  
