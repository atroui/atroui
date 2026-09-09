import { ComponentDoc } from "@/components/component-doc"
import { DemoAlertDialog } from "@/components/registry-demos"


export function UiAlertDialogDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-alert-dialog"
      registryName="alert-dialog"
      title="Alert Dialog"
      description="Confirm destructive or irreversible actions with Base UI Alert Dialog."
      preview={<DemoAlertDialog />}
      code={`import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

<AlertDialog>
  <AlertDialogTrigger render={<Button variant="destructive" />}>Delete</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete this project?</AlertDialogTitle>
      <AlertDialogDescription>Cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
      fullBleed={false}
      usage="Use only when the next click removes data or cannot be undone. Lead with the consequence; keep Cancel easy to reach."
    />
  )
}
