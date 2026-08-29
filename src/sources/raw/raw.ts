import { HARDCODED_RAWJSON, type StubJson, StubJsonSchema } from './schema/json_fixture';
import { z } from 'zod';
import type { EspnFixtures, EspnFixturesSchema } from './schema/espn';

export interface Raw<T extends z.ZodType> {
  fetch(date: string): Promise<z.infer<T>>;
}

export class RawStub implements Raw<typeof StubJsonSchema> {
  async fetch(_date: string): Promise<StubJson> {
    return HARDCODED_RAWJSON;
  }
}

export class EspnRaw implements Raw<typeof EspnFixturesSchema> {
  constructor(private competition: string) {}
  async fetch(date: string): Promise<EspnFixtures> {
    const raw = await fetch(this.url(date));
    return await raw.json();
  }
  private url(date: string): string {
    return `https://site.api.espn.com/apis/site/v2/sports/soccer/${this.competition}/scoreboard?dates=${date.replace('-', '')}`;
  }
}

// And raise an error if date is not in the correct format (Zod input?)
// And raise an error if competition is not one of the possible ones.
