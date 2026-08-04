/**
 * Thumbnail compositor — isolated backend (no imports from `src/lib/og/*`).
 *
 * Background: FLUX → sharp polish
 * Text: Satori (Inter) → resvg PNG
 * Output: composite → JPEG
 */

import fs from "node:fs";
import {
  InferenceClient,
  InferenceClientProviderApiError,
} from "@huggingface/inference";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import sharp from "sharp";

import {
  THUMBNAIL_INPUT_LIMITS,
  THUMBNAIL_STYLE_PRESETS,
  type ThumbnailStyleKey,
  type ThumbnailStylePreset,
} from "./presets";

export type ThumbnailFormat = "youtube" | "linkedin";
export type ThumbnailLayout = "bold-center" | "split" | "lower-bar";

const DIMS: Record<ThumbnailFormat, { w: number; h: number; genW: number; genH: number }> = {
  youtube: { w: 1280, h: 720, genW: 1280, genH: 720 },
  // Keep LinkedIn exact, generate at FLUX-friendly 1216×640 then downscale.
  linkedin: { w: 1200, h: 627, genW: 1216, genH: 640 },
};

const DEFAULT_HF_MODEL = "black-forest-labs/FLUX.1-schnell";

const FONT_INTER_BOLD = fs.readFileSync(
  new URL("../og/fonts/Inter-Bold.ttf", import.meta.url),
);
const FONT_INTER_MEDIUM = fs.readFileSync(
  new URL("../og/fonts/Inter-Medium.ttf", import.meta.url),
);

export class ThumbnailInputError extends Error {}

export type ThumbnailInput = {
  title: string;
  subtitle?: string;
  style: ThumbnailStyleKey;
  format?: ThumbnailFormat;
  layout?: ThumbnailLayout;
  badge?: string;
  hfToken: string;
};

