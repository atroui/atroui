import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoCard } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Card",
  "/docs/components/ui-card"
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/ui-card"
      title="Card"
      description="Elevated surface for grouped content - header, body, footer slots."
      preview={<DemoCard />}
      code={'import {\n  Card,\n  CardHeader,\n  CardTitle,\n  CardDescription,\n  CardContent,\n  CardFooter,\n} from "@/components/ui/card"\nimport { Button } from "@/components/ui/button"\n\n<Card>\n  <CardHeader>\n    <CardTitle>Project Alpha</CardTitle>\n    <CardDescription>Shipped this week</CardDescription>\n  </CardHeader>\n  <CardContent>Body copy</CardContent>\n  <CardFooter>\n    <Button size="sm">Open</Button>\n  </CardFooter>\n</Card>'}
      fullBleed={false}
      usage="Use Card when the surface itself is the interaction container. Prefer plain sections for static marketing layout."
      props={[
        {
          name: "size",
          type: "'default' | 'sm'",
          default: "'default'",
          description: "Density.",
        },
        {
          name: "className",
          type: "string",
          default: "-",
          description: "Extra classes (e.g. border-brand/30).",
        },
      ]}
    />
  )
}
