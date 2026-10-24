# Landing section kit — register Atro Vibrant map

**Date:** 2026-10-24  
**Bet:** C (landing sections) — third of A→D  
**Status:** Implemented on `feat/atro-room` (2026-10-24).  
**Family Values:** Gradual revelation (composable sections); careful delight (soft-rect, no lamp/parallax defaults).

## Problem

Landing blocks exist in `registry/default/blocks/` and demos, but many are missing from `registry.json`, so consumers cannot install the Vibrant-shaped map.

## Approach

Register eight orphaned soft-rect blocks, add docs/nav/collection discovery, rebuild `public/r`. No new visuals; no mega landing-kit SKU yet.

## Include

`feature-bento`, `testimonials-stack`, `stats-band`, `cta-band`, `pricing-tiers`, `logo-marquee`, `auth-split`, `saas-starter`

## Exclude

`hero-lamp`, `hero-parallax`, `faq-accordion` (park)

## Already registered (kit peers)

`home-hero`, `feature-grid`, `logo-cloud`, `pricing-overview`, `faq`, `site-header`, `site-footer`, `contextual-cta`

## Success criteria

- [x] All eight in `registry.json` + `public/r/<name>.json`
- [x] Docs page + Demo* + nav for each (pre-existed; now installable)
- [x] `dark-marketing` collection paths updated
- [x] `llms.txt` lists the new install names
