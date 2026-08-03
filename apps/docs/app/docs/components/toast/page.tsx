import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { ToastDemo } from "@/components/demos"

export const metadata: Metadata = {
  title: "Toast",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Toast"
      description="Transient notifications powered by Sonner."
      preview={<ToastDemo />}
      code={"import { toast, Button, Toaster } from \"@meridian/ui\"\n\n// Place <Toaster /> once in your root layout\n\nexport function Example() {\n  return (\n    <Button onClick={() => toast(\"Hello from Meridian\")}>\n      Notify\n    </Button>\n  )\n}"}
      usage="Use toasts for non-blocking feedback. Prefer success/error variants for clarity. Keep messages short."
      props={[
    { name: "theme", type: "'light' | 'dark' | 'system'", default: "'system'", description: "Theme for the toaster host." },
    { name: "position", type: "ToasterPosition", default: "'bottom-right'", description: "Screen position for toasts." },
      ]}
    />
  )
}
