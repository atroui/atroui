---
name: atroui-host-api
description: AtroUI Host APIs and BYOK. Own the UI in the repo. Keys stay in the user's env. Never send secrets to atroui.com.
---

# AtroUI Host APIs and BYOK

Own the UI in the repo. Borrow the boring API security. Bring your own keys.

## Rules

- AtroUI never stores the user's SMTP, Resend, OpenAI, xAI, or other secrets.
- Forms and AI tools POST to the **user's** Next.js App Router routes (`/api/contact`, `/api/waitlist`, `/api/newsletter`, `/api/generate`, `/api/thumbnail`, `/api/scope`).
- Install matching registry items: `@atroui/api-contact`, `@atroui/api-waitlist`, `@atroui/api-newsletter`, `@atroui/api-generate`, `@atroui/api-thumbnail`, `@atroui/api-scope`.
- Keys live in the user's `.env.local` and host (Vercel) env. Never commit them. Never send them to atroui.com.
- Preview paths (OG / thumbnail compose) should work without keys. AI generation needs the user's provider env.

## Agent behavior

- If a form is added, also mention the Host API route and BYOK.
- Do not suggest a hosted AtroUI backend or "paste your key into AtroUI."
- Rate limits, honeypots, and payload caps stay in the Host API handlers.
