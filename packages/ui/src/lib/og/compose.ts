/**
 * OG image compositor (Quick mode).
 *
 * Background: FLUX (textless) → sharp polish
 * Text: Satori (Inter glyphs) → resvg PNG
 * Output: composite → JPEG
 *
 * IMPORTANT: Thumbnail generation is implemented separately in `src/lib/thumbnail/*`.
 * Keep OG and thumbnail backends isolated so performance and maintenance don’t couple.
 */

import {
  InferenceClient,
  InferenceClientProviderApiError,
} from "@huggingface/inference";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import sharp from "sharp";

import { getBrand } from "../brand";
import { loadOgFonts } from "./load-fonts";
import {
  QUICK_INPUT_LIMITS,
  STYLE_PRESETS,
  type StyleKey,
  type StylePreset,
} from "./presets";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
// FLUX prefers multiples of 16/32; we downscale to OG dims in post.
const GEN_WIDTH = 1216;
const GEN_HEIGHT = 640;

const DEFAULT_HF_MODEL = "black-forest-labs/FLUX.1-schnell";

// ────────────────────────────────────────────────────────────────────────────
// Font bundle (lazy - safe under Next webpack bundling of API routes).
// ────────────────────────────────────────────────────────────────────────────

let fontBold: Buffer | null = null;
let fontMedium: Buffer | null = null;

function fonts() {
  if (!fontBold || !fontMedium) {
    const loaded = loadOgFonts();
    fontBold = loaded.bold;
    fontMedium = loaded.medium;
  }
  return { bold: fontBold, medium: fontMedium };
}

// ────────────────────────────────────────────────────────────────────────────
// Public types
// ────────────────────────────────────────────────────────────────────────────

export type ComposeInput = {
  title: string;
  subtitle?: string;
  style: StyleKey;
  hfToken: string;
};

export class ComposeInputError extends Error {}

export function validateComposeInput(
  raw: unknown,
): Omit<ComposeInput, "hfToken"> {
  if (typeof raw !== "object" || raw === null) {
    throw new ComposeInputError("Invalid body");
  }
  const body = raw as Record<string, unknown>;

  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (!title) throw new ComposeInputError("title is required");
  if (title.length > QUICK_INPUT_LIMITS.titleMax) {
    throw new ComposeInputError(
      `title must be ${QUICK_INPUT_LIMITS.titleMax} characters or fewer`,
    );
  }

  let subtitle: string | undefined;
  if (typeof body.subtitle === "string" && body.subtitle.trim()) {
    subtitle = body.subtitle.trim();
    if (subtitle.length > QUICK_INPUT_LIMITS.subtitleMax) {
      throw new ComposeInputError(
        `subtitle must be ${QUICK_INPUT_LIMITS.subtitleMax} characters or fewer`,
      );
    }
  }

  const style = body.style;
  if (typeof style !== "string" || !(style in STYLE_PRESETS)) {
    throw new ComposeInputError("style is required and must be a valid preset");
  }

  return { title, subtitle, style: style as StyleKey };
}

// ────────────────────────────────────────────────────────────────────────────
// Preview-only pipeline (no AI background)
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
    const from = matches[0] ?? "#0B132B";
    const to = matches[matches.length - 1] ?? "#3A1C71";
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

async function renderPresetGradientBackground(preset: StylePreset): Promise<Buffer> {
  const parsed = parsePreviewGradient(preset.previewGradient);

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
    `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">`,
    "<defs>",
    `<linearGradient id="g" gradientUnits="objectBoundingBox" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">`,
    stopsSvg,
    "</linearGradient>",
    "</defs>",
    `<rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#g)"/>`,
    "</svg>",
  ].join("");

  return sharp(Buffer.from(svg)).png().toBuffer();
}

