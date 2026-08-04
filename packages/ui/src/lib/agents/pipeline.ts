import { ContentAnalyzerAgent, AnalyzerResult } from './analyzer';
import { ArtDirectorAgent, DirectorResult } from './director';
import { PromptEngineerAgent } from './prompter';

export class ThumbnailPipeline {
  private analyzer: ContentAnalyzerAgent;
  private director: ArtDirectorAgent;
  private prompter: PromptEngineerAgent;

  constructor() {
    this.analyzer = new ContentAnalyzerAgent();
    this.director = new ArtDirectorAgent();
    this.prompter = new PromptEngineerAgent();
  }

  private async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async generateCinematicPrompt(
    title: string,
    subtitle?: string,
    badge?: string
  ): Promise<string> {
    console.log('[ThumbnailPipeline] Starting multi-agent prompt enhancement...');

    const maxRetries = 3;
    let analyzerData: AnalyzerResult | null = null;
    let directorData: DirectorResult | null = null;
    let finalPrompt: string | null = null;

    // Phase 1: Analyze
    for (let i = 0; i < maxRetries; i++) {
      try {
        console.log(`[ThumbnailPipeline] Analyzer run ${i + 1}...`);
        analyzerData = await this.analyzer.analyze(title, subtitle, badge);
        console.log('[ThumbnailPipeline] Analyzer Data:', JSON.stringify(analyzerData));
        break;
      } catch (err) {
        console.warn(`[ThumbnailPipeline] Analyzer failed (attempt ${i + 1}):`, err);
        if (i === maxRetries - 1) throw err;
        await this.sleep(1000 * Math.pow(2, i));
      }
    }

    // Phase 2: Direct
    for (let i = 0; i < maxRetries; i++) {
      try {
        console.log(`[ThumbnailPipeline] Director run ${i + 1}...`);
        directorData = await this.director.planDirection(analyzerData!);
        console.log('[ThumbnailPipeline] Director Data:', JSON.stringify(directorData));
        break;
      } catch (err) {
        console.warn(`[ThumbnailPipeline] Director failed (attempt ${i + 1}):`, err);
        if (i === maxRetries - 1) throw err;
        await this.sleep(1000 * Math.pow(2, i));
      }
    }

    // Phase 3: Prompt
    for (let i = 0; i < maxRetries; i++) {
      try {
        console.log(`[ThumbnailPipeline] Prompter run ${i + 1}...`);
        finalPrompt = await this.prompter.generateFinalPrompt(title, analyzerData!, directorData!);
        console.log('[ThumbnailPipeline] Final Enhanced Prompt:', finalPrompt);
        break;
      } catch (err) {
        console.warn(`[ThumbnailPipeline] Prompter failed (attempt ${i + 1}):`, err);
        if (i === maxRetries - 1) throw err;
        await this.sleep(1000 * Math.pow(2, i));
      }
    }

    if (!finalPrompt) {
      throw new Error("Failed to generate final prompt.");
    }

    return finalPrompt;
  }
}
