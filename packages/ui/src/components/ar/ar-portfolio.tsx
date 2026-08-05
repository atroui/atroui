"use client";

import Script from "next/script";
import { createElement, useState } from "react";

import { FadeIn } from "../motion/fade-in";
import { cn } from "../../lib/utils";

const MODELS = [
  {
    id: "og-tool",
    title: "OG Image Generator",
    description: "Preview how your social cards look in 3D space before sharing.",
    src: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    poster: "/opengraph-image",
  },
  {
    id: "dashboard",
    title: "SaaS Dashboard MVP",
    description: "Interactive 3D preview of a shipped client dashboard layout.",
    src: "https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb",
  },
];

const chipBase =
  "border px-3 py-1.5 text-xs font-medium transition-colors";
const chipActive = "border-brand bg-brand/10 text-brand";
const chipIdle =
  "border-border-subtle text-muted-foreground hover:border-border hover:text-foreground";

export function ArPortfolio() {
  const [active, setActive] = useState(MODELS[0]!.id);
  const model = MODELS.find((m) => m.id === active) ?? MODELS[0]!;
  const [scriptReady, setScriptReady] = useState(false);

  return (
    <>
      <Script
        type="module"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"
        onLoad={() => setScriptReady(true)}
        strategy="lazyOnload"
      />

      <FadeIn>
        <p className="ms-stamp">AR portfolio preview</p>
        <p className="mt-3 max-w-lg text-sm text-muted-foreground">
          On supported devices, tap &ldquo;View in AR&rdquo; to place a project preview in your
          space. Demo models are placeholders - replace the hardcoded{" "}
          <code className="font-mono text-[11px] text-foreground">MODELS</code>{" "}
          list for real client work.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {MODELS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActive(m.id)}
              className={cn(
                chipBase,
                "rounded-full",
                active === m.id ? chipActive : chipIdle
              )}
            >
              {m.title}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border-subtle bg-card/40">
          {scriptReady ? (
            createElement("model-viewer", {
              src: model.src,
              poster: model.poster,
              alt: model.title,
              ar: true,
              "ar-modes": "webxr scene-viewer quick-look",
              "camera-controls": true,
              "touch-action": "pan-y",
              "auto-rotate": true,
              "shadow-intensity": "1",
              style: { width: "100%", height: "400px", background: "transparent" },
            })
          ) : (
            <div className="flex h-[400px] items-center justify-center text-sm text-muted-foreground">
              Loading 3D viewer…
            </div>
          )}
        </div>
        <p className="mt-3 text-sm font-medium text-foreground">{model.title}</p>
        <p className="text-xs text-muted-foreground">{model.description}</p>
      </FadeIn>
    </>
  );
}
