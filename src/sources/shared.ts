import { type Source, SourceError, type SourceMatch } from './types';
import type { MatchRule } from './rules';

export class ErrorHandledSource implements Source {
  constructor(private origin: Source) {}
  async matchesFor(date: string): Promise<SourceMatch[]> {
    try {
      return await this.origin.matchesFor(date);
    } catch (error) {
      throw new SourceError('Source Error in results', { cause: error });
    }
  }
}

export class RuleValidatedSource implements Source {
  constructor(
    private origin: Source,
    private rules: MatchRule[]
  ) {}
  async matchesFor(date: string): Promise<SourceMatch[]> {
    const matches = await this.origin.matchesFor(date);
    try {
      this.rules.forEach((rule) => {
        rule(matches);
      });
      return matches;
    } catch (error) {
      throw new SourceError('Source Error in results', { cause: error });
    }
  }
}
