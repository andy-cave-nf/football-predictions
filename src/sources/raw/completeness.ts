import type { RawMatch, SourceMatch } from '../types';

export type CompletenessRule = (match: RawMatch[]) => SourceMatch[];

const isComplete = (m: RawMatch): m is SourceMatch => {
  return (
    m.home !== null &&
    m.away !== null &&
    m.odds !== null &&
    m.odds?.home !== null &&
    m.odds?.away !== null &&
    m.odds?.draw !== null
  );
};
export const allComplete: CompletenessRule = (matches: RawMatch[]): SourceMatch[] => {
  return matches.filter(isComplete);
};
