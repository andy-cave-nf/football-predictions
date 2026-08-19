import type { SourceMatch } from '../../../../src/sources/types';
import { MatchRuleError, sameTeam } from '../../../../src/sources/match_rules/match_rules';

describe('Given the same team rule', () => {
  let matches: SourceMatch[];
  beforeEach(() => {
    matches = [{ home: 'Arsenal', away: 'Arsenal', odds: { home: 1.1, away: 2.0, draw: 3.0 } }];
  });
  describe('when a match is processed with the same home and away team', () => {
    it('raises a MatchRuleError', () => {
      expect(() => sameTeam(matches)).toThrow(MatchRuleError);
    });
  });
  describe('when a valid match is processed', () => {
    beforeEach(() => {
      matches = [{ home: 'Arsenal', away: 'Spurs', odds: { home: 1.1, away: 2.4, draw: 3.0 } }];
    });
    it('does not raise a MatchRuleError', () => {
      expect(() => sameTeam(matches)).not.toThrow(MatchRuleError);
    });
  });
});
