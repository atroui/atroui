# Public demo thread draft — Host API + Launch Room

**Use after** PostHog token is on Vercel (so installs from the thread are countable).  
**Primary surface:** X (Twitter). Optional: Product Hunt “Ship” comment / Discord.

---

## X thread (copy-paste)

**1/**
Most “AI UI kits” will happily hold your OpenAI key.

AtroUI won’t.

Host APIs: UI + hardened Next routes in *your* repo.  
Keys stay in *your* `.env`.  
Missing keys → **503**. Fail closed.

https://www.atroui.com

**2/**
Flip it on the homepage: Keys set → 200 via your Resend.  
Keys missing → 503. We don’t mail or run AI for you.

Then:

```
npx shadcn@latest add @atroui/waitlist-form
```

Same files the strip shows. Own them in git.

**3/**
Need the full job, not a beam?

**/launch** — Scope → Planner → OG social card.  
Same installables. Soft-rect. No Pro wall on sections.

https://www.atroui.com/launch

**4/**
Compared to Aceternity / Magic: they win on motion catalogs.  
We win on MIT sections + BYOK Host APIs + live rooms.

vs Aceternity → https://www.atroui.com/docs/compare/vs-aceternity  
vs Magic → https://www.atroui.com/docs/compare/vs-magic-ui

**5/**
Add the section. Own the room.

Registry: `npx shadcn add @atroui/…`  
Docs: https://www.atroui.com/docs/host-api

---

## Short single-post alt

AtroUI Host APIs: waitlist/OG/scope routes on *your* keys. Missing env → 503. MIT sections via `npx shadcn add @atroui/…`. Try the keys toggle on https://www.atroui.com then open /launch.

---

## Post checklist

- [ ] `NEXT_PUBLIC_POSTHOG_*` live on Vercel + redeploy
- [ ] Confirm one test `documentation_code_copied` in PostHog Live
- [ ] Post thread
- [ ] Pin /docs/host-api or /launch in reply if needed
