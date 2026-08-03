import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DialogDemo } from "@/components/demos"

export const metadata: Metadata = {
  title: "Dialog",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Dialog"
      description="Modal dialog for focused tasks and confirmations."
      preview={<DialogDemo />}
      code={"import {\n  Dialog, DialogTrigger, DialogContent,\n  DialogHeader, DialogTitle, DialogDescription, Button\n} from \"@meridian/ui\"\n\nexport function Example() {\n  return (\n    <Dialog>\n      <DialogTrigger asChild>\n        <Button>Open</Button>\n      </DialogTrigger>\n      <DialogContent>\n        <DialogHeader>\n          <DialogTitle>Title</DialogTitle>\n          <DialogDescription>Description</DialogDescription>\n        </DialogHeader>\n      </DialogContent>\n    </Dialog>\n  )\n}"}
      usage="Use dialogs sparingly. Always include a title and description. Prefer non-blocking patterns when possible."
      props={[
    { name: "open", type: "boolean", default: "—", description: "Controlled open state." },
    { name: "defaultOpen", type: "boolean", default: "—", description: "Uncontrolled initial state." },
    { name: "onOpenChange", type: "(open) => void", default: "—", description: "Called when open state changes." },
      ]}
    />
  )
}
