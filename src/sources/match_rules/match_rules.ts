import type { SourceMatch } from '../types';

export class MatchRuleError extends Error {
  constructor(
    public message: string,
    public options?: ErrorOptions
  ) {
    super(message, options);
    this.name = 'MatchRuleError';
  }
}

export type MatchRule = (match: SourceMatch) => void;

export const sameTeam: MatchRule = (match: SourceMatch) => {
  if (match.home.trim().toLowerCase() === match.away.trim().toLowerCase()) {
    throw new MatchRuleError('Home team and away team should be different');
  }
};

export const emptyTeam: MatchRule = (match: SourceMatch) => {
  const home = match.home == null || match.home.trim() === '';
  const away = match.away == null || match.away.trim() === '';
  if (home) {
    throw new MatchRuleError('Home team should not be empty');
  }
  if (away) {
    throw new MatchRuleError('Away team should not be empty');
  }
};
