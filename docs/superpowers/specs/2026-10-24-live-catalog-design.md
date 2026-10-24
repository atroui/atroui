# Live catalog — flagship poke pack

**Date:** 2026-10-24  
**Bet:** B (live catalog) — second of A→D  
**Status:** §§1–2 approved; implementing.  
**Family Values:** Gradual revelation (tip only on flagships); fluidity (existing motion); careful delight (one poke, visible result).

## Problem

Component docs already mount interactive demos, but many read as static samples. Arc’s rule — *nothing here is a recording* — is the pause we want on AtroUI’s install surface.

## Approach

Upgrade **10 flagship demos** so one gesture produces an in-stage result. Add an optional **TRY · tip** strip on `DocsExample` for those pages only.

## Architecture

- `DocsExample`: optional `tip?: string` → mono stamp inside the preview stage (`TRY · {tip}`), hidden on Code tab.
- `ComponentDoc`: pass-through `tip` to `DocsExample`.
- Flagship `Demo*` in `registry-demos.tsx` + matching catalog pages set tip + richer interaction.
- No new registry SKUs, no `/playground` route.

## Flagship set + tip copy

| Demo | Tip | Result |
| --- | --- | --- |
| Menu | Open the menu · pick an item | Status line shows choice |
| Dialog | Open · save to close | Opens / closes with settle |
| Alert Dialog | Delete · confirm in place | Confirm path clear |
| Combobox | Type to filter · select | Selection reflected |
| Form Select | Open · choose an option | Trigger shows value |
| Tabs | Switch tabs · watch the panel | Panel content changes |
| NumberField | Step past the limit | Clamp / pushback visible |
| Switch | Toggle · read the state | Label tracks on/off |
| Toast | Fire a toast · watch the stack | Toast appears |
| Context Menu | Right-click the pad · choose | Status line shows choice |

## Non-goals

Coach marks, auto-open overlays, tips on every page, gallery rewrite (C), MCP (D).

## Success criteria

- [ ] Each of 10 demos changes visible state after one gesture without reading Usage
- [ ] Tip ≤ 8 words after `TRY ·`; absent on non-flagships
- [ ] Reduced-motion: interaction kept; tip static
- [ ] Install chips / registry paths unchanged
