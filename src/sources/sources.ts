import { type Source, type SourceMatch } from './types';
import { readFileSync } from 'node:fs';
import type { Raw } from './raw/raw';
import { JsonSourceSchema } from './raw/schema/json_fixture';
import type { Extract } from './raw/extract';
import { z } from 'zod';
import { allComplete, type CompletenessRule } from './raw/completeness';
import { type Logs } from '../logs';

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
    private log: Logs,
    private complete: CompletenessRule = allComplete
  ) {}
  async matchesFor(date: string): Promise<SourceMatch[]> {
    const fetched = await this.raw.fetch(date);
    this.log.info('Matches fetched successfully.');
    const parsed = this.schema.parse(fetched);
    this.log.info('Matches parsed successfully.');
    return this.extract(parsed, this.log, this.complete);
  }
}
// add the skippable rules (no duplicate teams)
