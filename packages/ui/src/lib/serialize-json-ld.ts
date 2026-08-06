/**
 * Serialize JSON-LD for a <script> tag. Escapes `<` so values cannot break
 * out of the script element (e.g. `</script>` in a title).
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
