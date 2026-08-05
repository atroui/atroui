declare module "*.png" {
  import type { StaticImageData } from "next/image"
  const asset: StaticImageData
  export default asset
}

declare module "*.jpg" {
  import type { StaticImageData } from "next/image"
  const asset: StaticImageData
  export default asset
}

declare module "*.jpeg" {
  import type { StaticImageData } from "next/image"
  const asset: StaticImageData
  export default asset
}

declare module "*.webp" {
  import type { StaticImageData } from "next/image"
  const asset: StaticImageData
  export default asset
}

declare module "*.svg" {
  const asset: string
  export default asset
}
