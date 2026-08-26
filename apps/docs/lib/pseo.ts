/**
 * Programmatic SEO data. Unique copy per URL — not a city-name swap template.
 * Overlay titles/descriptions; collections + glossary are hub pages.
 *
 * Source of truth: catalog that is **on origin/master** (live atroui.com).
 * Every `path` here must exist as `apps/docs/app/.../page.tsx` on master.
 * Env names must match root `.env.example` on master.
 *
 * Do **not** add hubs or install commands for unmerged work. Parked until
 * those branches merge (see futurechecklist.md):
 * - MCP package `@atroui/mcp` (`new-implementation1`)
 * - First-party CLI `@atroui/cli` (`ni2`)
 * - Extra AI vendors (OpenAI / Anthropic) behind Host APIs
 * - Meta registry item `@atroui/launch-workflow` (the *guide* is live;
 *   the bundled registry item is not)
 *
 * When those ship on master, add overlays/hubs here — not before.
 */

export type PseoFaq = { q: string; a: string }

export type PseoPage = {
  path: string
  /** SERP title (layout template adds · AtroUI) */
  title: string
  description: string
  job: string
  body: string
  faqs: PseoFaq[]
}

export type PseoCollection = {
  slug: string
  title: string
  description: string
  intro: string
  why: string
  paths: string[]
  faqs: PseoFaq[]
}

export type PseoTerm = {
  slug: string
  title: string
  description: string
  definition: string
  whyItMatters: string
  relatedPaths: { href: string; label: string }[]
}

