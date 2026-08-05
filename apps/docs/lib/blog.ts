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
    slug: "what-is-atroui",
    title: "What is AtroUI? A Next.js component library that ships as a package",
    description:
      "AtroUI is a dark-first React / Next.js component library on npm. Production sections, brand chrome, and tokens, not another copy-paste kit. Install with npm i atroui.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "AtroUI is a production React and Next.js component library. You install it like any other dependency (npm i atroui) and get a dark-first design system: tokens, site chrome, marketing sections, SEO helpers, and optional host-bound tools that call your own APIs.",
          "The canonical home is [atroui.com](https://www.atroui.com). The package on npm is atroui. Docs, compare notes, and this blog all live under that brand so search results point somewhere real.",
        ],
      },
      {
        heading: "The job it is hired for",
        body: [
          "Most teams do not want to rebuild a hero, footer, theme provider, and OG workspace from scratch for every product. They want a coherent dark UI that already looks like a shipped app, then they customize brand and content.",
          "That is the job AtroUI is built for. You hire it to get from empty App Router project to a branded dark surface without assembling fifty primitives into a design system yourself.",
        ],
      },
      {
        heading: "Not a fork of a copy-paste kit",
        body: [
          "Copy-paste kits optimize for owning every file in your repo. That is a strong workflow when you are building a greenfield design system you will maintain forever.",
          "AtroUI optimizes for a different path: a versioned npm package with a catalog shaped by products that already use it. Sections (heroes, who bands, CTAs, footers), brand chrome via getBrand(), and Host API tools (OG, thumbnails, scope) that expect your own /api routes and BYOK keys.",
          "You can still fork or copy when you need full ownership. Day one, you consume a dependency. See [AtroUI vs copy-paste kits](/docs/compare) and the deeper [AtroUI vs shadcn/ui](/blog/atroui-vs-shadcn) post.",
        ],
      },
      {
        heading: "Who it is for",
        body: [
          "Indie makers and small teams shipping Next.js products who want a dark-first system (black canvas, brand blue, glass surfaces) without spending a sprint on chrome.",
          "Agencies and studios rebranding a catalog for client work via NEXT_PUBLIC_SITE_* and getBrand(), while skipping optional portfolio demo content under atroui/content/*.",
          "Builders who want SEO helpers and AI-adjacent workspaces that do not burn shared LLM keys on the docs host.",
        ],
      },
      {
        heading: "What you get in the box",
        body: [
          "Design tokens and utilities in atroui/globals.css, dark-first by default.",
          "ThemeProvider (peer: next-themes), Button and other primitives, page sections, JSON-LD helpers, and brandable logo/chrome.",
          "Bundled media for components that need images (founder portrait, OG examples, Made-with badge) so consumers are not left with 404s on /public paths.",
        ],
      },
      {
        heading: "Get started in one path",
        body: [
          "Install atroui and next-themes, add transpilePackages: [\"atroui\"], import globals, wrap with ThemeProvider, load Outfit as --font-outfit, then import a component.",
          "Full steps live on the [Installation guide](/docs/installation). For a walkthrough with copy-paste snippets, read [Install AtroUI in a Next.js App Router project](/blog/install-atroui-nextjs-app-router).",
        ],
      },
    ],
  },
  {
    slug: "install-atroui-nextjs-app-router",
    title: "Install AtroUI in a Next.js App Router project (step-by-step)",
    description:
      "Add atroui to Next.js 15+: npm i atroui next-themes, transpilePackages, ThemeProvider, Outfit, and atroui/globals.css. Copy-paste snippets included.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "This guide gets AtroUI running in a Next.js App Router app with the least friction. Target: Next.js 15+, React 18/19, Tailwind CSS v4. Peer dependency: next-themes.",
          "When you finish the four steps below, you should see a themed page with an AtroUI Button. Deeper detail always lives on the [Installation docs](/docs/installation).",
        ],
      },
      {
        heading: "1. Install packages",
        body: [
          "Install the published package and its theme peer. Use npm, pnpm, or yarn. Same package name.",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: "npm install atroui next-themes",
          },
        ],
      },
      {
        heading: "2. Transpile AtroUI",
        body: [
          "AtroUI ships TypeScript source. Next.js (and Turbopack) need it listed in transpilePackages. Skip this and you get module-type or transpile errors in a fresh app.",
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
        heading: "3. Wire the root layout",
        body: [
          "Import atroui/globals.css once. Load Outfit and expose --font-outfit so display type matches the catalog. Wrap the tree with ThemeProvider from atroui (attribute=\"class\", enableSystem).",
        ],
        codeBlocks: [
          {
            language: "tsx",
            code: `import type { Metadata } from "next"
import { Outfit, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "atroui"
import "atroui/globals.css"

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "My app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={\`\${outfit.variable} \${geistMono.variable} dark\`}
      suppressHydrationWarning
    >
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
        heading: "4. Render a first component",
        body: [
          "Import from the package root and drop a Button on a page. Default App Router pages need a default export.",
        ],
        codeBlocks: [
          {
            language: "tsx",
            code: `import { Button } from "atroui"

export default function Page() {
  return (
    <main className="p-10">
      <Button>Get started</Button>
    </main>
  )
}`,
          },
        ],
      },
      {
        heading: "What you do not need to copy",
        body: [
          "Component images (founder portrait, OG examples, Made-with badge) ship inside the npm package. You do not need to mirror those files into /public for those components to render. Optional raw assets are also exported from atroui/assets/* if you want them on a CDN path.",
          "Studio sample data under atroui/content/* is optional portfolio copy. Skip it when you are shipping your own product.",
        ],
      },
      {
        heading: "Next steps",
        body: [
          "Customize tokens on the [Theming](/docs/theming) page. Override logo and SEO chrome with [getBrand()](/blog/rebrand-with-getbrand). Browse the full [component catalog](/docs).",
          "Stuck on transpile or Turbopack? Read [transpilePackages and Turbopack gotchas](/blog/transpile-packages-turbopack-ui-libraries).",
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
    title: "AtroUI vs shadcn/ui: package catalog vs copy-paste primitives",
    description:
      "When to use AtroUI as an npm component library versus shadcn/ui-style copy-paste kits: ownership, sections, brand chrome, and dark-first tokens.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "shadcn/ui and similar kits are excellent at one job: generate accessible primitives into your repo so you own every line. AtroUI is excellent at a different job: consume a versioned dark-first catalog with production sections and brand chrome.",
          "This is not a replacement pitch. It is a hiring decision: which tool matches how you ship.",
        ],
      },
      {
        heading: "Copy-paste kits: own the files",
        body: [
          "You run a CLI, components land in your monorepo, and you customize freely. Updates are merges you control. The visual slate is often neutral so your design system can grow on top.",
          "Choose this when every file must live in-tree, when you are building a long-term internal design system, or when your brand language is nothing like a dark glass catalog.",
        ],
      },
      {
        heading: "AtroUI: install the catalog",
        body: [
          "You npm install atroui, transpile it, import globals, and compose sections that already look like a shipped product. Brand defaults resolve through getBrand(). Tokens are dark-first.",
          "Choose this when you want speed to a coherent dark UI, marketing + app chrome that share one system, and optional Host API tools that call your backends with BYOK.",
        ],
      },
      {
        heading: "Side-by-side differences",
        body: [
          "Distribution: kit files in your repo vs atroui on npm.",
          "Altitude: atoms and patterns you assemble vs sections and chrome already composed.",
          "Brand: you build chrome from scratch vs getBrand() + NEXT_PUBLIC_SITE_*.",
          "Theme: often light-first or neutral vs dark-first tokens in atroui/globals.css.",
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
          "Prefer a kit if you want full file ownership and a blank visual slate. Prefer AtroUI if you want a ready dark catalog and brandable chrome at [atroui.com](https://www.atroui.com).",
          "Docs compare page: [AtroUI vs copy-paste kits](/docs/compare). Install: [Installation](/docs/installation). Positioning: [What is AtroUI?](/blog/what-is-atroui).",
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
          "Prefer documented public exports. If a library accidentally pulls MDX loaders or Node-only code into the main barrel, Turbopack will complain even with transpilePackages set. AtroUI keeps article loaders off the default consumer path for that reason.",
          "If you hit a module-type error on a specific subpath, check whether you imported a docs-only entry. Stick to the root package export and paths listed in the [Installation](/docs/installation) guide.",
        ],
      },
      {
        heading: "CSS and peer dependencies",
        body: [
          "transpilePackages does not replace importing atroui/globals.css or installing next-themes. Theme and token failures after a clean transpile fix usually mean the layout is incomplete. See [ThemeProvider and dark mode](/blog/theme-provider-dark-mode-atroui).",
        ],
      },
      {
        heading: "Checklist",
        body: [
          "npm i atroui next-themes",
          "transpilePackages includes atroui",
          "Root layout imports globals and ThemeProvider",
          "Page has a default export",
          "Restart the Next dev server after config changes",
        ],
      },
    ],
  },
  {
    slug: "theme-provider-dark-mode-atroui",
    title: "ThemeProvider and dark mode with AtroUI and next-themes",
    description:
      "Wire AtroUI’s ThemeProvider with next-themes: class strategy, default dark, Outfit, and globals.css so dark-first tokens actually apply.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "AtroUI’s tokens assume a class-based dark theme. ThemeProvider from atroui wraps next-themes so .dark lands on the html element and CSS variables resolve correctly.",
          "Skip the provider, or use the wrong attribute, and you get a half-themed app: components render, but backgrounds and brand colors miss the dark sheet.",
        ],
      },
      {
        heading: "Install the peer",
        body: [
          "next-themes is a peer dependency. Install it next to atroui.",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: "npm install atroui next-themes",
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
            code: `import { ThemeProvider } from "atroui"
import "atroui/globals.css"

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
    title: "Shipping a React component library as an npm package (lessons from AtroUI)",
    description:
      "Practical lessons from publishing AtroUI: transpilePackages, peer deps, CSS entrypoints, bundled media, and keeping demo content off the consumer path.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "Publishing a component library is not the same as having a docs site that imports local source. Consumers run a different Next config, a clean node_modules tree, and zero knowledge of your monorepo conventions.",
          "AtroUI’s publish path taught a few lessons the hard way. Here are the ones worth stealing.",
        ],
      },
      {
        heading: "Document transpilePackages if you ship TS source",
        body: [
          "If the package is TypeScript/TSX source, Next consumers need transpilePackages. Put it in the README and the first install step, not in a troubleshooting footnote. See [transpilePackages gotchas](/blog/transpile-packages-turbopack-ui-libraries).",
        ],
      },
      {
        heading: "Peers must be real peers",
        body: [
          "Theme bridges like next-themes belong in peerDependencies with install instructions. Soft-assuming the docs app’s dependencies exist in the consumer is how you get “works on my machine” libraries.",
        ],
      },
      {
        heading: "One CSS entrypoint",
        body: [
          "Ship a single globals stylesheet consumers import once. Do not rely on monorepo-only @source paths that resolve in the docs app and 404 in the wild. Tokens and utilities should travel with the package.",
        ],
      },
      {
        heading: "Media used by components must ship with the package",
        body: [
          "If a component references /images/founder-portrait.png and that file only exists in the docs public/ folder, every consumer gets a 404. Bundle assets in the package and resolve URLs for consumers, or do not ship the component as public API.",
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
          "A four-step quickstart with copy-paste config beats a beautiful catalog that nobody can mount. Keep [Installation](/docs/installation) and the [install blog post](/blog/install-atroui-nextjs-app-router) aligned with what npm actually publishes.",
        ],
      },
    ],
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
