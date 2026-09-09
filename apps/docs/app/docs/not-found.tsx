import { NotFoundPanel } from "@/components/not-found-panel"

/**
 * Missing collection / glossary term — stays in the book (DocsHeader keeps ⌘K,
 * sidebar keeps place) instead of teleporting to the marketing 404.
 */
export default function DocsNotFound() {
  return <NotFoundPanel as="div" />
}
