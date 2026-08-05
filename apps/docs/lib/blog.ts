export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  /** Short body sections for the post page */
  sections: { heading?: string; body: string[] }[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-atroui",
    title: "What is AtroUI?",
    description:
      "AtroUI is a production React / Next.js component library and dark-first design system at atroui.com. Install with npm i atroui.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "AtroUI is a React and Next.js component library - a dark-first design system with production primitives, page sections, and optional host-bound tools. The canonical home is atroui.com; the package on npm is atroui.",
          "It is not a fork of a copy-paste kit. Components ship as a real catalog shaped by apps that already use them: site chrome, marketing bands, SEO helpers, and AI-adjacent workspaces that expect your own /api routes (BYOK).",
        ],
      },
      {
        heading: "Who it is for",
        body: [
          "Teams and indie makers building Next.js products who want a coherent dark UI system - tokens, glass surfaces, and sections - without rebuilding chrome from scratch.",
        ],
      },
      {
        heading: "Get started",
        body: [
          "Install with npm i atroui, import atroui/globals.css, wrap with ThemeProvider, and browse the docs catalog. Brand chrome defaults to AtroUI via getBrand(); override with NEXT_PUBLIC_SITE_* when you rebrand.",
        ],
      },
    ],
  },
  {
    slug: "install-atroui-nextjs-app-router",
    title: "Install AtroUI in a Next.js App Router project",
    description:
      "Step-by-step: add the atroui npm package to a Next.js App Router app, load globals.css, ThemeProvider, and Outfit.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "AtroUI targets Next.js 15+ and React 18/19. Peer dependency: next-themes.",
        ],
      },
      {
        heading: "1. Install",
        body: ["Run npm install atroui (or pnpm add atroui / yarn add atroui)."],
      },
      {
        heading: "2. Styles and theme",
        body: [
          "Import atroui/globals.css once in your root layout. Wrap the tree with ThemeProvider from atroui (attribute=\"class\", enableSystem).",
          "Load Outfit (or your display font) and expose --font-outfit on the document for display type to match the docs.",
        ],
      },
      {
        heading: "3. First component",
        body: [
          "import { Button } from \"atroui\" and render a primary action. Then explore sections and headless SEO modules in the catalog.",
          "Full detail: the Installation guide on atroui.com/docs/installation.",
        ],
      },
    ],
  },
  {
    slug: "dark-first-design-tokens",
    title: "Dark-first design tokens in AtroUI",
    description:
      "How AtroUI tokens work - black canvas, electric blue brand (#0b7bff), glass surfaces - and where to customize them.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "AtroUI’s visual system is dark-first: canvas near black, brand blue #0b7bff, cyan mist accents, glass panels (ms-panel / md-glass), and rounded-full CTAs.",
          "Tokens live in atroui/globals.css (CSS variables under :root and .dark). Host apps import that stylesheet; they do not need a separate Tailwind theme file for the catalog tokens.",
        ],
      },
      {
        heading: "Customize",
        body: [
          "Override --brand and related variables after importing globals, or fork tokens for a white-label product. Prefer getBrand() for name/domain/email chrome rather than hardcoding strings.",
          "See Theming docs for the current token map.",
        ],
      },
    ],
  },
  {
    slug: "rebrand-with-getbrand",
    title: "Rebranding AtroUI chrome with getBrand()",
    description:
      "Override AtroUI logo text, SEO, and mail defaults with NEXT_PUBLIC_SITE_* or component props - keep demo content separate.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "Product chrome (logo wordmark, headers, footers, JSON-LD defaults, mailto) resolves through getBrand() in atroui/lib/brand. Defaults point at AtroUI / atroui.com.",
        ],
      },
      {
        heading: "Environment overrides",
        body: [
          "Set NEXT_PUBLIC_SITE_NAME, NEXT_PUBLIC_SITE_DOMAIN, NEXT_PUBLIC_SITE_EMAIL, NEXT_PUBLIC_SITE_URL, and optionally NEXT_PUBLIC_SITE_TAGLINE in the host app.",
        ],
      },
      {
        heading: "Props vs content/",
        body: [
          "Sections like HomeWho and MadeWithEmbed also accept brand props for one-off overrides. Modules under atroui/content/* are optional portfolio demos - skip them when shipping your own product.",
          "Brand assets and the Made with badge are documented on the Brand kit page.",
        ],
      },
    ],
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
