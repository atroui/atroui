import createMDX from "@next/mdx"
import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  transpilePackages: ["atroui", "@shadergradient/react"],
  poweredByHeader: false,
  // Monorepo root (not parent ~/package-lock.json) so fonts + native deps resolve.
  outputFileTracingRoot: path.join(__dirname, "../.."),
  // Native Node addons used by OG/thumbnail compose - do not webpack-bundle.
  serverExternalPackages: [
    "@resvg/resvg-js",
    "@resvg/resvg-js-linux-x64-gnu",
    "sharp",
  ],
  outputFileTracingIncludes: {
    "/api/generate": [
      "./node_modules/atroui/src/lib/og/fonts/**/*",
      "../../packages/ui/src/lib/og/fonts/**/*",
    ],
    "/api/thumbnail": [
      "./node_modules/atroui/src/lib/og/fonts/**/*",
      "../../packages/ui/src/lib/og/fonts/**/*",
    ],
  },
  env: {
    // Docs site ships the portrait under public/; consumer apps omit this.
    NEXT_PUBLIC_FOUNDER_AVATAR: "/images/founder-portrait.png",
  },
  experimental: {
    viewTransition: true,
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
        source:
          "/:file(favicon.ico|favicon-48.png|favicon-96.png|favicon-192.png|apple-touch-icon.png|icon-512.png|icon.png|icon.svg|site.webmanifest)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/brand/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
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
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      atroui: path.resolve(__dirname, "../../packages/ui/src"),
    }
    if (isServer) {
      const nativeExternals = {
        "@resvg/resvg-js": "commonjs @resvg/resvg-js",
        sharp: "commonjs sharp",
      }
      if (Array.isArray(config.externals)) {
        config.externals.push(nativeExternals)
      } else if (typeof config.externals === "function") {
        const prev = config.externals
        config.externals = async (
          ...args: Parameters<NonNullable<typeof prev>>
        ) => {
          const result = await prev(...args)
          if (Array.isArray(result)) return [...result, nativeExternals]
          if (typeof result === "object" && result !== null) {
            return { ...result, ...nativeExternals }
          }
          return result ?? nativeExternals
        }
      } else if (config.externals && typeof config.externals === "object") {
        config.externals = { ...config.externals, ...nativeExternals }
      } else {
        config.externals = [nativeExternals]
      }
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
