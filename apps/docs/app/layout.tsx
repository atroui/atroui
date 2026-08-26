import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteFrame } from "@/components/site/frame"
import "atroui/globals.css"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  axes: ["opsz"],
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

/** Canonical host matches production (apex → www). */
const siteUrl = "https://www.atroui.com"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#212223" },
    { media: "(prefers-color-scheme: light)", color: "#f6f6f4" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AtroUI - React Component Library & Dark Design System",
    template: "%s · AtroUI",
  },
  description:
    "AtroUI (atroui.com) is a dark-first React and Next.js component catalog - production sections via the shadcn registry. Own the source in your repo.",
  applicationName: "AtroUI",
  authors: [{ name: "AtroUI", url: siteUrl }],
  creator: "AtroUI",
  publisher: "AtroUI",
  keywords: [
    "AtroUI",
    "atroui",
    "atroui.com",
    "React component library",
    "Next.js components",
    "design system",
    "dark UI",
    "Tailwind components",
    "UI kit",
    "shadcn registry",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "AtroUI",
    title: "AtroUI - React Component Library & Dark Design System",
    description:
      "Dark-first React / Next.js component catalog at atroui.com. Add with the shadcn CLI - own the source.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtroUI - React Component Library",
    description:
      "Dark-first React / Next.js components at atroui.com. Add with the shadcn CLI.",
    site: "@iamk",
    creator: "@iamk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Google SERP favicon: square PNG ≥48 first (crawlable, stable URL).
  // ICO must include ≥48 frames — Google still probes /favicon.ico by convention.
  // SVG last for crisp browser tabs; do not claim false sizes on the ICO.
  icons: {
    icon: [
      {
        url: "/favicon-96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        url: "/favicon-48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        url: "/favicon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48 64x64 96x96 128x128 256x256" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: ["/favicon-96.png"],
  },
  manifest: "/site.webmanifest",
  category: "technology",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="paper"
          enableSystem={false}
          disableTransitionOnChange={false}
          themes={["paper", "atro", "ink", "dawn", "light", "dark", "system"]}
          value={{
            paper: "theme-paper",
            light: "theme-paper",
            system: "theme-paper",
            dawn: "theme-dawn",
            atro: "theme-atro",
            dark: "theme-atro",
            ink: "theme-ink",
          }}
        >
          <div className="relative min-h-svh bg-background text-foreground">
            <SiteFrame>{children}</SiteFrame>
          </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