export function validateThumbnailInput(
  raw: unknown,
): Omit<ThumbnailInput, "hfToken"> {
  if (typeof raw !== "object" || raw === null) {
    throw new ThumbnailInputError("Invalid body");
  }
  const body = raw as Record<string, unknown>;

  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (!title) throw new ThumbnailInputError("title is required");
  if (title.length > THUMBNAIL_INPUT_LIMITS.titleMax) {
    throw new ThumbnailInputError(
      `title must be ${THUMBNAIL_INPUT_LIMITS.titleMax} characters or fewer`,
    );
  }

  let subtitle: string | undefined;
  if (typeof body.subtitle === "string" && body.subtitle.trim()) {
    subtitle = body.subtitle.trim();
    if (subtitle.length > THUMBNAIL_INPUT_LIMITS.subtitleMax) {
      throw new ThumbnailInputError(
        `subtitle must be ${THUMBNAIL_INPUT_LIMITS.subtitleMax} characters or fewer`,
      );
    }
  }

  const style = body.style;
  if (typeof style !== "string" || !(style in THUMBNAIL_STYLE_PRESETS)) {
    throw new ThumbnailInputError("style is required and must be a valid preset");
  }

  const formatRaw = body.format;
  const format: ThumbnailFormat | undefined =
    formatRaw === "youtube" || formatRaw === "linkedin" ? formatRaw : undefined;

  const layoutRaw = body.layout;
  const layout: ThumbnailLayout | undefined =
    layoutRaw === "bold-center" || layoutRaw === "split" || layoutRaw === "lower-bar"
      ? layoutRaw
      : undefined;

  const badgeRaw = typeof body.badge === "string" ? body.badge.trim() : "";
  const badge =
    badgeRaw && badgeRaw.length <= THUMBNAIL_INPUT_LIMITS.badgeMax
      ? badgeRaw
      : badgeRaw
        ? badgeRaw.slice(0, THUMBNAIL_INPUT_LIMITS.badgeMax)
        : undefined;

  return {
    title,
    subtitle,
    style: style as ThumbnailStyleKey,
    format,
    layout,
    badge,
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Preview background (CSS gradient → SVG)
// ────────────────────────────────────────────────────────────────────────────

type ParsedGradient = {
  angleDeg: number;
  stops: { color: string; offsetPct: number }[];
};

function parsePreviewGradient(gradient: string): ParsedGradient {
  const angleMatch = gradient.match(/linear-gradient\(\s*([0-9.]+)deg/i);
  const angleDeg = angleMatch ? Number(angleMatch[1]) : 135;

  const stopRegex =
    /(#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8}))\s+([0-9.]+)%/g;
  const stops: ParsedGradient["stops"] = [];
  let m: RegExpExecArray | null;
  while ((m = stopRegex.exec(gradient))) {
    stops.push({ color: m[1]!, offsetPct: Number(m[2]) });
  }

  if (stops.length === 0) {
    const matches = gradient.match(/#[0-9a-fA-F]{3,8}/g) ?? [];
    const from = matches[0] ?? "#050510";
    const to = matches[matches.length - 1] ?? "#1E40AF";
    return {
      angleDeg,
      stops: [
        { color: from, offsetPct: 0 },
        { color: to, offsetPct: 100 },
      ],
    };
  }
  return { angleDeg, stops };
}

async function renderPresetGradientBackground(
  preset: ThumbnailStylePreset,
  format: ThumbnailFormat,
): Promise<Buffer> {
  const parsed = parsePreviewGradient(preset.previewGradient);
  const dims = DIMS[format];

  const rad = ((parsed.angleDeg - 90) * Math.PI) / 180;
  const dx = Math.cos(rad);
  const dy = Math.sin(rad);
  const x1 = 0.5 - dx / 2;
  const y1 = 0.5 - dy / 2;
  const x2 = 0.5 + dx / 2;
  const y2 = 0.5 + dy / 2;

  const stopsSvg = parsed.stops
    .map(
      (s) =>
        `<stop offset="${Math.max(0, Math.min(100, s.offsetPct))}%" stop-color="${s.color}"/>`,
    )
    .join("");

  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${dims.w}" height="${dims.h}" viewBox="0 0 ${dims.w} ${dims.h}">`,
    "<defs>",
    `<linearGradient id="g" gradientUnits="objectBoundingBox" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">`,
    stopsSvg,
    "</linearGradient>",
    "</defs>",
    `<rect width="${dims.w}" height="${dims.h}" fill="url(#g)"/>`,
    "</svg>",
  ].join("");

  return sharp(Buffer.from(svg)).png().toBuffer();
}

// ────────────────────────────────────────────────────────────────────────────
// FLUX background
// ────────────────────────────────────────────────────────────────────────────

function resolveFluxParams(model: string) {
  const envSteps = Number(process.env.HUGGINGFACE_STEPS);
  const envGuidance = Number(process.env.HUGGINGFACE_GUIDANCE);
  const isSchnell = model.toLowerCase().includes("schnell");
  return {
    steps:
      Number.isFinite(envSteps) && envSteps > 0 ? envSteps : isSchnell ? 4 : 24,
    guidance:
      Number.isFinite(envGuidance) && envGuidance >= 0
        ? envGuidance
        : isSchnell
          ? 0
          : 3.0,
  };
}

async function generateBackground(
  prompt: string,
  hfToken: string,
  format: ThumbnailFormat,
): Promise<Buffer> {
  const model =
    process.env.HUGGINGFACE_IMAGE_MODEL?.trim() || DEFAULT_HF_MODEL;
  const { steps, guidance } = resolveFluxParams(model);
  const dims = DIMS[format];

  const client = new InferenceClient(hfToken);
  const blob = await client.textToImage(
    {
      model,
      inputs: prompt,
      parameters: {
        width: dims.genW,
        height: dims.genH,
        num_inference_steps: steps,
        guidance_scale: guidance,
      },
    },
    { outputType: "blob" },
  );
  const ab = await blob.arrayBuffer();
  return Buffer.from(ab);
}

async function polishBackground(input: Buffer, format: ThumbnailFormat): Promise<Buffer> {
  const dims = DIMS[format];
  return sharp(input, { failOn: "none" })
    .resize(dims.w, dims.h, {
      fit: "cover",
      position: "centre",
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen({ sigma: 0.6 })
    .modulate({ saturation: 1.04 })
    .linear(1.02, -4)
    .png()
    .toBuffer();
}

// ────────────────────────────────────────────────────────────────────────────
// Overlay rendering (Satori)
// ────────────────────────────────────────────────────────────────────────────

function fitTitleSize(text: string, maxSize: number, availableWidth: number): number {
  const approx = (size: number) => text.length * size * 0.58;
  let size = maxSize;
  while (size > 52 && approx(size) > availableWidth * 2) size -= 4;
  return size;
}

function buildShadowedTitle(
  text: string,
  fontSize: number,
  fillColor: string,
  shadowColor: string,
  maxWidth: number,
  textAlign: "left" | "center",
  shadowOffset = 4,
) {
  const baseStyle = {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize,
    lineHeight: 1.08,
    letterSpacing: "-0.02em",
    maxWidth,
    textAlign,
    whiteSpace: "pre-wrap",
    textTransform: "uppercase" as const,
  };

  const offsets = [
    { top: -shadowOffset, left: 0 },
    { top: shadowOffset, left: 0 },
    { top: 0, left: -shadowOffset },
    { top: 0, left: shadowOffset },
  ];

  const shadowNodes = offsets.map((o) => ({
    type: "div",
    props: {
      style: {
        ...baseStyle,
        position: "absolute" as const,
        top: o.top,
        left: o.left,
        color: shadowColor,
      },
      children: text,
    },
  }));

  const mainNode = {
    type: "div",
    props: {
      style: {
        ...baseStyle,
        position: "relative" as const,
        color: fillColor,
      },
      children: text,
    },
  };

  return {
    type: "div",
    props: {
      style: {
        position: "relative" as const,
        display: "flex",
      },
      children: [...shadowNodes, mainNode],
    },
  };
}

function buildBadgeNode(text: string) {
  return {
    type: "div",
    props: {
      style: {
        position: "absolute" as const,
        top: 28,
        left: 28,
        backgroundColor: "#FF3B30",
        color: "#fff",
        fontFamily: "Inter",
        fontWeight: 700,
        fontSize: 20,
        lineHeight: 1,
        padding: "14px 22px",
        borderRadius: 14,
        letterSpacing: "0.03em",
        textTransform: "uppercase" as const,
      },
      children: text,
    },
  };
}

function buildThumbnailNode(
  title: string,
  subtitle: string | undefined,
  preset: ThumbnailStylePreset,
  format: ThumbnailFormat,
  layout: ThumbnailLayout,
  badge?: string,
) {
  const dims = DIMS[format];
  const palette = preset.palette;
  const children: object[] = [];

  if (layout === "bold-center") {
    const titleSize = fitTitleSize(title, preset.typography.titleSizeMax, dims.w * 0.75);
    const shadowColor = palette.title.toLowerCase().includes("fff") ? "#000000" : "#FFFFFF";

    const inner: object[] = [
      buildShadowedTitle(
        title,
        titleSize,
        palette.title,
        shadowColor,
        dims.w * 0.75,
        "center",
        4,
      ),
    ];

    if (subtitle) {
      inner.push({
        type: "div",
        props: {
          style: {
            display: "flex",
            color: palette.subtitle,
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: Math.round(preset.typography.subtitleSizeMax * (format === "youtube" ? 1.1 : 1)),
            lineHeight: 1.25,
            marginTop: 18,
            maxWidth: dims.w * 0.65,
            textAlign: "center",
            whiteSpace: "pre-wrap",
          },
          children: subtitle,
        },
      });
    }

    children.push({
      type: "div",
      props: {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          paddingLeft: 90,
          paddingRight: 90,
        },
        children: inner,
      },
    });
  } else if (layout === "split") {
    const titleSize = fitTitleSize(title, Math.min(92, preset.typography.titleSizeMax), dims.w * 0.48);
    const titleNode = buildShadowedTitle(
      title,
      titleSize,
      palette.title,
      "#000000",
      dims.w * 0.48,
      "left",
      3,
    );

    const leftChildren: object[] = [titleNode];
    if (subtitle) {
      leftChildren.push({
        type: "div",
        props: {
          style: {
            display: "flex",
            color: palette.subtitle,
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: 24,
            lineHeight: 1.3,
            marginTop: 16,
            maxWidth: dims.w * 0.45,
            textAlign: "left",
            whiteSpace: "pre-wrap",
          },
          children: subtitle,
        },
      });
    }

    children.push({
      type: "div",
      props: {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "55%",
          height: "100%",
          paddingLeft: 86,
          paddingRight: 30,
        },
        children: leftChildren,
      },
    });
  } else {
    // lower-bar
    const titleSize = fitTitleSize(title, 72, dims.w * 0.85);
    const barChildren: object[] = [
      buildShadowedTitle(
        title,
        titleSize,
        "#FFFFFF",
        "#000000",
        dims.w * 0.85,
        "left",
        2,
      ),
    ];

    if (subtitle) {
      barChildren.push({
        type: "div",
        props: {
          style: {
            display: "flex",
            color: "rgba(255,255,255,0.8)",
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: 22,
            lineHeight: 1.3,
            marginTop: 12,
            maxWidth: dims.w * 0.8,
            textAlign: "left",
            whiteSpace: "pre-wrap",
          },
          children: subtitle,
        },
      });
    }

    children.push({
      type: "div",
      props: {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          width: "100%",
          height: "100%",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "40px 60px 48px",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%)",
              },
              children: barChildren,
            },
          },
        ],
      },
    });
  }

  if (badge && badge.trim()) {
    children.push(buildBadgeNode(badge.trim()));
  }

  children.push({
    type: "div",
    props: {
      style: {
        position: "absolute" as const,
        bottom: 16,
        right: 24,
        display: "flex",
        fontSize: 11,
        fontFamily: "Inter",
        fontWeight: 500,
        color: "rgba(255,255,255,0.35)",
        letterSpacing: "0.05em",
      },
      children: "makershot.tech",
    },
  });

  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        position: "relative" as const,
        width: dims.w,
        height: dims.h,
      },
      children,
    },
  };
}

