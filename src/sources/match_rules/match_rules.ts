import type { SourceMatch } from '../types';

export function cleanName(name: string): string {
  return name.trim().toLowerCase();
}

export class MatchRuleError extends Error {
  constructor(
    public message: string,
    public options?: ErrorOptions
  ) {
    super(message, options);
    this.name = 'MatchRuleError';
  }
}

export type MatchRule = (matches: SourceMatch[]) => void;
export const sameTeam: MatchRule = (matches: SourceMatch[]) => {
  matches.forEach((match) => {
    if (cleanName(match.home) === cleanName(match.away)) {
      throw new MatchRuleError('Boom');
    }
  });
};

export const emptyTeam: MatchRule = (matches: SourceMatch[]) => {
  matches.forEach((match) => {
    const home = match.home == null || cleanName(match.home) === '';
    const away = match.away == null || cleanName(match.away) === '';
    if (home) {
      throw new MatchRuleError('Home team should not be empty');
    }
    if (away) {
      throw new MatchRuleError('Away team should not be empty');
    }
  });
};

export const uniqueTeams: MatchRule = (matches: SourceMatch[]) => {
  const teams = matches.flatMap((match) => [cleanName(match.home), cleanName(match.away)]);
  if (teams.length !== new Set(teams).size) {
    throw new MatchRuleError('Teams must be unique');
  }
};

export const DEFAULT_MATCH_RULES: MatchRule[] = [sameTeam, emptyTeam, uniqueTeams];
