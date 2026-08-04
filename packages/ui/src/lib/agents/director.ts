import { generateObject } from 'ai';
import { xai } from '@ai-sdk/xai';
import { z } from 'zod';
import { AnalyzerResult } from './analyzer';

export interface DirectorResult {
  lighting: string;
  cameraAngle: string;
  colorPalette: string;
  composition: string;
}

export class ArtDirectorAgent {
  async planDirection(analyzerData: AnalyzerResult): Promise<DirectorResult> {
    const prompt = `You are a Senior Cinematic Art Director. Based on the content analysis for a YouTube thumbnail, plan the visual art direction.

Analysis Data:
${JSON.stringify(analyzerData, null, 2)}

Plan a scene that is eye-catching, high contrast, and highly clickable.
`;

    const { object } = await generateObject({
      model: xai(process.env.XAI_MODEL || 'grok-4-1-fast-non-reasoning'),
      schema: z.object({
        lighting: z.string().describe("Describe the lighting setup (e.g., Dramatic cinematic lighting, Neon rim lights, Volumetric god rays)"),
        cameraAngle: z.string().describe("Describe the camera angle and lens (e.g., Low-angle wide shot, extreme close-up macro, isometric)"),
        colorPalette: z.string().describe("Describe the main colors (e.g., Cyberpunk teal and pink, moody dark grey and electric blue)"),
        composition: z.string().describe("Describe how the key symbols are arranged in the frame. Leave space for text if necessary."),
      }),
      prompt: prompt,
      temperature: 0.4,
    });

    return object;
  }
}

