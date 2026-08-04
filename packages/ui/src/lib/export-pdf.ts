import { getBrand } from "./brand";

type ComparisonRow = {
  service: string;
  serviceId: string;
  timeline: string;
  startingPrice: number;
  deliverables: string[];
};

/** Open a print-friendly window — user saves as PDF via browser print dialog. */
export function exportComparisonAsPdf(rows: ComparisonRow[]): void {
  const { name, domain, email } = getBrand();
  const html = `<!DOCTYPE html>
<html><head>
<meta charset="utf-8"/>
<title>${escapeHtml(name)} Service Comparison</title>
<style>
  body { font-family: system-ui, sans-serif; padding: 40px; color: #111; }
  h1 { font-size: 24px; margin-bottom: 8px; }
  .meta { color: #666; font-size: 12px; margin-bottom: 32px; }
  table { width: 100%; border-collapse: collapse; font-size: 11px; }
  th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
  th { background: #f5f5f5; }
  .check { color: #f59e0b; font-weight: bold; }
  .footer { margin-top: 32px; font-size: 11px; color: #888; }
</style>
</head><body>
<h1>${escapeHtml(name)} — Service Comparison</h1>
<p class="meta">Generated ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · ${escapeHtml(domain)}</p>
<table>
<thead><tr><th>Service</th><th>Timeline</th><th>Starting Price</th><th>Key Deliverables</th></tr></thead>
<tbody>
${rows
  .map(
    (r) =>
      `<tr><td><strong>${escapeHtml(r.service)}</strong></td><td>${escapeHtml(r.timeline)}</td><td>$${r.startingPrice.toLocaleString()}</td><td>${escapeHtml(r.deliverables.slice(0, 4).join("; "))}</td></tr>`
  )
  .join("\n")}
</tbody>
</table>
<p class="footer">Fixed-price packages for indie makers and SaaS founders. Contact: ${escapeHtml(email)}</p>
<script>window.onload = () => { window.print(); }</script>
</body></html>`;

  const win = window.open("", "_blank");
  if (!win) {
    alert("Please allow popups to export PDF.");
    return;
  }
  win.document.write(html);
  win.document.close();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
