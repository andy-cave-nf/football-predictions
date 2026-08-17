import { type Source, SourceError, type SourceMatch } from './types';

export class ErrorHandledSource implements Source {
  constructor(private origin: Source) {}
  matchesFor(date: string): SourceMatch[] {
    try {
      return this.origin.matchesFor(date);
    } catch (error) {
      throw new SourceError('Source Error in results', { cause: error });
    }
  }
}
