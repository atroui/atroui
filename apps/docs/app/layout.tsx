import type { Metadata } from "next"
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AtroUI - React Component Library & Dark Design System",
    template: "%s · AtroUI",
  },
  description:
    "AtroUI (atroui.com) is a dark-first React and Next.js component library - production UI primitives, page sections, OG tools, and SEO helpers. Install with npm i atroui.",
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
    "npm atroui",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "AtroUI",
    title: "AtroUI - React Component Library & Dark Design System",
    description:
      "Dark-first React / Next.js component catalog at atroui.com. Primitives, sections, tools, and headless SEO modules. npm i atroui.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtroUI - React Component Library",
    description:
      "Dark-first React / Next.js components at atroui.com. Install with npm i atroui.",
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
  category: "technology",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen bg-background text-foreground">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
