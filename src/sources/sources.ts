import { JsonSourceSchema, type Source, type SourceMatch } from './types';
import { readFileSync } from 'node:fs';
import type { Extract, Raw } from './raw';

export class JsonSource implements Source {
  constructor(private filepath: string) {}
  async matchesFor(date: string): Promise<SourceMatch[]> {
    const raw = JSON.parse(readFileSync(this.filepath, 'utf8'));
    const fixtures = JsonSourceSchema.parse(raw[date] ?? []);
    return fixtures.map((f) => ({ home: f.home, away: f.away, odds: f.odds }));
  }
}

export class ApiSource<T> implements Source {
  constructor(
    private raw: Raw<T>,
    private extract: Extract<T>
  ) {}
  async matchesFor(date: string): Promise<SourceMatch[]> {
    return this.extract(await this.raw.fetch(date));
  }
}
