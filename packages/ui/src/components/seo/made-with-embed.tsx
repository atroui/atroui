"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";

import { getBrand } from "../../lib/brand";
import { absoluteUrl } from "../../lib/seo";
import { cn } from "../../lib/utils";

type MadeWithEmbedProps = {
  /** Path the badge should link to */
  href?: string;
  /** Public path to the badge SVG (host app asset). */
  badgeSrc?: string;
  /** Accessible / alt label brand name. Defaults to getBrand().name */
  brandName?: string;
  className?: string;
};

/**
 * Embeddable credit badge + copyable HTML - the classic free-tool backlink ask.
 */
export function MadeWithEmbed({
  href = "/og",
  badgeSrc = "/badge/atroui.svg",
  brandName,
  className,
}: MadeWithEmbedProps) {
  const [copied, setCopied] = useState(false);
  const name = brandName ?? getBrand().name;
  const target = absoluteUrl(href);
  const badgeUrl = badgeSrc.startsWith("http")
    ? badgeSrc
    : absoluteUrl(badgeSrc);
  const alt = `Made with ${name}`;
  const snippet = `<a href="${target}" target="_blank" rel="noopener noreferrer"><img src="${badgeUrl}" alt="${alt}" width="160" height="40" /></a>`;

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [snippet]);

  return (
    <div className={cn("grid gap-6 md:grid-cols-12 md:items-start", className)}>
      <div className="md:col-span-5">
        <p className="ms-stamp">Credit</p>
        <h2 className="ds-display mt-4 text-2xl text-foreground sm:text-3xl">
          Link back if it helped.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Drop this badge on your site, README, or Notion footer. Free tools stay
          free when people share the source.
        </p>
        <a
          href={target}
          className="mt-6 inline-block ring-1 ring-border-subtle transition-opacity hover:opacity-90"
          aria-label={`${name} badge preview`}
        >
          <img src={badgeSrc} alt={alt} width={160} height={40} />
        </a>
      </div>
      <div className="md:col-span-7">
        <p className="ds-mono-label mb-3">HTML snippet</p>
        <pre className="overflow-x-auto border border-border-subtle bg-muted/30 p-4 font-mono text-[11px] leading-relaxed text-foreground whitespace-pre-wrap break-all">
          {snippet}
        </pre>
        <button type="button" onClick={copy} className="ms-cta mt-4">
          {copied ? (
            <>
              <Check className="size-4" aria-hidden />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-4" aria-hidden />
              Copy snippet
            </>
          )}
        </button>
      </div>
    </div>
  );
}
