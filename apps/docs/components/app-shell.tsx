import { SiteHeader } from "@/components/site-header"
import { DocsLayoutShell } from "@/components/docs-layout"
import { ProductFooter } from "@/components/product-footer"
import { SidebarProvider } from "@/components/sidebar-provider"
import { DocsRouteTransition } from "@/components/view-transitions"
import { PRODUCT_MAIN_PAD, PRODUCT_OUTER } from "@/lib/product-layout"

/**
 * shadcn (app) layout model:
 *   SiteHeader → surface → SiteFooter
 * Docs: locked 3-column room — only the center scrolls.
 */

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="product-shell">
        <div className={`product-main ${PRODUCT_OUTER} ${PRODUCT_MAIN_PAD}`}>
          <DocsRouteTransition>{children}</DocsRouteTransition>
        </div>
      </div>
      <ProductFooter />
    </>
  )
}

export function DocsShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-dvh max-h-dvh flex-col overflow-hidden overscroll-none">
        <div className="shrink-0">
          <SiteHeader docs />
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">
          <DocsLayoutShell>{children}</DocsLayoutShell>
        </div>
      </div>
    </SidebarProvider>
  )
}
