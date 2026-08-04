import { generateText } from 'ai';
import { xai } from '@ai-sdk/xai';
import type { AnalyzerResult } from './analyzer';
import type { DirectorResult } from './director';

export class PromptEngineerAgent {
  async generateFinalPrompt(
    title: string,
    analyzerData: AnalyzerResult,
    directorData: DirectorResult
  ): Promise<string> {
    const prompt = `You are an Expert AI Image Prompt Engineer.
    
Task: Combine the following art direction and analysis into a SINGLE, highly-detailed, cinematic prompt suitable for an advanced AI image generator (like Midjourney or Imagen 3).

Title: "${title}"

Content Analysis:
${JSON.stringify(analyzerData, null, 2)}

Art Direction:
${JSON.stringify(directorData, null, 2)}

Requirements:
1. Do NOT include markdown blocks or any conversational filler.
2. The prompt should be a vivid, comma-separated descriptive paragraph.
3. Include photography terms (e.g. 8k resolution, Unreal Engine 5 render, highly detailed, octane render, sharp focus).
4. Emphasize the lighting and color palette strongly.
5. Generate a textless background only. Do NOT ask for words, captions, typography, logos, symbols, UI, or readable text in the image.
6. Preserve generous negative space where the thumbnail headline can be composited later.

Generate ONLY the raw prompt string.
`;

    const { text } = await generateText({
      model: xai(process.env.XAI_MODEL || 'grok-4-1-fast-non-reasoning'),
      prompt: prompt,
      temperature: 0.6,
    });

    let finalPrompt = text.trim();
    
    // Remove quotes if the AI wrapped the whole prompt in them
    if (finalPrompt.startsWith('"') && finalPrompt.endsWith('"')) {
      finalPrompt = finalPrompt.slice(1, -1);
    }
    
    return finalPrompt;
  }
}
