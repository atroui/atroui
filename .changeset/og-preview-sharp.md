---
"atroui": patch
---

Fix OG Quick-mode text preview downloads: rasterize Satori overlays with sharp instead of @resvg so Host API `/api/generate` previewOnly no longer 500s under Next.js.
