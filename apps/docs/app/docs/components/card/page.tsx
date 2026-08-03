import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { CardDemo } from "@/components/demos"

export const metadata: Metadata = {
  title: "Card",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Card"
      description="Container for grouping related content and actions."
      preview={<CardDemo />}
      code={"import {\n  Card, CardHeader, CardTitle, CardDescription,\n  CardContent, CardFooter, Button\n} from \"@meridian/ui\"\n\nexport function Example() {\n  return (\n    <Card>\n      <CardHeader>\n        <CardTitle>Title</CardTitle>\n        <CardDescription>Subtitle</CardDescription>\n      </CardHeader>\n      <CardContent>Body</CardContent>\n      <CardFooter>\n        <Button>Action</Button>\n      </CardFooter>\n    </Card>\n  )\n}"}
      usage="Cards are for interactive groupings. Avoid nesting cards or using them purely for decoration."
      props={[
    { name: "className", type: "string", default: "—", description: "Additional Tailwind classes on the root." },
      ]}
    />
  )
}
