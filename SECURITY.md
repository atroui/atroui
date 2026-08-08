# Security Policy

## Supported Versions

Security fixes are applied to the latest published `atroui` release line on npm.

| Version | Supported |
| ------- | ------------------ |
| 0.4.x | :white_check_mark: |
| 0.3.x | :x: |
| 0.2.x and earlier | :x: |

When a new minor or major ships, older lines may stop receiving patches unless noted here.

## Reporting a Vulnerability

**Do not** open a public GitHub issue for security-sensitive reports.

Please report privately via one of:

1. **GitHub Security Advisories** - [Report a vulnerability](https://github.com/atroui/atroui/security/advisories/new) on this repository (preferred).
2. **Email** - `hello@iamk.xyz` with subject `[SECURITY] atroui …`

Include:

- Affected package version(s) (`atroui@x.y.z`)
- Description of the issue and impact
- Steps to reproduce or a proof of concept
- Suggested fix, if you have one

## Response

We aim to acknowledge reports within **7 days** and to share a remediation plan or status update within **14 days** when the report is valid.

If the issue is accepted:

- We will work on a fix for the supported version line
- We may request a coordinated disclosure window before public discussion
- A fix will ship via a normal `atroui` release and changelog entry when appropriate

If the issue is declined (e.g. not a vulnerability, out of scope, or duplicate), we will explain why.

## Scope

In scope:

- The published **`atroui`** package (`packages/ui`)
- The **atroui.com** docs app when a flaw can affect users of the site or leak secrets

Out of scope (unless they expose AtroUI users to risk):

- Third-party provider outages or billing on keys **you** configure (Hugging Face, Google AI, xAI, SMTP, Resend)
- Demo / portfolio content under `atroui/content/*`
- Vulnerabilities only present after you fork and heavily modify the monorepo

## Best practices for consumers

- Keep `atroui` updated to the latest supported release
- Do not commit API keys; use env vars as documented in `.env.example`
- Install form APIs with `@atroui/api-contact`, `@atroui/api-waitlist`, `@atroui/api-newsletter` (or call `atroui/api/*` from your own `route.ts`)
- Install AI tool APIs with `@atroui/api-generate`, `@atroui/api-thumbnail`, `@atroui/api-scope` - AtroUI never ships keys and does not run paid generation on atroui.com
- Shipped handlers include honeypot checks (forms), body size caps, and an **in-memory** rate limiter - swap for Upstash / Vercel KV (or a WAF) on multi-instance production
- Prefer preview-only / rule-based paths in CI and public demos; only enable HF/Google/xAI in environments you control
- Never expose `SMTP_*`, `*_API_KEY`, or `REVALIDATE_SECRET` via `NEXT_PUBLIC_*`
