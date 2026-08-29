import { type EspnFixtures, EspnFixturesSchema } from './schema/espn';
import type { RawMatch, SourceMatch } from '../types';

import { type StubJson, StubJsonSchema } from './schema/json_fixture';
import { z } from 'zod';
import { allComplete, type CompletenessRule } from './completeness';

export type Extract<T extends z.ZodType> = (
  raw: z.infer<T>,
  complete: CompletenessRule
) => SourceMatch[];
export const stubExtract: Extract<typeof StubJsonSchema> = (
  raw: StubJson,
  _complete: CompletenessRule = allComplete
): SourceMatch[] => {
  const games = raw.games;
  return games.map((game) => ({
    home: game.home,
    away: game.away,
    odds: { home: 1.2, away: 6.0, draw: 4.0 },
  }));
};
export const espnExtract: Extract<typeof EspnFixturesSchema> = (
  raw: EspnFixtures,
  complete: CompletenessRule
): SourceMatch[] => {
  if (raw.events == null) return [];
  const rawMatches: RawMatch[] = raw.events.flatMap((event) => {
    const competition = event.competitions[0];
    const home = competition?.competitors.find((c) => c.homeAway === 'home')?.team.name;
    const away = competition?.competitors.find((c) => c.homeAway === 'away')?.team.name;
    const moneyLine = competition?.odds?.[0]?.moneyline;
    return [
      {
        home: home ?? null,
        away: away ?? null,
        odds:
          moneyLine != null
            ? {
                home: moneyLineToDecimal(parseInt(moneyLine.home.close.odds)) ?? null,
                away: moneyLineToDecimal(parseInt(moneyLine.away.close.odds)) ?? null,
                draw:
                  moneyLine.draw != null
                    ? moneyLineToDecimal(parseInt(moneyLine.draw.close.odds))
                    : null,
              }
            : null,
      },
    ];
  });
  return complete(rawMatches);
};

export function moneyLineToDecimal(moneyLine: number): number {
  if (moneyLine >= 100) {
    return moneyLine / 100 + 1;
  }
  if (moneyLine <= -100) {
    return 100 / Math.abs(moneyLine) + 1;
  }
  throw new RangeError(
    'MoneyLine odds must be greater than or equal to 100 or less than or equal to -100'
  );
}
