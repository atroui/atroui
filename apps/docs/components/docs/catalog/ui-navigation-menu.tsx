import { ComponentDoc } from "@/components/component-doc"
import { DemoNavigationMenu } from "@/components/registry-demos"

export function UiNavigationMenuDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-navigation-menu"
      registryName="navigation-menu"
      title="Navigation Menu"
      description="Site nav panels with peer crossfade and soft-rect Mira popup."
      preview={<DemoNavigationMenu />}
      code={`import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Product</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="#">Overview</NavigationMenuLink>
        <NavigationMenuLink href="#">Pricing</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="#">Guides</NavigationMenuLink>
        <NavigationMenuLink href="#">API</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
  <NavigationMenuViewport />
</NavigationMenu>`}
      fullBleed={false}
      usage="Peer panels crossfade inside one soft-rect popup. Prefer for top-level site sections — not deep hierarchies."
    />
  )
}
