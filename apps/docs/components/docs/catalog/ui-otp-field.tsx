import { ComponentDoc } from "@/components/component-doc"
import { DemoOtpField } from "@/components/registry-demos"

export function UiOtpFieldDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-otp-field"
      registryName="otp-field"
      title="OTP Field"
      description="Soft-rect OTP digit slots with whileFocus settle (~160ms easeOutExpo) on Base UI."
      preview={<DemoOtpField />}
      code={`import {
  OTPField,
  OTPFieldInput,
  OTPFieldSeparator,
} from "@/components/ui/otp-field"

<OTPField length={6}>
  <OTPFieldInput />
  <OTPFieldInput aria-label="Digit 2 of 6" />
  <OTPFieldInput aria-label="Digit 3 of 6" />
  <OTPFieldSeparator />
  <OTPFieldInput aria-label="Digit 4 of 6" />
  <OTPFieldInput aria-label="Digit 5 of 6" />
  <OTPFieldInput aria-label="Digit 6 of 6" />
</OTPField>`}
      fullBleed={false}
      usage="Wrap in Field for accessible name and validation. whileFocus settle is per-slot only — peers stay still."
    />
  )
}
