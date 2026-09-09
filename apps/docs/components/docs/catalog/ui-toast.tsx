import { ComponentDoc } from "@/components/component-doc"
import { DemoToast } from "@/components/registry-demos"

export function UiToastDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-toast"
      registryName="toast"
      title="Toast"
      description="Edge toast stack with opacity+y enter/exit on Base UI Toast."
      preview={<DemoToast />}
      code={`import {
  ToastProvider,
  Toaster,
  useToastManager,
} from "@/components/ui/toast"
import { Button } from "@/components/ui/button"

function Notify() {
  const toast = useToastManager()
  return (
    <Button
      onClick={() =>
        toast.add({ title: "Saved", description: "Draft published." })
      }
    >
      Show toast
    </Button>
  )
}

<ToastProvider>
  <Notify />
  <Toaster />
</ToastProvider>`}
      fullBleed={false}
      usage="Wrap the app (or stage) in ToastProvider, mount Toaster once, then call useToastManager().add. Stack offset stays on CSS vars so enter travel does not fight the pile."
    />
  )
}
