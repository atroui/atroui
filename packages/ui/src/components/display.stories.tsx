import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "./badge"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { Skeleton } from "./skeleton"
import { Separator } from "./separator"

const meta: Meta = {
  title: "Components/Display",
  tags: ["autodocs"],
}

export default meta

export const Badges: StoryObj = {
  render: () => (
    <div className="flex gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
}

export const Avatars: StoryObj = {
  render: () => (
    <div className="flex gap-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const CardDefault: StoryObj = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Meridian</CardTitle>
        <CardDescription>A polished React component library.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Built on Radix primitives with Tailwind and thoughtful defaults.
        </p>
      </CardContent>
      <CardFooter>
        <Button>Get started</Button>
      </CardFooter>
    </Card>
  ),
}

export const SkeletonDefault: StoryObj = {
  render: () => (
    <div className="flex w-80 items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[160px]" />
      </div>
    </div>
  ),
}

export const SeparatorDefault: StoryObj = {
  render: () => (
    <div className="w-80">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Meridian UI</h4>
        <p className="text-sm text-muted-foreground">Accessible components.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <span>Blog</span>
        <Separator orientation="vertical" />
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
      </div>
    </div>
  ),
}
