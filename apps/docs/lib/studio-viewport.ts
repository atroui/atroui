/** Mark wide panes even when the layout viewport is stuck at phone width. */
export function syncStudioViewport() {
  if (typeof window === "undefined") return
  const mq = 640
  const inner = window.innerWidth || 0
  const outer = window.outerWidth || 0
  const scaled =
    inner < mq &&
    outer >= mq &&
    outer <= 1100 &&
    outer / Math.max(inner, 1) <= 2.2
  const width = scaled ? outer : inner
  const root = document.documentElement
  if (width >= mq) root.setAttribute("data-wf-studio", "")
  else root.removeAttribute("data-wf-studio")
  if (!scaled) return
  const meta = document.querySelector('meta[name="viewport"]')
  if (!meta) return
  meta.setAttribute(
    "content",
    `width=${Math.round(width)}, initial-scale=1, viewport-fit=cover`
  )
}

/** Inline head script: same rules as `syncStudioViewport` before React hydrates. */
export const STUDIO_VIEWPORT_SCRIPT = `(function(){
  var MQ = 640;
  function sync() {
    var inner = window.innerWidth || 0;
    var outer = window.outerWidth || 0;
    var scaled = inner < MQ && outer >= MQ && outer <= 1100 && outer / Math.max(inner, 1) <= 2.2;
    var width = scaled ? outer : inner;
    var root = document.documentElement;
    if (width >= MQ) root.setAttribute("data-wf-studio", "");
    else root.removeAttribute("data-wf-studio");
    if (!scaled) return;
    var meta = document.querySelector('meta[name="viewport"]');
    if (!meta) return;
    meta.setAttribute(
      "content",
      "width=" + Math.round(width) + ", initial-scale=1, viewport-fit=cover"
    );
  }
  sync();
  window.addEventListener("resize", sync);
})();`

export function studioGreeting(hour: number): {
  greet: string
  evening: boolean
} {
  if (hour >= 5 && hour < 12) return { greet: "Good morning", evening: false }
  if (hour >= 12 && hour < 18) return { greet: "Good afternoon", evening: false }
  return { greet: "Good evening", evening: true }
}
