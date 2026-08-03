import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
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

export default nextConfig
