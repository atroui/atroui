import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: { children: "Button" },
}

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
}

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
}

export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete" },
}

export const Ghost: Story = {
  args: { variant: "ghost", children: "Ghost" },
}

export const Link: Story = {
  args: { variant: "link", children: "Link" },
}

export const Small: Story = {
  args: { size: "sm", children: "Small" },
}

export const Large: Story = {
  args: { size: "lg", children: "Large" },
}

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" },
}
