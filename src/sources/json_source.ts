import { JsonSourceSchema, type Source, type SourceMatch } from './types';
import { readFileSync } from 'node:fs';

export class JsonSource implements Source {
  constructor(private filepath: string) {}
  matchesFor(date: string): SourceMatch[] {
    const raw = JSON.parse(readFileSync(this.filepath, 'utf8'));
    const fixtures = JsonSourceSchema.parse(raw[date] ?? []);
    return fixtures.map((f) => ({ home: f.home, away: f.away }));
  }
}
