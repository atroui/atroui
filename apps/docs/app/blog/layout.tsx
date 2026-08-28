import { Merriweather } from "next/font/google"
import { SiteChrome } from "@/components/app-shell"

/** Screen-optimized serif for long-form posts — paired with Outfit headings. */
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
  display: "swap",
})

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={merriweather.variable}>
      <SiteChrome>{children}</SiteChrome>
    </div>
  )
}
