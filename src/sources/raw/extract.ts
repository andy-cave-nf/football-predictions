import { type EspnFixtures, EspnFixturesSchema } from './schema/espn';
import type { RawMatch, SourceMatch } from '../types';

import { type StubJson, StubJsonSchema } from './schema/json_fixture';
import { z } from 'zod';
import { allComplete, type CompletenessRule } from './completeness';
import { type Logs } from '../../logs';

export type Extract<T extends z.ZodType> = (
  raw: z.infer<T>,
  log: Logs,
  complete: CompletenessRule
) => SourceMatch[];
export const stubExtract: Extract<typeof StubJsonSchema> = (
  raw: StubJson,
  _log: Logs,
  _complete: CompletenessRule = allComplete
): SourceMatch[] => {
  const games = raw.games;
  return games.map((game) => ({
    matchId: game.matchId,
    kickoff: game.kickoff,
    home: game.home,
    away: game.away,
    odds: { home: 1.2, away: 6.0, draw: 4.0 },
    source: 'JsonStub',
  }));
};
export const espnExtract: Extract<typeof EspnFixturesSchema> = (
  raw: EspnFixtures,
  log: Logs,
  complete: CompletenessRule
): SourceMatch[] => {
  if (raw.events == null) {
    log.info('No espn events found');
    return [];
  }
  const rawMatches: RawMatch[] = raw.events.flatMap((event) => {
    const matchId = event.id;
    const kickoff = event.date;
    const competition = event.competitions[0];
    const homeData = competition?.competitors.find((c) => c.homeAway === 'home');
    const awayData = competition?.competitors.find((c) => c.homeAway === 'away');
    const moneyLine = competition?.odds?.[0]?.moneyline;
    return [
      {
        matchId: matchId ?? null,
        kickoff: kickoff ?? null,
        home: { id: homeData?.team.id ?? null, name: homeData?.team.name ?? null },
        away: { id: awayData?.team.id ?? null, name: awayData?.team.name ?? null },
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
        source: 'ESPN',
      },
    ];
  });
  log.info(`${rawMatches.length} matches extracted`);
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
