# @atroui/mcp — dual-path agent registry

**Date:** 2026-10-24  
**Bet:** MCP (after CLI)  
**Branch:** `feat/atro-room` (extract from `new-implementation1`; **do not merge master** until ready)  
**Status:** Implemented on `feat/atro-room` (2026-10-24).

## Problem

Agents need an honest AtroUI catalog without inventing a third install path. CLI now exists on this branch; MCP must emit **both** shadcn and `@atroui/cli` commands without mismatch.

## Sequencing (locked)

1. CLI ✓  
2. **MCP** (this doc)  
3. Landing-kit meta / lamp·parallax  

## Approach (locked)

Extract `packages/mcp` (+ changeset, cursor-plugin) from `new-implementation1`. Sync catalog from live `apps/docs/registry.json`. Update install strings to match Installation dual-path. Do not rebase the whole old branch.

## Product rules

- Registry JSON is the only catalog source (`scripts/sync-catalog.mjs`).  
- Tools return commands; MCP does **not** write component files.  
- Prefer shadcn when the project uses shadcn; `@atroui/cli` when it does not.  
- Never teach `import { Button } from "atroui"` for UI.  

## Tools (v1)

| Tool | Role |
| --- | --- |
| `search_components` | Search name / title / description |
| `get_item` | One item + `installCommands.shadcn` + `installCommands.atroui` |
| `get_skill` | `design` \| `host-api` |

## Install command shape

```text
shadcn:  npx shadcn@latest add @atroui/{name}
atroui:  npx @atroui/cli@latest add {name}
```

## Non-goals

- Writing files into the consumer repo  
- Replacing shadcn MCP  
- Landing-kit / hero work  
- Publishing to npm / Cursor Marketplace in this commit (changeset ready)  

## Success criteria

- [x] Package builds + tests green on `feat/atro-room` (11 tests)  
- [x] Catalog sync count matches `registry.json` (125)  
- [x] `get_item` / search return both install lines  
- [x] `/docs/mcp` guide + nav  
- [x] `llms.txt` / for-agents mention MCP without contradicting CLI  
- [x] No master merge until user asks  
