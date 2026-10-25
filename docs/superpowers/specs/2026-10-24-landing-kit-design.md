# Mega landing-kit — one-add Vibrant stack

**Date:** 2026-10-24  
**Bet:** Landing-kit meta (after CLI / MCP)  
**Branch:** `feat/atro-room`  
**Status:** Implemented on `feat/atro-room` (uncommitted until asked).  
**Family Values:** Gradual revelation (sections stay editable files); opinionated default order.

## Problem

Bet C registered soft-rect sections à la carte. Agents and founders still want **one** install for a full marketing page.

## Approach

Meta `@atroui/landing-kit` — thin `LandingPage` shell + `app/landing/page.tsx` that mounts existing blocks in Vibrant order. No new visuals. No lamp/parallax.

## Stack (mounted)

`site-header` → `home-hero` → `logo-marquee` → `feature-bento` → `stats-band` → `testimonials-stack` → `pricing-tiers` → `faq` → `cta-band` → `site-footer`

## Not mounted (still installable peers — closed, no further work)

`saas-starter` (one-file alternative), `auth-split`, `hero-lamp`, `hero-parallax`, `logo-cloud`, `pricing-overview`, `feature-grid`, `faq-accordion`  

Lamp/parallax stay optional motion heroes outside the soft-rect kit.

## Success criteria

- [x] `@atroui/landing-kit` in registry + `public/r`  
- [x] Live `/landing` on docs host  
- [x] Docs + nav + dark-marketing + llms mention the meta  
- [x] MCP catalog resync includes `landing-kit` (126 items)  
- [x] Discovery (Approach A): Kits sidebar, `toolApps` (/landing), footer, collection Try live, docs “Open live landing” CTA  

## Discovery note

`/landing` = live try-it. `/docs/components/landing-landing-kit` = install truth. Same composition; marketed like `/launch` ↔ Launch workflow.
