import { type Source, type SourceMatch } from './types';
import { readFileSync } from 'node:fs';
import type { Raw } from './raw/raw';
import { JsonSourceSchema } from './raw/schema/json_fixture';
import type { Extract } from './raw/extract';
import { z } from 'zod';
import { allComplete, type CompletenessRule } from './raw/completeness';

export class JsonSource implements Source {
  constructor(private filepath: string) {}
  async matchesFor(date: string): Promise<SourceMatch[]> {
    const raw = JSON.parse(readFileSync(this.filepath, 'utf8'));
    const fixtures = JsonSourceSchema.parse(raw[date] ?? []);
    return fixtures.map((f) => ({ home: f.home, away: f.away, odds: f.odds }));
  }
}

export class ApiSource<T extends z.ZodType> implements Source {
  constructor(
    private raw: Raw<T>,
    private extract: Extract<T>,
    private schema: T,
    private complete: CompletenessRule = allComplete
  ) {}
  async matchesFor(date: string): Promise<SourceMatch[]> {
    return this.extract(this.schema.parse(await this.raw.fetch(date)), this.complete);
  }
}
//Connect up to the actual bin ts,sort out review comments
// add logging,
// add the fetch
// add the skippable rules (no duplicate teams)
