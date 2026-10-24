import type { Metadata, Viewport } from "next"
import { Caveat, DM_Sans, Geist_Mono, Instrument_Serif, Merriweather, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { THEME_BOOT_SCRIPT } from "atroui"
import { ThemeProvider } from "@/components/theme-provider"
import "atroui/globals.css"
import "./globals.css"

/** shadcn Mira preset: Merriweather headings · DM Sans base · Geist Mono code */
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

/** Canonical host matches production (apex → www). */
const siteUrl = "https://www.atroui.com"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1c1c1f" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AtroUI — Add the section. Own the room.",
    template: "%s · AtroUI",
  },
  description:
    "Dark-first React and Next.js sections via the official shadcn registry. Add @atroui/…, edit CONTENT, keep Host API keys in your env.",
  applicationName: "AtroUI",
  authors: [{ name: "AtroUI", url: siteUrl }],
  creator: "AtroUI",
  publisher: "AtroUI",
  keywords: [
    "AtroUI",
    "atroui",
    "atroui.com",
    "shadcn registry",
    "shadcn blocks",
    "Next.js sections",
    "dark UI",
    "Tailwind components",
    "Host API",
    "BYOK",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "AtroUI",
    title: "AtroUI — Add the section. Own the room.",
    description:
      "Production sections via the official shadcn registry. Add @atroui/…, edit CONTENT, own the files.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtroUI — Add the section. Own the room.",
    description:
      "Dark-first sections for React and Next.js. Add with the shadcn CLI. Own the source.",
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
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }}
        />
      </head>
      <body
        className={`${merriweather.variable} ${dmSans.variable} ${geistMono.variable} ${caveat.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-svh bg-background text-foreground">
            {children}
          </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
