# Demo content

Modules in this folder are **portfolio / studio sample data** (services, case studies, FAQ, journal, etc.). They may still mention Makershot — that is intentional demo context for section components.

AtroUI chrome (logo, headers, SEO helpers, mail defaults) uses `getBrand()` / `NEXT_PUBLIC_SITE_*` and defaults to AtroUI.

When shipping your own product:

1. Do not import `atroui/content/*` blindly — replace with your data, or
2. Pass props into section components (`HomeWho`, `MadeWithEmbed`, …) to override brand strings.