export const pseoPages: Record<string, PseoPage> = {
  "/docs/components/contact-contact-form": {
    path: "/docs/components/contact-contact-form",
    title: "Next.js contact form with SMTP (shadcn)",
    description:
      "Copy a production Next.js contact form into your repo with npx shadcn add @atroui/contact-form. Pair @atroui/api-contact for honeypot, rate limit, and SMTP or Resend — your keys.",
    job: "Ship a contact form without writing /api/contact from scratch",
    body: "Most kits give you inputs. This block posts to your App Router route. The matching Host API validates JSON, ignores honeypot bots, caps body size, and sends mail through SMTP or Resend. AtroUI never holds the inbox credentials.",
    faqs: [
      {
        q: "Do I need the atroui npm package for the contact form UI?",
        a: "No. npx shadcn add @atroui/contact-form copies the form. Add npm i atroui and @atroui/api-contact only when you want the hardened POST handler.",
      },
      {
        q: "Does atroui.com send the email?",
        a: "No. Mail leaves from the consumer app using CONTACT_EMAIL_TO plus SMTP_* or RESEND_API_KEY. Missing mail config returns 503, not a send on AtroUI keys.",
      },
    ],
  },
  "/docs/components/brand-waitlist-form": {
    path: "/docs/components/brand-waitlist-form",
    title: "Next.js waitlist form (Resend or SMTP)",
    description:
      "Install @atroui/waitlist-form for a dark waitlist UI, then @atroui/api-waitlist for audience subscribe or SMTP — BYOK, no AtroUI-hosted list.",
    job: "Collect emails without standing up a waitlist SaaS",
    body: "The form is a registry block. The Host API writes to a Resend audience/segment or falls back to SMTP. Duplicate-friendly Resend 409 is treated as success so double-submits do not look like errors.",
    faqs: [
      {
        q: "Where are waitlist emails stored?",
        a: "On your Resend audience (RESEND_AUDIENCE_ID / RESEND_SEGMENT_ID) or in the mailbox CONTACT_EMAIL_TO. AtroUI does not store subscribers.",
      },
    ],
  },
  "/docs/components/newsletter-newsletter-form": {
    path: "/docs/components/newsletter-newsletter-form",
    title: "Next.js newsletter signup (Host API)",
    description:
      "Shadcn newsletter form plus atroui/api/newsletter. Subscribe with Resend or SMTP. Preview the UI with no keys; live subscribe needs your env.",
    job: "Add a newsletter field that actually subscribes",
    body: "UI-only is a styled input. The Host API is the part people skip: validation, honeypot, and Resend segment vs SMTP. Same install-mode story as contact — CLI first, npm only for the route.",
    faqs: [
      {
        q: "Why 503 on the docs site?",
        a: "atroui.com does not ship a shared Resend key. Without consumer env, handlers refuse paid side effects. That is intentional BYOK.",
      },
    ],
  },
  "/docs/components/home-hero": {
    path: "/docs/components/home-hero",
    title: "Dark Next.js hero section (shadcn)",
    description:
      "Add @atroui/home-hero — a dark-first marketing hero with CONTENT at the top of the file. No atroui package required for UI-only.",
    job: "Replace a generic landing hero with owned source",
    body: "Edit CONTENT for headline, proof line, and CTAs. The block is the AtroUI default install example because it is a full section, not a button. Pair with site-header and a Host API form when the page must convert.",
    faqs: [
      {
        q: "Can I change the copy without a theme API?",
        a: "Yes. After shadcn add, the file is yours. CONTENT and DEFAULT_BRAND sit at the top. Chrome uses getBrand() / NEXT_PUBLIC_SITE_*.",
      },
    ],
  },
  "/docs/components/og-og-workspace": {
    path: "/docs/components/og-og-workspace",
    title: "Next.js OG image generator (BYOK)",
    description:
      "OG workspace UI via @atroui/og-workspace plus POST /api/generate. Preview without keys. AI images need HUGGINGFACE_API_KEY or Gemini — never AtroUI keys.",
    job: "Generate 1200×630 cards in the consumer app",
    body: "Quick mode composites type on a layout (previewOnly works offline). Prompt mode calls Hugging Face or Gemini with the host's key. 429 is rate limit; 503 means no AI key. Use the launch-workflow guide to pass a ProjectBrief from Scope.",
    faqs: [
      {
        q: "Does OPENAI_API_KEY work?",
        a: "Not today. Handlers read HUGGINGFACE_API_KEY and GEMINI_API_KEY / GOOGLE_AI_KEY. Unsupported keys are ignored. Fork the route if you need another vendor.",
      },
    ],
  },
  "/docs/components/thumbnail-thumbnail-workspace": {
    path: "/docs/components/thumbnail-thumbnail-workspace",
    title: "YouTube thumbnail generator for Next.js",
    description:
      "Thumbnail workspace + @atroui/api-thumbnail. Preview without keys. AI needs Hugging Face; Pro pipeline also needs XAI_API_KEY.",
    job: "Ship social thumbs from the same brief as OG",
    body: "Same BYOK contract as OG. Preview is always on. Pro mode is the only path that requires xAI in addition to an image provider.",
    faqs: [
      {
        q: "What is the difference vs OG workspace?",
        a: "OG is 1200×630 for link previews. Thumbnails target 1280×720-class social crops. Both share ProjectBrief helpers.",
      },
    ],
  },
  "/docs/components/scope-scope-chat": {
    path: "/docs/components/scope-scope-chat",
    title: "Project scope chat for Next.js (rules or Grok)",
    description:
      "Scope Chat drafts a project brief without keys (rule-based). Optional XAI_API_KEY upgrades replies. Output feeds the planner and OG workspace.",
    job: "Turn a messy product idea into a brief",
    body: "Without XAI_API_KEY the API still answers from rules — useful on the docs site. With a key, Grok fills the same ProjectBrief shape. This is workflow glue, not a generic chatbot block.",
    faqs: [
      {
        q: "Is this a hosted LLM?",
        a: "No. The route runs on the consumer Next app. No key → rules. XAI_API_KEY → consumer-billed Grok.",
      },
    ],
  },
  "/docs/components/planner-project-planner": {
    path: "/docs/components/planner-project-planner",
    title: "Next.js project planner UI (ProjectBrief)",
    description:
      "Multi-step planner that reads the same ProjectBrief as Scope Chat and deep-links to OG/thumbnail. Registry item @atroui/project-planner.",
    job: "Edit pages, tone, and social titles before generating cards",
    body: "Planner is UI (no Host API). Scope writes the brief, planner edits it, OG/thumbnail href helpers consume it. Install @atroui/project-brief if you only need the type.",
    faqs: [
      {
        q: "Does the planner call AI?",
        a: "No. It is a form over ProjectBrief. AI lives in Scope, OG, and thumbnail Host APIs.",
      },
    ],
  },
  "/docs/components/seo-json-ld": {
    path: "/docs/components/seo-json-ld",
    title: "Next.js JSON-LD components (getBrand)",
    description:
      "Copy @atroui/json-ld for Organization, Article, FAQ, and breadcrumb graph tied to getBrand() so chrome and structured data stay in sync.",
    job: "Stop hardcoding atroui.com into consumer schema",
    body: "After CLI add, JSON-LD reads getBrand() and getSiteUrl(). Override NEXT_PUBLIC_SITE_*. This is the identity-kit spoke, not a generic FAQ widget.",
    faqs: [
      {
        q: "Will Google show FAQ rich results?",
        a: "Only if visible FAQ content matches FaqJsonLd. Do not emit FAQ schema for questions the page does not show.",
      },
    ],
  },
  "/docs/components/ui-theme-adapt": {
    path: "/docs/components/ui-theme-adapt",
    title: "Adaptive dark theme from light tokens (OKLCH)",
    description:
      "ThemeAdapt samples live light :root and writes an OKLCH night companion. Not a second hand-authored .dark sheet. Install @atroui/theme-adapt.",
    job: "Derive night UI from the light tokens you already have",
    body: "shadcn ships :root and .dark as two sheets you maintain. Adaptive Theme Switch reads computed light colors and emits a companion palette (AA muted type). It is not a full theme engine — hover, sidebar, and images stay on you.",
    faqs: [
      {
        q: "Does it replace next-themes?",
        a: "No. Pair with ThemeProvider. Site chrome on atroui.com still uses the classic toggle until you opt the header into ThemeAdapt.",
      },
    ],
  },
  "/docs/host-api": {
    path: "/docs/host-api",
    title: "Host APIs: Next.js routes with BYOK",
    description:
      "AtroUI Host APIs are UI + app/api route stubs + atroui/api handlers. Validation, honeypot, rate limits. You bring SMTP, Resend, HF, Gemini, or xAI keys.",
    job: "Understand the product line, not a footnote on Installation",
    body: "Three install modes: registry UI only, forms (+ npm atroui), AI tools (same). 429 is rate limit. 503 is missing config. OpenAI keys do nothing until we add that provider.",
    faqs: [
      {
        q: "Is a Host API a SaaS API on atroui.com?",
        a: "No. Host means the consumer Next.js app. AtroUI publishes the handler library. Secrets stay in the consumer env.",
      },
    ],
  },
  "/docs/installation": {
    path: "/docs/installation",
    title: "Install AtroUI with the shadcn CLI",
    description:
      "npx shadcn add @atroui/… copies source into your repo (Tailwind v4). Public @atroui — no GitHub token. Host APIs optional and BYOK.",
    job: "Go from zero to an owned section",
    body: "AtroUI is in the official shadcn directory. init, then add. You own the copied files. Tailwind / monorepo scanning is your project config. transpilePackages is for Host API consumers only.",
    faqs: [
      {
        q: "Why is atroui an npm package at all?",
        a: "So form and AI routes can share validation, honeypot, and rate limits without vendoring native image deps into every copied file.",
      },
      {
        q: "Do I need a GitHub token to install @atroui?",
        a: "No. @atroui is on the public shadcn directory. Private GitHub registries are a different shadcn feature.",
      },
    ],
  },
  "/docs/registry": {
    path: "/docs/registry",
    title: "AtroUI shadcn registry catalog",
    description:
      "Official @atroui registry. Browse items, copy npx shadcn add @atroui/…. Live JSON at /r/{name}.json.",
    job: "Find the CLI name for a block",
    body: "Each item is a JSON document the shadcn CLI fetches. UI files copy into the consumer repo. api-* items drop thin route.ts files that import atroui/api/*.",
    faqs: [
      {
        q: "Do I paste a registry URL?",
        a: "Not for @atroui. The directory listing is merged. npx shadcn add @atroui/home-hero is enough after init.",
      },
    ],
  },
}

