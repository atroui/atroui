import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import {
  DemoCard,
  DemoCardCompactMedia,
  DemoCardFooterActions,
} from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Card",
  "/docs/components/ui-card",
  "Elevated surface for grouped content - header, body, footer slots."
)

export default function Page() {
  return (
    <ComponentDoc
      registryName="card"
      href="/docs/components/ui-card"
      title="Card"
      description="Elevated surface for grouped content - header, body, footer slots."
      preview={<DemoCard />}
      code={'import {\n  Card,\n  CardHeader,\n  CardTitle,\n  CardDescription,\n  CardContent,\n  CardFooter,\n} from "@/components/ui/card"\nimport { Button } from "@/components/ui/button"\n\n<Card>\n  <CardHeader>\n    <CardTitle>Project Alpha</CardTitle>\n    <CardDescription>Shipped this week</CardDescription>\n  </CardHeader>\n  <CardContent>Body copy</CardContent>\n  <CardFooter>\n    <Button size="sm">Open</Button>\n  </CardFooter>\n</Card>'}
      fullBleed={false}
      usage="Use Card when a group of content is acted on as a unit - a project, a plan, a record. For static marketing sections, plain layout reads calmer than a boxed surface."
      examples={[
        {
          title: "Header action and footer actions",
          tip: "CardAction pins a control to the top-right of the header - the header switches to a two-column grid on its own. CardFooter already draws the divider and muted band, so it only needs alignment classes.",
          preview: <DemoCardFooterActions />,
          code: `import { MoreHorizontal } from "lucide-react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Deploy preview</CardTitle>
    <CardDescription>atroui-docs · main</CardDescription>
    <CardAction>
      <Button size="icon-sm" variant="ghost" aria-label="Deploy options">
        <MoreHorizontal />
      </Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">
      Build finished in 42s. No checks failed.
    </p>
  </CardContent>
  <CardFooter className="justify-between">
    <span className="text-xs text-muted-foreground">2 minutes ago</span>
    <div className="flex gap-2">
      <Button size="sm" variant="ghost">Logs</Button>
      <Button size="sm">Visit</Button>
    </div>
  </CardFooter>
</Card>`,
        },
        {
          title: "Compact media",
          tip: 'An <img> as the first child goes edge to edge - Card drops its top padding and rounds the image corners for you, so no wrapper is needed. Pair it with size="sm" for grid tiles.',
          preview: <DemoCardCompactMedia />,
          code: `import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

<Card size="sm" className="w-full max-w-[240px]">
  <img
    src="/examples/product-launch.png"
    alt=""
    width={1200}
    height={630}
    className="aspect-2/1 w-full object-cover"
  />
  <CardHeader>
    <CardTitle>Product launch</CardTitle>
    <CardDescription>Shipped Sep 2</CardDescription>
  </CardHeader>
</Card>`,
        },
      ]}
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
