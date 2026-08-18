import type { SourceMatch } from '../../../../src/sources/types';
import { MatchRuleError, sameTeam } from '../../../../src/sources/match_rules/match_rules';

describe('Given the same team rule', () => {
  let match: SourceMatch;
  beforeEach(() => {
    match = { home: 'Arsenal', away: 'Arsenal' };
  });
  describe('when a match is processed with the same home and away team', () => {
    it('raises a MatchRuleError', () => {
      expect(() => sameTeam(match)).toThrow(MatchRuleError);
    });
  });
  describe('when a valid match is processed', () => {
    beforeEach(() => {
      match = { home: 'Arsenal', away: 'Spurs' };
    });
    it('does not raise a MatchRuleError', () => {
      expect(() => sameTeam(match)).not.toThrow(MatchRuleError);
    });
  });
});