async function renderThumbnailOverlayPng(
  title: string,
  subtitle: string | undefined,
  preset: ThumbnailStylePreset,
  format: ThumbnailFormat,
  layout: ThumbnailLayout,
  badge?: string,
): Promise<Buffer> {
  const node = buildThumbnailNode(title, subtitle, preset, format, layout, badge);
  const dims = DIMS[format];

  const svg = await satori(
    node as unknown as Parameters<typeof satori>[0],
    {
      width: dims.w,
      height: dims.h,
      fonts: [
        { name: "Inter", data: FONT_INTER_BOLD, weight: 700, style: "normal" },
        {
          name: "Inter",
          data: FONT_INTER_MEDIUM,
          weight: 500,
          style: "normal",
        },
      ],
    },
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: dims.w },
    background: "rgba(0,0,0,0)",
  });
  return Buffer.from(resvg.render().asPng());
}

// ────────────────────────────────────────────────────────────────────────────
// Public compositors
// ────────────────────────────────────────────────────────────────────────────

export async function composeThumbnail(input: ThumbnailInput): Promise<Buffer> {
  const preset = THUMBNAIL_STYLE_PRESETS[input.style];
  const format = input.format || "youtube";
  const layout = input.layout || "bold-center";

  const [rawBg, overlayPng] = await Promise.all([
    generateBackground(preset.backgroundPrompt, input.hfToken, format),
    renderThumbnailOverlayPng(
      input.title,
      input.subtitle,
      preset,
      format,
      layout,
      input.badge,
    ),
  ]);
  const polished = await polishBackground(rawBg, format);

  return sharp(polished)
    .composite([{ input: overlayPng, blend: "over" }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();
}

export async function composeThumbnailWithBackground(
  input: Omit<ThumbnailInput, "hfToken">,
  background: Buffer,
): Promise<Buffer> {
  const preset = THUMBNAIL_STYLE_PRESETS[input.style];
  const format = input.format || "youtube";
  const layout = input.layout || "bold-center";

  const [polished, overlayPng] = await Promise.all([
    polishBackground(background, format),
    renderThumbnailOverlayPng(
      input.title,
      input.subtitle,
      preset,
      format,
      layout,
      input.badge,
    ),
  ]);

  return sharp(polished)
    .composite([{ input: overlayPng, blend: "over" }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();
}

export async function composeThumbnailPreview(
  input: Omit<ThumbnailInput, "hfToken">,
): Promise<Buffer> {
  const preset = THUMBNAIL_STYLE_PRESETS[input.style];
  const format = input.format || "youtube";
  const layout = input.layout || "bold-center";

  const [bg, overlayPng] = await Promise.all([
    renderPresetGradientBackground(preset, format),
    renderThumbnailOverlayPng(
      input.title,
      input.subtitle,
      preset,
      format,
      layout,
      input.badge,
    ),
  ]);

  return sharp(bg)
    .composite([{ input: overlayPng, blend: "over" }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();
}

export { InferenceClientProviderApiError };
