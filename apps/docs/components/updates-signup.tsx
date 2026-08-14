"use client"

/**
 * Family Values: one primary action (subscribe). Promise first; the form
 * is the depth, not a second CTA competing with Docs.
 */

import { NewsletterForm } from "atroui"

export function UpdatesSignup({
  source,
  compact = false,
}: {
  source: string
  compact?: boolean
}) {
  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
      {!compact ? (
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          We write when something ships that changes how you install or use
          AtroUI. Same voice as the blog. Unsubscribe anytime.
        </p>
      ) : null}
      <NewsletterForm
        source={source}
        submitLabel="Get updates"
        successMessage="You're on the list. We'll write when something major ships."
        placeholder="you@studio.com"
      />
    </div>
  )
}
