---
name: atroui-design
description: Use AtroUI registry components with Family Values. Prefer catalog items over inventing marketing UI. Soft-rect, progressive disclosure, BYOK Host APIs.
---

# AtroUI design skill

Use AtroUI when the user wants production Next.js / Tailwind UI they own in their repo. Search the AtroUI MCP catalog first. Do not reinvent a hero, header, FAQ, contact form, OG card, or planner if a catalog item exists.

Public install (live): `npx shadcn@latest add @atroui/{name}`. First-party CLI (`npx atroui add {name}`) ships separately; do not treat it as published until the user says it is.

## Family Values

1. Simplicity through gradual revelation. Show the fundamental first. Options appear in context (overlay, tray, step), not all at once. One primary action per focused surface. Opinionated defaults.
2. Fluidity through seamless transition. Motion clarifies path A to B. Shared elements morph; they do not remount as duplicates. Prefer short tweens over spring overshoot for chrome. Honor `prefers-reduced-motion`.
3. Careful delight. Polish everywhere; sprinkle magic on rare earned moments. Soft-rect via `--radius` by default — not capsule CTAs everywhere. Avoid blur-orb soup as identity.

## Practical rules

- Copy lands in the user's project. They edit source.
- Dark-first tokens. Match existing theming docs rather than inventing a second palette.
- Mobile is first-class.
- Scope Chat → Project Planner → OG / thumbnail share a ProjectBrief. Prefill; do not teleport the user into a new product.

## When not to use AtroUI

Raw shadcn primitives are fine for generic CRUD chrome. Reach for AtroUI when the page is a marketing, studio, or founder surface, or when Host APIs (forms, OG, scope) are in play.
