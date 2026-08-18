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