export const pseoCollections: PseoCollection[] = [
  {
    slug: "nextjs-forms",
    title: "Next.js forms with Host APIs",
    description:
      "Contact, waitlist, and newsletter UI you own, plus hardened App Router handlers. BYOK mail — SMTP or Resend.",
    intro:
      "Searchers want a Next.js contact form that is not a CodePen. This collection is the AtroUI answer: copied UI, then optional atroui/api/* so you do not write honeypot and 429 logic again.",
    why: "One job: inbound email. Three blocks share the same security defaults and the same install-mode matrix.",
    paths: [
      "/docs/components/contact-contact-form",
      "/docs/components/brand-waitlist-form",
      "/docs/components/newsletter-newsletter-form",
      "/docs/host-api",
    ],
    faqs: [
      {
        q: "Which form should I install first?",
        a: "Contact if you need a message plus optional attachment. Waitlist or newsletter if you only need an email field into Resend.",
      },
    ],
  },
  {
    slug: "og-images",
    title: "OG and thumbnail images in Next.js",
    description:
      "Generate Open Graph and social thumbnails in your app. Preview without keys. AI via Hugging Face, Gemini, or xAI — BYOK.",
    intro:
      "People search “next.js og image” and land on @vercel/og snippets. AtroUI ships a workspace UI plus Host APIs so the generator lives next to the marketing site, on the consumer’s keys.",
    why: "Preview-only is the wedge (no keys). AI is opt-in. ProjectBrief links Scope → planner → these tools.",
    paths: [
      "/docs/components/og-og-workspace",
      "/docs/components/thumbnail-thumbnail-workspace",
      "/docs/components/og-og-live-preview",
      "/docs/guides/launch-workflow",
    ],
    faqs: [
      {
        q: "Is this the same as next/og?",
        a: "Docs site OG routes can use next/og. The Host API generator is a Satori + sharp pipeline for workspace downloads.",
      },
    ],
  },
  {
    slug: "indie-launch",
    title: "Indie launch workflow (scope to social)",
    description:
      "Scope Chat, project planner, and OG/thumbnail workspaces sharing one ProjectBrief. From idea to social card in the consumer Next.js app.",
    intro:
      "The catalog is easy to read as a grid of widgets. This collection is the product bet: one intake conversation becomes a brief, then a card — still BYOK.",
    why: "The live catalog already has Scope, planner, OG, and `/docs/guides/launch-workflow`. There is no `@atroui/launch-workflow` meta item on master — do not tell people to install it. Traffic on this job decides if we add one later.",
    paths: [
      "/docs/guides/launch-workflow",
      "/docs/components/scope-scope-chat",
      "/docs/components/planner-project-planner",
      "/docs/components/og-og-workspace",
    ],
    faqs: [
      {
        q: "What if I only want OG?",
        a: "Install og-workspace plus api-generate. Skip Scope. The brief helpers are optional glue.",
      },
    ],
  },
  {
    slug: "dark-marketing",
    title: "Dark marketing sections for Next.js",
    description:
      "Hero, header, footer, FAQ, and pricing blocks from the AtroUI shadcn registry. Dark-first, CONTENT at the top of each file.",
    intro:
      "shadcn primitives do not assemble a homepage. These blocks are the sections people actually ship — owned files, not a themed iframe.",
    why: "No fake logo cloud on atroui.com. The same blocks are in the registry for consumers who want a logo row on their site.",
    paths: [
      "/docs/components/home-hero",
      "/docs/components/site-header",
      "/docs/components/site-footer",
      "/docs/components/faq-interactive-preview",
      "/docs/components/pricing-overview",
    ],
    faqs: [
      {
        q: "Do these need Host APIs?",
        a: "No. Registry UI only. Add a form Host API when the page must send mail.",
      },
    ],
  },
]

