import type { SourceMatch } from './types';

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
    if (match.home.id === match.away.id) {
      throw new MatchRuleError('Home and away team should not be the same');
    }
  });
};

export const emptyTeam: MatchRule = (matches: SourceMatch[]) => {
  matches.forEach((match) => {
    const home =
      match.home.name == null ||
      cleanName(match.home.name) === '' ||
      match.home.id == null ||
      cleanName(match.home.id) === '';
    const away =
      match.away.name == null ||
      cleanName(match.away.name) === '' ||
      match.away.id == null ||
      cleanName(match.away.id) === '';
    if (home) {
      throw new MatchRuleError('Home team should not be empty');
    }
    if (away) {
      throw new MatchRuleError('Away team should not be empty');
    }
  });
};

export const uniqueTeams: MatchRule = (matches: SourceMatch[]) => {
  const teams = matches.flatMap((match) => [match.home.id, match.away.id]);
  if (teams.length !== new Set(teams).size) {
    throw new MatchRuleError('Teams must be unique');
  }
};

export const probabilitySumToGreaterThanOne: MatchRule = (matches: SourceMatch[]) => {
  matches.forEach((match) => {
    const totalOdds = 1 / match.odds.home + 1 / match.odds.away + 1 / match.odds.draw;
    if (totalOdds <= 1) {
      throw new MatchRuleError('Total Odds Probability should be greater than one');
    }
  });
};

export const DEFAULT_MATCH_RULES: MatchRule[] = [
  sameTeam,
  emptyTeam,
  uniqueTeams,
  probabilitySumToGreaterThanOne,
];
