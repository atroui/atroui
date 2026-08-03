import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { SkeletonDemo } from "@/components/demos"

export const metadata: Metadata = {
  title: "Skeleton",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Skeleton"
      description="Placeholder shown while content is loading."
      preview={<SkeletonDemo />}
      code={"import { Skeleton } from \"@meridian/ui\"\n\nexport function Example() {\n  return <Skeleton className=\"h-4 w-[200px]\" />\n}"}
      usage="Match skeleton shapes to the final content layout to reduce layout shift."
      props={[
    { name: "className", type: "string", default: "—", description: "Size and shape via Tailwind utilities." },
      ]}
    />
  )
}
