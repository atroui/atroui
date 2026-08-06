import type { Metadata, Viewport } from "next"
import { Geist_Mono, Outfit } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "atroui/globals.css"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
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
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#0a0a0a" },
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
  // Stable favicon URLs for Google SERP (needs >=48x48 + /favicon.ico).
  // Avoid relying only on hashed /icon?... routes from the App Router.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  category: "technology",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-[100svh] bg-background text-foreground">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
