"use client"

/**
 * Shared contact stage — real registry ContactForm (owns its letter chrome).
 * Used by landing workspace and docs DemoContactForm (Preview = install).
 */

import { ContactForm } from "../../registry/default/blocks/contact-form"

export function ContactStagePreview() {
  return (
    <div className="w-full max-w-md">
      <ContactForm />
    </div>
  )
}
