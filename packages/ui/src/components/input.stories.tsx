import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./input"
import { Label } from "./label"
import { Textarea } from "./textarea"

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: { placeholder: "Enter text…" },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
}

export const Disabled: Story = {
  args: { placeholder: "Disabled", disabled: true },
}

export const TextareaStory: StoryObj<typeof Textarea> = {
  render: () => <Textarea placeholder="Write a message…" className="w-80" />,
  name: "Textarea",
}
