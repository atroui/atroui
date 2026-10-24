"use client"

/**
 * Shared waitlist stage — real registry WaitlistForm + quiet section chrome.
 * Used by landing workspace and docs DemoWaitlistForm (Preview = install).
 */

import { WaitlistForm } from "../../registry/default/blocks/waitlist-form"

export function WaitlistStagePreview() {
  return (
    <div className="rw-waitlist-board">
      <header className="rw-waitlist-board-head">
        <p className="rw-waitlist-board-stamp">Waitlist</p>
        <h3 className="rw-waitlist-board-title">Get early access.</h3>
        <p className="rw-waitlist-board-lede">
          One field. Your Resend key. Live in an afternoon.
        </p>
      </header>
      <WaitlistForm />
    </div>
  )
}
