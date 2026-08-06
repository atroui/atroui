import createMDX from "@next/mdx"
import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  transpilePackages: ["atroui", "@shadergradient/react"],
  poweredByHeader: false,
  env: {
    // Docs site ships the portrait under public/; consumer apps omit this.
    NEXT_PUBLIC_FOUNDER_AVATAR: "/images/founder-portrait.png",
  },
  experimental: {
    optimizePackageImports: [
      "atroui",
      "lucide-react",
      "motion",
      "@phosphor-icons/react",
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        // Registry JSON is public by design - still prevent MIME sniffing / framing
        source: "/r/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Cache-Control",
            value: "public, max-age=300, stale-while-revalidate=86400",
          },
        ],
      },
    ]
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "atroui": path.resolve(__dirname, "../../packages/ui/src"),
    }
    return config
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-autolink-headings",
        { behavior: "wrap", properties: { className: ["heading-anchor"] } },
      ],
    ],
  },
})

export default withMDX(nextConfig)
