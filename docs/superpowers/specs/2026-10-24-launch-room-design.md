# Launch Room — Scope → Planner → Social

**Date:** 2026-10-24  
**Bet:** A (workflow glue) — first of A→D  
**Status:** Implemented on `feat/atro-room` (2026-10-24).  
**Family Values:** Gradual revelation (one step), fluidity (step pill + brief travel), careful delight (handoff CTA only).

## Problem

Scope Chat, Project Planner, and OG Workspace already share `ProjectBrief` and a guide at `/docs/guides/launch-workflow`. They still feel like three rooms. The pause moment is a **single live path** plus one install command.

## Approach

**Live Launch Room** — docs host `/launch` + registry meta `@atroui/launch-workflow` that drops a thin shell + `app/launch/page.tsx`. Reuse existing blocks and brief helpers. No new schema, no AtroUI-hosted AI.

## Architecture

```text
/launch  (docs host demo)
┌─────────────────────────────────────────────┐
│  Step rail: Scope · Planner · Social        │
│  Shared ProjectBrief (state + localStorage) │
├─────────────────────────────────────────────┤
│  Step 1: ScopeChat  → “Continue to planner” │
│  Step 2: Planner    → “Continue to social”  │
│  Step 3: OG preview → Open full OG / install│
└─────────────────────────────────────────────┘

@atroui/launch-workflow
  registryDependencies:
    project-brief, scope-chat, project-planner,
    og-workspace, api-scope, api-generate
  files:
    components/blocks/launch-room.tsx  (shell)
    app/launch/page.tsx                (thin page)
```

### Data flow

- Canonical type: existing `ProjectBrief` in `@atroui/project-brief`.
- Persist with `PROJECT_BRIEF_STORAGE_KEY` across steps.
- Scope → brief via `briefFromScopeMessage(lastUserMessage)`.
- Planner → brief via the same field mapping already used for `buildOgHref` on the estimate step.
- Social step prefills Quick mode from `briefOgTitle` / `briefOgSubtitle` (embed or host demo shell). Full `/og` remains available.

### Non-goals (A)

- Thumbnail as a fourth step
- MCP / CLI
- Landing redesign
- New primitives
- Rewriting Scope/Planner internals beyond optional handoff hooks if required

## UI / motion

| Layer | Behavior |
| --- | --- |
| Film mast | “Launch room” + title; mono reading of brief name / one-liner when set |
| Step rail | Scope · Planner · Social — `layoutId` pill (`switchLayoutTween`); completed steps marked |
| Stage | One block at a time; peer switch = `layoutTween` fade/slide; reduced-motion = cut |
| Handoff CTA | Room-owned tray under the stage |

### Handoffs

1. **Scope → Planner:** CTA **Continue to planner** after a user message; write brief + advance. Keep “Draft OG card” as a skip to `/og`.
2. **Planner → Social:** CTA **Continue to social** merges estimate into brief + advance. Keep “Preview social card” → `/og`.
3. **Social:** Prefill OG Quick-mode shell; primary **Open full OG** + **Copy install** for `@atroui/launch-workflow`.

### Mobile

Sticky step rail top → stage → sticky handoff CTA bottom. Soft-rect frame; quiet brand wash only — no watermark.

## Install / docs

- Registry item `@atroui/launch-workflow` (`registry:block`): ships shell + `app/launch/page.tsx`.
- Docs page + nav (Tools / Guides); badge `registry`.
- Docs host route `/launch` uses the same shell.
- Guide leads with “Try live → `/launch`”, then install command.
- Update `pseo.ts` indie-launch copy: meta exists; link `/launch`.
- Footer, ToolExitBand, planner/og exits: link Launch room.
- `llms.txt` / collections: include meta + `/launch`.

## Success criteria

- [x] `/launch` runs Scope → Planner → Social without keys (preview / rules)
- [x] Brief survives step changes (state + `localStorage`)
- [x] `npx shadcn@latest add @atroui/launch-workflow` pulls deps + page/shell
- [x] Guide, nav, pseo, footer tell one story (remove “do not install meta”)
- [x] Reduced-motion: steps cut, no layout spring

## Sequencing note

A ships before B (live catalog), C (landing sections), D (agent-default). Later bets must not regress `/launch` or the meta install path.

## Open implementation notes

- Prefer wrapping existing blocks with room chrome over forking Scope/Planner.
- If planner estimate fields are not exported, read from the same CONTENT/estimate shape already used for `buildOgHref` in `project-planner.tsx`, or lift a small `briefFromPlannerEstimate(...)` helper into `@atroui/project-brief`.
- Docs host may mount registry blocks directly (current `/planner`, `/og` pattern); consumer page from the meta item wires local imports after install.