export const pseoGlossary: PseoTerm[] = [
  {
    slug: "host-api",
    title: "What is an AtroUI Host API?",
    description:
      "A Host API is copied UI plus a thin Next.js route.ts plus a hardened handler in the atroui package. You bring API keys. AtroUI is not a hosted AI or mail SaaS.",
    definition:
      "Host API = the consumer’s App Router route that calls atroui/api/<name>. The host is their Next.js app. The API is validation, honeypot, body caps, and rate limits — then SMTP, Resend, Hugging Face, Gemini, or xAI using env on that host.",
    whyItMatters:
      "UI kits stop at the form. Random GitHub routes skip honeypot and 429. Host APIs are the middle: own the files, borrow the boring security, keep the keys.",
    relatedPaths: [
      { href: "/docs/host-api", label: "Host API docs" },
      { href: "/docs/collections/nextjs-forms", label: "Forms collection" },
      { href: "/docs/glossary/byok", label: "BYOK" },
    ],
  },
  {
    slug: "byok",
    title: "BYOK (bring your own keys)",
    description:
      "AtroUI Host APIs never ship OpenAI, Resend, or Hugging Face keys. Paid paths return 503 until the consumer sets env. Preview and rule-based scope still work.",
    definition:
      "BYOK means supported provider keys in the consumer environment: SMTP/Resend for mail; HUGGINGFACE_API_KEY, GEMINI_API_KEY, XAI_API_KEY for AI tools. Unsupported keys (OpenAI, Anthropic today) are ignored.",
    whyItMatters:
      "“Free AI on a docs site” is usually someone else’s bill. AtroUI refuses that model. Demos 503. Consumers pay their own vendors.",
    relatedPaths: [
      { href: "/docs/host-api", label: "Provider matrix" },
      { href: "/docs/glossary/host-api", label: "Host API" },
      { href: "/docs/collections/og-images", label: "OG collection" },
    ],
  },
  {
    slug: "shadcn-registry",
    title: "What is the AtroUI shadcn registry?",
    description:
      "AtroUI publishes a shadcn-compatible registry at atroui.com/r. npx shadcn add @atroui/home-hero copies source into your repo. Listed in the official shadcn directory.",
    definition:
      "A registry item is JSON describing files, npm dependencies, and other @atroui/* items. The CLI fetches https://www.atroui.com/r/{name}.json and writes files to the consumer project.",
    whyItMatters:
      "npm design systems update in node_modules. Registry items are source you can edit. The atroui package exists only for Host API handlers that should upgrade together.",
    relatedPaths: [
      { href: "/docs/registry", label: "Registry catalog" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/compare", label: "Compare" },
    ],
  },
]

export function getPseoPage(path: string): PseoPage | undefined {
  return pseoPages[path]
}

export function getPseoCollection(slug: string): PseoCollection | undefined {
  return pseoCollections.find((c) => c.slug === slug)
}

export function getPseoTerm(slug: string): PseoTerm | undefined {
  return pseoGlossary.find((t) => t.slug === slug)
}

export function collectionsForPath(path: string): PseoCollection[] {
  return pseoCollections.filter((c) => c.paths.includes(path))
}
