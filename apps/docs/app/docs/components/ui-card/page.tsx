import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoCard } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: "Card",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Card"
      description="Elevated surface for grouped content — header, body, footer slots."
      preview={<DemoCard />}
      code={
        'import {\n  Card,\n  CardHeader,\n  CardTitle,\n  CardDescription,\n  CardContent,\n  CardFooter,\n  Button,\n} from "atroui"\n\n<Card>\n  <CardHeader>\n    <CardTitle>Project Alpha</CardTitle>\n    <CardDescription>Shipped this week</CardDescription>\n  </CardHeader>\n  <CardContent>Body copy</CardContent>\n  <CardFooter>\n    <Button size="sm">Open</Button>\n  </CardFooter>\n</Card>'
      }
      fullBleed={false}
      installation='import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "atroui"'
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
          default: "—",
          description: "Extra classes (e.g. border-brand/30).",
        },
      ]}
    />
  )
}
