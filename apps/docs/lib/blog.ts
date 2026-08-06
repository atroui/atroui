export type BlogCodeBlock = {
  language: string
  code: string
}

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  /** Short body sections for the post page. Body may include [label](/path) links. */
  sections: {
    heading?: string
    body: string[]
    codeBlocks?: BlogCodeBlock[]
  }[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "npm-to-shadcn-registry",
    title:
      "Why AtroUI moved from npm install to the shadcn registry (and what stayed on npm)",
    description:
      "A detailed look at migrating AtroUI from a classic npm UI package to a shadcn-compatible registry: ownership, updates, Host APIs, and how to migrate an existing app.",
    date: "2026-08-06",
    sections: [
      {
        body: [
          "For a long time the natural way to ship a React design system was simple: publish an npm package, tell people to `npm install atroui`, import from `atroui/…`, and hope `transpilePackages` plus peer deps lined up.",
          "That model still works for some libraries. It stopped being the right *consumer* story for AtroUI. The catalog is now a [shadcn-compatible registry](https://www.atroui.com/docs/registry): you run `npx shadcn add @atroui/home-hero`, source lands in your repo, and you edit `CONTENT` at the top of the file.",
          "This post explains what we migrated, why, what still lives on npm, and how to move an app that already depended on the package.",
        ],
      },
      {
        heading: "What the old npm-first path looked like",
        body: [
          "Early AtroUI leaned on the classic library contract:",
          "Install: `npm i atroui` (and peers like `next-themes`).",
          "Configure Next: `transpilePackages: [\"atroui\"]` so TypeScript source inside `node_modules` compiled with the app.",
          "Import: `import { HomeHero } from \"atroui/components/…\"` or barrel paths from the package.",
          "Theme: import `atroui/globals.css` and hope the host layout already loaded Outfit / next-themes the way the docs site did.",
          "That is fine when every consumer wants the *same* locked component binary. It fights you when every consumer wants to rewrite copy, swap CTAs, fork layout, and ship tomorrow.",
        ],
      },
      {
        heading: "Where npm-as-UI started to hurt",
        body: [
          "Black-box ownership. A hero that lives only in node_modules is awkward to restyle. Teams either monkey-patched props forever or forked the package. The shadcn ecosystem already solved that by copying source into the app.",
          "Update friction in the wrong place. Semver bumps for a wording tweak or a class rename force a dependency upgrade dance across every consumer. When the file lives in *your* repo, you merge what you want and ignore the rest.",
          "Install surface area. Fresh App Router apps hit Turbopack/webpack errors until `transpilePackages` was set. Peers were easy to forget. Docs had to teach library packaging before teaching design. See [transpilePackages and Turbopack](/blog/transpile-packages-turbopack-ui-libraries).",
          "Wrong altitude for marketing UI. Atoms in a package make sense. Full page bands with studio demo copy locked behind an import path do not. AtroUI’s job is production sections - heroes, who bands, footers, CTAs - with editable constants on day one.",
          "Discovery. Designers and indie makers already know `npx shadcn add`. Teaching a second install religion for the same class of UI slows adoption.",
        ],
      },
      {
        heading: "What we migrated to",
        body: [
          "AtroUI now leads with the registry on [atroui.com](https://www.atroui.com):",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: `npx shadcn@latest init
npx shadcn@latest registry add @atroui=https://www.atroui.com/r/{name}.json
npx shadcn@latest add @atroui/home-hero
npx shadcn@latest add @atroui/site-header @atroui/site-footer`,
          },
        ],
      },
      {
        body: [
          "Each item is a JSON registry entry that points at source under `apps/docs/registry/`. The CLI copies files into your aliases (`components/blocks/…`, `lib/brand.ts`, and so on). Dependencies resolve as `@atroui/brand`, `@atroui/utils`, etc. - registry names, not opaque package internals.",
          "You own the files. Diff them. Delete what you do not need. Rebrand by editing `DEFAULT_BRAND` or setting `NEXT_PUBLIC_SITE_*`. That is the same ownership model as shadcn/ui, aimed at a higher altitude: [AtroUI vs shadcn/ui](/blog/atroui-vs-shadcn).",
        ],
      },
      {
        heading: "Why the shadcn ecosystem specifically",
        body: [
          "It is already the default distribution channel for copy-into-repo UI in Next.js land. Fighting that means inventing a second CLI, a second docs language, and a second mental model.",
          "Registries compose. Teams can keep blank-slate primitives from one registry and AtroUI sections from another, as long as tokens do not fight. We document that path on [Compare](/docs/compare).",
          "Directory and tooling. A public `https://www.atroui.com/r/{name}.json` URL works with the stock CLI, CI checks, and the emerging shadcn directory surface. See our [directory notes](https://github.com/atroui/atroui/blob/master/apps/docs/SHADCN_DIRECTORY.md).",
          "Docs and product stay aligned. The same registry that powers consumer installs also builds the live catalog on atroui.com. What you add is what we demo.",
        ],
      },
      {
        heading: "What we deliberately kept on npm",
        body: [
          "The migration is not “delete the package.” It is “stop pretending every UI file should be consumed as a versioned black box.”",
          "The published `atroui` package (currently **0.2.3**, with a pending **0.3.0** minor for Host API handlers) still matters for:",
          "Host API handlers under `atroui/api/*` - contact, waitlist, newsletter, generate, thumbnail, scope. These share validation, honeypots, body caps, rate limits, and image compose logic (Satori, resvg, sharp). Vendoring that into every app via the CLI would ship native `.node` addons and font paths into consumer trees in painful ways.",
          "The docs monorepo itself - `@atroui/docs` depends on `atroui: workspace:*` so the marketing site and API routes can import the same handlers.",
          "Optional `atroui/globals.css` for hosts that already install the package.",
          "So the product has **two install modes** (also documented on [Installation](/docs/installation)):",
          "Registry UI only - CLI, no npm package required.",
          "Host APIs - `npm i atroui`, `transpilePackages: [\"atroui\"]`, then `npx shadcn add @atroui/api-…` for thin `app/api/*/route.ts` stubs.",
          "AtroUI never ships API keys and does not run paid AI on atroui.com. BYOK stays in *your* env. That rule is easier to enforce when secrets never live in copied UI files.",
        ],
      },
      {
        heading: "How the monorepo changed shape",
        body: [
          "`apps/docs/registry/` is the source of truth for copy-paste items.",
          "`pnpm registry:build` (shadcn build) emits `apps/docs/public/r/*.json` for the CDN/CLI.",
          "`packages/ui` remains the publishable npm package: handlers, compose helpers, tests, CHANGELOG via Changesets.",
          "Docs routes under `app/api/*` are thin wrappers - the same shape consumers get from `@atroui/api-*` registry items.",
          "Consumer-facing README and install docs lead with the CLI. npm is documented where Host APIs need it, not as the default hero path.",
        ],
      },
      {
        heading: "Migrating an existing npm-based app",
        body: [
          "If you already `import … from \"atroui/…\"` for UI, plan a deliberate cutover rather than a big-bang delete.",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: `# 1. Register the catalog
npx shadcn@latest registry add @atroui=https://www.atroui.com/r/{name}.json

# 2. Add the blocks you actually use (example)
npx shadcn@latest add @atroui/home-hero @atroui/site-header @atroui/brand @atroui/utils

# 3. Point imports at local files (@/components/…, @/lib/brand)
# 4. Copy CONTENT / DEFAULT_BRAND values you already customized
# 5. Keep or add npm atroui only if you use Host APIs
npm i atroui   # optional - Host API consumers only`,
          },
        ],
      },
      {
        body: [
          "Replace `from \"atroui/components/…\"` with imports from the files the CLI wrote.",
          "Replace `from \"atroui/lib/brand\"` with `@/lib/brand` (or your alias) after adding `@atroui/brand`.",
          "Move token ownership into the host CSS sheet you already maintain. Keep `atroui/globals.css` only if you still depend on the package for other reasons.",
          "If you use contact / OG / thumbnail / scope, install the matching `@atroui/api-*` routes and leave `transpilePackages: [\"atroui\"]` in place.",
          "Delete unused package imports last. Run the app, then drop `atroui` from package.json only if nothing under `atroui/api/*` remains.",
        ],
      },
      {
        heading: "Versioning after the split",
        body: [
          "Registry items are not semver’d the same way as npm. The JSON on atroui.com is what the CLI fetches; your copied files version with *your* git history.",
          "The npm package still uses Changesets. Pending notes bump **atroui** to **0.3.0** for the Host API surface (`atroui/api/contact|waitlist|newsletter|generate|thumbnail|scope`). Until that release ships, published line remains **0.2.x** (see [Changelog](/docs/changelog) and [SECURITY](https://github.com/atroui/atroui/blob/master/SECURITY.md)).",
          "Docs app `@atroui/docs@0.1.0` is private and ignored by Changesets - that version is not the library version.",
        ],
      },
      {
        heading: "What we optimized for",
        body: [
          "Speed to a coherent dark UI you can edit.",
          "Same CLI muscle memory as the rest of the Next.js ecosystem.",
          "A clean boundary for secrets and native image tooling via Host APIs.",
          "One canonical brand home: [www.atroui.com](https://www.atroui.com).",
        ],
      },
      {
        heading: "Next steps",
        body: [
          "New project: [Install AtroUI in a Next.js App Router project](/blog/install-atroui-nextjs-app-router).",
          "Catalog: [Registry](/docs/registry).",
          "Brand: [Rebrand with getBrand()](/blog/rebrand-with-getbrand).",
          "Positioning: [What is AtroUI?](/blog/what-is-atroui).",
          "Lessons from shipping: [Registry + package internals](/blog/shipping-component-library-npm).",
        ],
      },
    ],
  },
  {
    slug: "what-is-atroui",
    title: "What is AtroUI? A Next.js component catalog on the shadcn registry",
    description:
      "AtroUI is a dark-first React / Next.js component catalog. Add it with the shadcn CLI - source lands in your repo. Production sections, brand chrome, editable CONTENT.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "AtroUI is a production React and Next.js component catalog. You add it with the shadcn CLI the same way you add any registry item. Components copy into your project so you own the source: dark-first sections, brand chrome, and optional host-bound tools that call your own APIs.",
          "The canonical home is [atroui.com](https://www.atroui.com). Docs, compare notes, and this blog all live under that brand so search results point somewhere real.",
        ],
      },
      {
        heading: "The job it is hired for",
        body: [
          "Most teams do not want to rebuild a hero, footer, and OG workspace from scratch for every product. They want a coherent dark UI that already looks like a shipped app, then they customize brand and content.",
          "That is the job AtroUI is built for. You hire it to get from empty App Router project to a branded dark surface without assembling fifty primitives into a design system yourself.",
        ],
      },
      {
        heading: "Same ownership model as shadcn",
        body: [
          "Copy-paste kits optimize for owning every file in your repo. AtroUI uses that same model: `npx shadcn add @atroui/…` copies source in. The difference is altitude - production sections (heroes, who bands, CTAs, footers), brand chrome via getBrand(), and Host API tools that expect your own /api routes.",
          "Edit CONTENT at the top of each installed file. Day one, you own the UI. See [AtroUI vs copy-paste kits](/docs/compare) and [AtroUI vs shadcn/ui](/blog/atroui-vs-shadcn).",
        ],
      },
      {
        heading: "Who it is for",
        body: [
          "Indie makers and small teams shipping Next.js products who want a dark-first system without spending a sprint on chrome.",
          "Agencies and studios rebranding via DEFAULT_BRAND or NEXT_PUBLIC_SITE_*.",
          "Builders who want SEO helpers and AI-adjacent workspaces that do not burn shared LLM keys on the docs host.",
        ],
      },
      {
        heading: "What you get in the box",
        body: [
          "Registry items for utils, brand, button, logo, site header, home bands, pricing, CTAs, and contact.",
          "Editable CONTENT / DEFAULT_BRAND constants in every block file.",
          "Host API tools (OG, thumbnails, scope) that you wire to your own backends.",
        ],
      },
      {
        heading: "Get started in one path",
        body: [
          "Init shadcn, add the @atroui registry, then add a component. Open the file and edit CONTENT.",
          "Full steps: [Installation](/docs/installation). Catalog: [Registry](/docs/registry). Walkthrough: [Install AtroUI in a Next.js App Router project](/blog/install-atroui-nextjs-app-router).",
        ],
      },
    ],
  },
  {
    slug: "install-atroui-nextjs-app-router",
    title: "Install AtroUI in a Next.js App Router project (step-by-step)",
    description:
      "Add AtroUI with the shadcn CLI: init, register @atroui, add home-hero. Components land in your repo with editable CONTENT.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "This guide gets AtroUI into a Next.js App Router app the shadcn way. Target: Next.js 15+, React 18/19, Tailwind CSS v4.",
          "When you finish, you should have a hero (or button) file in your project that you can edit. Deeper detail always lives on the [Installation docs](/docs/installation).",
        ],
      },
      {
        heading: "1. Init shadcn",
        body: [
          "You need a components.json in the app. If you already have one, skip this step.",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: "npx shadcn@latest init",
          },
        ],
      },
      {
        heading: "2. Add the AtroUI registry",
        body: [
          "Point the CLI at the AtroUI registry on atroui.com.",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: "npx shadcn@latest registry add @atroui=https://www.atroui.com/r/{name}.json",
          },
          {
            language: "json",
            code: `{
  "registries": {
    "@atroui": "https://www.atroui.com/r/{name}.json"
  }
}`,
          },
        ],
      },
      {
        heading: "3. Add a component",
        body: [
          "Dependencies resolve as @atroui/brand, @atroui/utils, and so on - not bare names on the default shadcn registry.",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: `npx shadcn@latest add @atroui/home-hero
npx shadcn@latest add @atroui/site-header
npx shadcn@latest add @atroui/button`,
          },
        ],
      },
      {
        heading: "4. Edit CONTENT",
        body: [
          "Open the installed file (for example components/blocks/home-hero.tsx). Change the CONTENT constants at the top - stamp, headline, CTAs. That is the point of the registry.",
          "Full catalog: [Registry](/docs/registry). Theming tokens: [Theming](/docs/theming).",
        ],
      },
    ],
  },
  {
    slug: "dark-first-design-tokens",
    title: "Dark-first design tokens in AtroUI",
    description:
      "How AtroUI’s dark-first tokens work: black canvas, brand blue #0b7bff, glass surfaces, Outfit, and how to override them in atroui/globals.css.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "Most “dark mode” systems are light themes with an invert toggle. AtroUI is dark-first: the default canvas is near black, type and surfaces are designed for that canvas, and light is the exception, not the starting point.",
          "That framing matters for product UIs that stay dark for hours (dashboards, creator tools, AI workspaces). You are not fighting a light-first token map every time you ship a panel.",
        ],
      },
      {
        heading: "The visual system in one pass",
        body: [
          "Canvas near black. Brand blue at #0b7bff (and the matching --brand CSS variable). Cyan mist accents. Glass panels via utilities like ms-panel / md-glass. Rounded-full CTAs that match the docs site.",
          "Display type expects Outfit exposed as --font-outfit. Sans and mono fall through the same token sheet so marketing pages and app chrome share one rhythm.",
        ],
      },
      {
        heading: "Where tokens live",
        body: [
          "Tokens live in atroui/globals.css: CSS variables under :root and .dark. Host apps import that stylesheet once in the root layout. You do not need a separate Tailwind theme file just to use the catalog tokens.",
          "Components consume those variables. Override the variables and the catalog restyles without rewriting every section.",
        ],
      },
      {
        heading: "Customize without forking the catalog",
        body: [
          "After importing globals, override --brand and related neutrals in your own CSS. Prefer small, intentional overrides over a full fork until you know which tokens you actually change.",
        ],
        codeBlocks: [
          {
            language: "css",
            code: `.dark {
  --brand: oklch(0.62 0.2 255);
  --background: oklch(0 0 0);
  --primary: oklch(0.99 0 0);
  --primary-foreground: oklch(0 0 0);
  --font-sans: var(--font-outfit);
}`,
          },
        ],
      },
      {
        heading: "Brand chrome vs visual tokens",
        body: [
          "Visual tokens control color and type. Product chrome (logo wordmark, default SEO name, mailto) resolves through getBrand(). Keep those concerns separate: restyle the canvas with CSS variables; rename the product with env or props.",
          "More on chrome: [Rebranding with getBrand()](/blog/rebrand-with-getbrand). Token map and theming notes: [Theming docs](/docs/theming). Brand assets: [Brand kit](/docs/brand).",
        ],
      },
      {
        heading: "Why this helps shipping",
        body: [
          "A dark-first token sheet reduces decision fatigue. New sections inherit the same black canvas, brand accent, and glass language, so marketing and app surfaces feel like one product instead of a collage of kit defaults.",
          "For the longer argument, see [Why dark-first design systems age better](/blog/why-dark-first-design-systems).",
        ],
      },
    ],
  },
  {
    slug: "rebrand-with-getbrand",
    title: "Rebrand AtroUI chrome with getBrand() and NEXT_PUBLIC_SITE_*",
    description:
      "Override AtroUI logo text, SEO defaults, and mail chrome with getBrand() or NEXT_PUBLIC_SITE_*. Keep demo content under content/ separate.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "When you install AtroUI, product chrome defaults to AtroUI / atroui.com. That is correct for the docs host. It is wrong the moment you ship Acme.",
          "getBrand() is the single resolver for logo wordmark, headers, footers, JSON-LD defaults, and mailto targets. Override it once and the chrome stays coherent.",
        ],
      },
      {
        heading: "Environment overrides",
        body: [
          "Set these in the host app (.env.local or your deploy env). They are public by design: they appear in the client bundle.",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: `NEXT_PUBLIC_SITE_NAME=Acme
NEXT_PUBLIC_SITE_DOMAIN=acme.test
NEXT_PUBLIC_SITE_EMAIL=hello@acme.test
NEXT_PUBLIC_SITE_URL=https://acme.test
NEXT_PUBLIC_SITE_TAGLINE=Ship faster with Acme`,
          },
        ],
      },
      {
        heading: "Props for one-off sections",
        body: [
          "Sections like HomeWho and MadeWithEmbed also accept brand props when you need a local override without changing the whole host. Prefer env for site-wide chrome; use props for demos and A/B experiments.",
          "Logo mark defaults through BrandLogo to getBrand().name. Pass title or name when a single mount should differ.",
        ],
      },
      {
        heading: "What not to rebrand by accident",
        body: [
          "Modules under atroui/content/* are optional portfolio / studio sample data. They may still mention demo brands on purpose. Skip those modules when you ship your own product. Do not treat them as the source of truth for chrome.",
          "Visual tokens (colors, glass, type) are separate from getBrand(). Override CSS variables for look; override getBrand() for name and domain. See [dark-first tokens](/blog/dark-first-design-tokens).",
        ],
      },
      {
        heading: "Assets and the Made-with badge",
        body: [
          "Brand kit downloads and voice notes live on the [Brand kit](/docs/brand) page. The Made-with embed and related media ship with the package so consumer apps do not 404 on docs-only /public paths.",
        ],
      },
      {
        heading: "Ship the rebrand",
        body: [
          "Set the env vars, restart the Next server, confirm the wordmark and mailto. Then walk the [Installation](/docs/installation) checklist once so ThemeProvider and globals are still wired.",
          "Lower switching cost for your own clients: document which NEXT_PUBLIC_SITE_* keys you support and keep demo content out of the default import path.",
        ],
      },
    ],
  },
  {
    slug: "atroui-vs-shadcn",
    title: "AtroUI vs shadcn/ui: production sections on the same ownership model",
    description:
      "Both use the shadcn CLI. AtroUI ships production sections and brand chrome; shadcn/ui-style kits optimize for blank-slate primitives.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "shadcn/ui and similar kits are excellent at one job: generate accessible primitives into your repo so you own every line. AtroUI uses the same CLI and ownership model, aimed at a different altitude: production sections and brand chrome that already look like a shipped product.",
          "This is not a replacement pitch. It is a hiring decision: which catalog matches how you ship.",
        ],
      },
      {
        heading: "Same CLI, different catalog",
        body: [
          "You run the shadcn CLI either way. Components land in your monorepo. You customize freely. Updates are merges you control.",
          "Choose a blank-slate kit when you are building a long-term internal design system from atoms. Choose AtroUI when you want heroes, who bands, footers, and CTAs with editable CONTENT on day one.",
        ],
      },
      {
        heading: "AtroUI: sections that ship",
        body: [
          "Add @atroui/home-hero, open the file, edit CONTENT. Brand defaults resolve through getBrand(). Tokens are dark-first.",
          "Choose this when you want speed to a coherent dark UI, marketing + app chrome that share one system, and optional Host API tools that call your backends with BYOK.",
        ],
      },
      {
        heading: "Side-by-side differences",
        body: [
          "Distribution: both copy files into your repo via the CLI.",
          "Altitude: atoms and patterns you assemble vs sections and chrome already composed.",
          "Brand: you build chrome from scratch vs getBrand() + NEXT_PUBLIC_SITE_*.",
          "Theme: often light-first or neutral vs dark-first catalog defaults.",
          "AI / media tools: usually out of scope vs optional workspaces that expect your /api/*.",
        ],
      },
      {
        heading: "You can use both",
        body: [
          "Some teams keep shadcn-style primitives for domain forms and use AtroUI for marketing bands and site chrome. That is valid. Avoid two competing token sheets on the same page without a clear boundary.",
        ],
      },
      {
        heading: "Pick and install",
        body: [
          "Prefer a blank-slate kit if you want every primitive from scratch. Prefer AtroUI if you want a ready dark catalog at [atroui.com](https://www.atroui.com).",
          "Docs: [Compare](/docs/compare). Install: [Installation](/docs/installation). Registry: [Registry](/docs/registry). Positioning: [What is AtroUI?](/blog/what-is-atroui).",
        ],
      },
    ],
  },
  {
    slug: "transpile-packages-turbopack-ui-libraries",
    title: "transpilePackages and Turbopack: UI library install gotchas",
    description:
      "Why Next.js needs transpilePackages for TypeScript UI libraries like AtroUI, common Turbopack errors, and how to fix a fresh App Router install.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "Fresh Next.js apps often fail the first time they import a TypeScript-shipped UI library. The error looks like a package bug. The fix is usually one line in next.config: transpilePackages.",
          "AtroUI ships source that Next must compile with your app. Without transpilePackages: [\"atroui\"], Turbopack and webpack can refuse unknown module types or skip transforming the package.",
        ],
      },
      {
        heading: "The required config",
        body: [
          "Add AtroUI to transpilePackages alongside any other source-shipped packages you consume.",
        ],
        codeBlocks: [
          {
            language: "ts",
            code: `import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["atroui"],
}

export default nextConfig`,
          },
        ],
      },
      {
        heading: "Symptoms you are missing it",
        body: [
          "Unknown module type when importing from atroui.",
          "Unexpected token / TSX parse errors inside node_modules/atroui.",
          "Works in the monorepo docs app but breaks in a clean create-next-app consumer.",
        ],
      },
      {
        heading: "Barrel imports and heavy side paths",
        body: [
          "Prefer documented public exports from registry items you installed. Stick to paths listed in the [Installation](/docs/installation) and [Registry](/docs/registry) guides.",
        ],
      },
      {
        heading: "CSS and peer dependencies",
        body: [
          "If a block needs next-themes or other peers, the CLI installs them. Theme failures usually mean the layout is incomplete. See [ThemeProvider and dark mode](/blog/theme-provider-dark-mode-atroui).",
        ],
      },
      {
        heading: "Checklist",
        body: [
          "components.json includes the @atroui registry",
          "npx shadcn add @atroui/… succeeded",
          "CONTENT / DEFAULT_BRAND edited for your brand",
          "If you use Host APIs: npm i atroui + transpilePackages: [\"atroui\"]",
          "Restart the Next dev server after config changes",
          "Pure registry UI does not require the npm package - see [npm → shadcn registry](/blog/npm-to-shadcn-registry)",
        ],
      },
    ],
  },
  {
    slug: "theme-provider-dark-mode-atroui",
    title: "ThemeProvider and dark mode with AtroUI and next-themes",
    description:
      "Wire dark mode for AtroUI registry components: class strategy, default dark, and tokens so dark-first styles actually apply.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "AtroUI’s tokens assume a class-based dark theme. Whether you use next-themes or your own provider, .dark on the html element is what makes CSS variables resolve correctly.",
          "Skip the provider, or use the wrong attribute, and you get a half-themed app: components render, but backgrounds and brand colors miss the dark sheet.",
        ],
      },
      {
        heading: "Install the peer if needed",
        body: [
          "If you add @atroui/theme-toggle or similar, the CLI may pull next-themes. Install it if your layout does not already have it.",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: "npm install next-themes",
          },
        ],
      },
      {
        heading: "Recommended provider setup",
        body: [
          "Use attribute=\"class\", defaultTheme=\"dark\", and enableSystem if you want OS preference to win when the user has not chosen. suppressHydrationWarning on <html> avoids the classic theme flash warning.",
        ],
        codeBlocks: [
          {
            language: "tsx",
            code: `import { ThemeProvider } from "next-themes"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}`,
          },
        ],
      },
      {
        heading: "Fonts and the dark class",
        body: [
          "Load Outfit with variable: \"--font-outfit\" and put that variable on <html> so display styles match the catalog. You can keep className=\"dark\" on html for first paint while ThemeProvider manages the class afterward.",
          "Full layout snippet: [Install AtroUI in Next.js](/blog/install-atroui-nextjs-app-router).",
        ],
      },
      {
        heading: "Tokens still come from globals",
        body: [
          "ThemeProvider toggles the class. atroui/globals.css defines what .dark means. Import globals once. Override --brand and neutrals in your CSS when you re-skin. See [dark-first tokens](/blog/dark-first-design-tokens) and [Theming](/docs/theming).",
        ],
      },
      {
        heading: "Common mistakes",
        body: [
          "Forgetting next-themes in package.json.",
          "Using data-theme when tokens expect .dark.",
          "Importing globals in a leaf component instead of the root layout.",
          "Expecting light-first defaults. AtroUI is dark-first; light is the alternate.",
        ],
      },
    ],
  },
  {
    slug: "why-dark-first-design-systems",
    title: "Why dark-first design systems age better for product UIs",
    description:
      "Light-first dark mode is a retrofit. Dark-first tokens, surfaces, and type (like AtroUI) stay coherent as product UIs grow.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "Many design systems start in light mode, ship a product, then bolt on dark mode under deadline. The result is inverted grays, glowing borders that never existed in light, and components that look correct in only one theme.",
          "Dark-first systems invert that sequence. They design for the canvas users stare at for hours, then add light if needed. AtroUI follows that path for Next.js product UIs.",
        ],
      },
      {
        heading: "Product UI is not a marketing brochure",
        body: [
          "Marketing sites often want bright air and photography. Creator tools, dashboards, IDEs, and AI workspaces usually want focus: low luminance, clear hierarchy, accent color used sparingly.",
          "When your system is light-first, every new dark panel is a translation problem. When your system is dark-first, new panels inherit the native language.",
        ],
      },
      {
        heading: "Tokens that mean what they say",
        body: [
          "In a dark-first sheet, --background is black on purpose. --brand is an electric accent on purpose. Glass utilities assume a dark underlay. You spend less time fighting contrast hacks.",
          "AtroUI encodes that in atroui/globals.css and documents the map on [Theming](/docs/theming). The essay-length practice notes are in [Dark-first design tokens](/blog/dark-first-design-tokens).",
        ],
      },
      {
        heading: "Fewer second-order theme bugs",
        body: [
          "Retrofitted dark mode creates second-order bugs: charts that assume white, emails that assume black text, screenshots that look “broken” in the other theme. Starting dark does not eliminate theme bugs. It reduces the class of bugs where dark is the neglected child.",
        ],
      },
      {
        heading: "Coherence compounds",
        body: [
          "A catalog of sections that share one dark language compounds. Heroes, footers, and app chrome feel related without a brand committee meeting. That coherence is hard to retrofit onto a pile of unrelated primitives.",
          "If you want the catalog rather than only the argument, [install AtroUI](/docs/installation) and skim [What is AtroUI?](/blog/what-is-atroui).",
        ],
      },
    ],
  },
  {
    slug: "shipping-component-library-npm",
    title: "Lessons from shipping AtroUI (registry + package internals)",
    description:
      "Practical lessons from shipping AtroUI: shadcn registry for consumers, peers, CSS entrypoints, and keeping demo content off the public path.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "Consumers add AtroUI through the shadcn registry. Behind that, the docs site and catalog still need a clean package boundary, peers, and assets that do not 404 in the wild.",
          "Here are the lessons worth stealing if you are building a similar catalog.",
        ],
      },
      {
        heading: "Lead with the registry for consumers",
        body: [
          "The happy path is `npx shadcn add @atroui/…`. Document that first. Package internals matter for the docs host and for maintainers - not as the primary install story. See [Installation](/docs/installation).",
        ],
      },
      {
        heading: "Peers must be real peers",
        body: [
          "Theme bridges like next-themes belong in peerDependencies (or CLI-installed deps) with install instructions. Soft-assuming the docs app’s dependencies exist in the consumer is how you get “works on my machine” libraries.",
        ],
      },
      {
        heading: "One CSS entrypoint for tokens",
        body: [
          "Whether tokens ship via a stylesheet you copy or a shared theme file, consumers should import once. Do not rely on monorepo-only @source paths that resolve in the docs app and break outside it.",
        ],
      },
      {
        heading: "Media used by components must travel with them",
        body: [
          "If a component references /images/founder-portrait.png and that file only exists in the docs public/ folder, every consumer gets a 404. Bundle assets with registry items or the package, or do not ship the component as public API.",
        ],
      },
      {
        heading: "Keep demo content off the default barrel",
        body: [
          "Portfolio MDX, journal loaders, and studio sample data are fine for docs demos. They are poison on the main export if they pull unknown module types into Turbopack. Split registries from loaders; let consumers opt into content.",
        ],
      },
      {
        heading: "Brand defaults need an escape hatch",
        body: [
          "Defaulting chrome to your brand is correct for your site. Consumers need getBrand()-style overrides and env keys on day one. Otherwise every install ships with your logo text until someone forks.",
          "AtroUI’s approach: [Rebrand with getBrand()](/blog/rebrand-with-getbrand).",
        ],
      },
      {
        heading: "Install docs are part of the product",
        body: [
          "A four-step quickstart with copy-paste CLI commands beats a beautiful catalog that nobody can mount. Keep [Installation](/docs/installation) and the [install blog post](/blog/install-atroui-nextjs-app-router) aligned with the live registry.",
        ],
      },
    ],
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