export async function composeQuickOgPreview(
  input: Omit<ComposeInput, "hfToken">,
): Promise<Buffer> {
  const preset = STYLE_PRESETS[input.style];

  const [bg, overlayPng] = await Promise.all([
    renderPresetGradientBackground(preset),
    renderOverlayPng(input.title, input.subtitle, preset),
  ]);

  return sharp(bg)
    .composite([{ input: overlayPng, blend: "over" }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();
}

// ────────────────────────────────────────────────────────────────────────────
// Stage 1 - FLUX background
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

async function generateBackground(prompt: string, hfToken: string): Promise<Buffer> {
  const model =
    process.env.HUGGINGFACE_IMAGE_MODEL?.trim() || DEFAULT_HF_MODEL;
  const { steps, guidance } = resolveFluxParams(model);

  const client = new InferenceClient(hfToken);
  const blob = await client.textToImage(
    {
      model,
      inputs: prompt,
      parameters: {
        width: GEN_WIDTH,
        height: GEN_HEIGHT,
        num_inference_steps: steps,
        guidance_scale: guidance,
      },
    },
    { outputType: "blob" },
  );
  const ab = await blob.arrayBuffer();
  return Buffer.from(ab);
}

async function polishBackground(input: Buffer): Promise<Buffer> {
  return sharp(input, { failOn: "none" })
    .resize(OG_WIDTH, OG_HEIGHT, {
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
// Stage 2 - Satori text overlay
// ────────────────────────────────────────────────────────────────────────────

function fitTitleSize(
  title: string,
  maxSize: number,
  availableWidth: number,
): number {
  const approx = (size: number) => title.length * size * 0.58;
  let size = maxSize;
  while (size > 44 && approx(size) > availableWidth * 2) size -= 4;
  return size;
}

function buildOverlayNode(
  title: string,
  subtitle: string | undefined,
  preset: StylePreset,
) {
  const { safeZone, palette, typography } = preset;
  const padding = 80;
  const contentWidth = OG_WIDTH - padding * 2;

  const alignItems =
    safeZone === "left"
      ? "flex-start"
      : safeZone === "center"
        ? "center"
        : "flex-start";
  const justifyContent = safeZone === "lowerThird" ? "flex-end" : "center";
  const textAlign = safeZone === "center" ? "center" : "left";

  const textBlockMaxWidth =
    safeZone === "center"
      ? Math.min(contentWidth, 960)
      : Math.min(contentWidth, 880);

  const titleSize = fitTitleSize(
    title,
    typography.titleSizeMax,
    textBlockMaxWidth,
  );
  const subtitleSize = typography.subtitleSizeMax;

  const titleNode = {
    type: "div",
    props: {
      style: {
        display: "flex",
        color: palette.title,
        fontFamily: "Inter",
        fontWeight: typography.titleWeight,
        fontSize: titleSize,
        lineHeight: 1.04,
        letterSpacing: "-0.02em",
        maxWidth: textBlockMaxWidth,
        textAlign,
        whiteSpace: "pre-wrap",
      },
      children: title,
    },
  };

  const children: object[] = [titleNode];
  if (subtitle) {
    children.push({
      type: "div",
      props: {
        style: {
          display: "flex",
          color: palette.subtitle,
          fontFamily: "Inter",
          fontWeight: 500,
          fontSize: subtitleSize,
          lineHeight: 1.35,
          letterSpacing: "-0.005em",
          maxWidth: textBlockMaxWidth,
          textAlign,
          whiteSpace: "pre-wrap",
          marginTop: 20,
        },
        children: subtitle,
      },
    });
  }

  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: OG_WIDTH,
        height: OG_HEIGHT,
        padding: `${padding}px`,
        alignItems,
        justifyContent,
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: safeZone === "center" ? "center" : "flex-start",
              width: "100%",
            },
            children,
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: 32,
              right: 48,
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 8px",
              borderRadius: "4px",
              background: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.06)",
            },
            children: [
              {
                type: "span",
                props: {
                  style: {
                    color: "rgba(255,255,255,0.45)",
                    fontFamily: "Inter",
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                  },
                  children: getBrand().domain,
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function renderOverlayPng(
  title: string,
  subtitle: string | undefined,
  preset: StylePreset,
): Promise<Buffer> {
  const node = buildOverlayNode(title, subtitle, preset);

  const svg = await satori(
    node as unknown as Parameters<typeof satori>[0],
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts: [
        { name: "Inter", data: fonts().bold, weight: 700, style: "normal" },
        {
          name: "Inter",
          data: fonts().medium,
          weight: 500,
          style: "normal",
        },
      ],
    },
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: OG_WIDTH },
    background: "rgba(0,0,0,0)",
  });
  return Buffer.from(resvg.render().asPng());
}

// ────────────────────────────────────────────────────────────────────────────
// Stage 3 - composite + encode
// ────────────────────────────────────────────────────────────────────────────

export async function composeQuickOg(input: ComposeInput): Promise<Buffer> {
  const preset = STYLE_PRESETS[input.style];

  const [rawBg, overlayPng] = await Promise.all([
    generateBackground(preset.backgroundPrompt, input.hfToken),
    renderOverlayPng(input.title, input.subtitle, preset),
  ]);
  const polished = await polishBackground(rawBg);

  return sharp(polished)
    .composite([{ input: overlayPng, blend: "over" }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();
}

export { InferenceClientProviderApiError };

