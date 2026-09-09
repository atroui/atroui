/** Shared blog date display helpers (ISO `YYYY-MM-DD` in → locale-safe out). */

/** Compact ledger stamp: `2026-08-24` → `2026.08.24`. */
export function formatLedgerDate(iso: string): string {
  const [y, m, d] = iso.split("-")
  if (!y || !m || !d) return iso
  return `${y}.${m}.${d}`
}

/** Essay meta line: `2026-08-24` → `August 24, 2026`. */
export function formatEssayDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

/** Long en-US date — same as essay; reused by landing. */
export function formatLongDate(iso: string): string {
  return formatEssayDate(iso)
}
