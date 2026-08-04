import * as React from "react";

import { cn } from "../../lib/utils";

/**
 * Article prose container. Keeps MDX and plain-HTML content consistent.
 */
export function Prose({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "prose-studio text-foreground",
        "[&>h1]:ds-display [&>h1]:text-4xl [&>h1]:mt-0 [&>h1]:mb-6",
        "[&>h2]:ds-headline [&>h2]:text-2xl [&>h2]:mt-12 [&>h2]:mb-4",
        "[&>h3]:ds-headline [&>h3]:text-xl [&>h3]:mt-10 [&>h3]:mb-3",
        "[&>p]:text-[0.975rem] [&>p]:leading-[1.75] [&>p]:text-foreground/85 [&>p]:my-5",
        "[&>ul]:my-5 [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:my-1.5 [&>ul>li]:text-foreground/85",
        "[&>ol]:my-5 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol>li]:my-1.5 [&>ol>li]:text-foreground/85",
        "[&>blockquote]:my-6 [&>blockquote]:border-l-2 [&>blockquote]:border-brand/50 [&>blockquote]:pl-4 [&>blockquote]:text-foreground/75 [&>blockquote]:italic",
        "[&>hr]:my-10 [&>hr]:border-border-subtle",
        "[&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-brand/40 hover:[&_a]:decoration-brand [&_a]:text-foreground",
        "[&_code]:border [&_code]:border-border-subtle [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.85em] [&_code]:font-mono",
        "[&>pre]:my-6 [&>pre]:overflow-x-auto [&>pre]:border [&>pre]:border-border-subtle [&>pre]:bg-muted/30 [&>pre]:p-4 [&>pre]:text-[0.88rem]",
        "[&>pre_code]:border-0 [&>pre_code]:bg-transparent [&>pre_code]:p-0",
        "[&>img]:my-8 [&>img]:border [&>img]:border-border-subtle",
        "[&>table]:my-6 [&>table]:w-full [&>table]:text-sm",
        "[&>table_th]:border-b [&>table_th]:border-border [&>table_th]:px-3 [&>table_th]:py-2 [&>table_th]:text-left [&>table_th]:font-medium",
        "[&>table_td]:border-b [&>table_td]:border-border-subtle [&>table_td]:px-3 [&>table_td]:py-2",
        className
      )}
      {...props}
    />
  );
}
