import { ComponentDoc } from "@/components/component-doc"
import { DemoDialog } from "@/components/registry-demos"


export function UiDialogDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-dialog"
      registryName="dialog"
      title="Dialog"
      description="Modal dialog on Base UI with Mira surfaces and short settle motion."
      preview={<DemoDialog />}
      code={`import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger render={<Button />}>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Rename project</DialogTitle>
      <DialogDescription>One primary action on this surface.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
      <DialogClose render={<Button />}>Save</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
      fullBleed={false}
      usage="Open dialogs for a single focused task. Prefer a short title, one sentence of context, and a clear primary action. Escape and the close control always dismiss."
    />
  )
}
