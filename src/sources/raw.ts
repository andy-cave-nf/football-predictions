import type { SourceMatch } from './types';

export type StubJson = {
  games: { home: string; away: string }[];
};

const HARDCODED_RAWJSON: StubJson = { games: [{ home: 'Arsenal', away: 'Coventry' }] };

export interface Raw<T> {
  fetch(date: string): Promise<T>;
}

export class RawStub implements Raw<StubJson> {
  constructor(private raw: StubJson = HARDCODED_RAWJSON) {}
  async fetch(_date: string): Promise<StubJson> {
    return this.raw;
  }
}

export type Extract<T> = (raw: T) => SourceMatch[];
export const stubExtract: Extract<StubJson> = (raw: StubJson): SourceMatch[] => {
  const games = raw.games;
  return games.map((game) => ({
    home: game.home,
    away: game.away,
    odds: { home: 1.2, away: 6.0, draw: 4.0 },
  }));
};
