import createMDX from "@next/mdx"
import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  transpilePackages: ["@meridian/ui"],
  experimental: {
    optimizePackageImports: ["@meridian/ui", "lucide-react"],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@meridian/ui": path.resolve(__dirname, "../../packages/ui/src"),
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
