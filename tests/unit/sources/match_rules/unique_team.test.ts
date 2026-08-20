import type { SourceMatch } from '../../../../src/sources/types';
import { MatchRuleError, uniqueTeams } from '../../../../src/sources/rules';

describe('Given the unique team rule', () => {
  let matches: SourceMatch[];
  describe('when all teams are unique between matches', () => {
    beforeEach(() => {
      matches = [
        { home: 'Man U', away: 'Man C', odds: { home: 1.3, away: 1.4, draw: 1.5 } },
        { home: 'Chelsea', away: 'Arsenal', odds: { home: 1.2, away: 1.3, draw: 1.6 } },
      ];
    });
    it('does not raise a MatchRuleError', () => {
      expect(() => uniqueTeams(matches)).not.toThrow(MatchRuleError);
    });
  });
  describe('when a team plays more than one match in the source matches', () => {
    beforeEach(() => {
      matches = [
        { home: 'Man U', away: 'Man C', odds: { home: 1.3, away: 1.4, draw: 1.5 } },
        { home: 'Chelsea', away: 'Man U', odds: { home: 1.2, away: 1.3, draw: 1.6 } },
      ];
    });
    it('raises a MatchRuleError', () => {
      expect(() => uniqueTeams(matches)).toThrow(MatchRuleError);
    });
  });
  describe('when the same match is repeated in the source matches', () => {
    beforeEach(() => {
      matches = [
        { home: 'Man U', away: 'Man C', odds: { home: 1.2, away: 1.3, draw: 1.6 } },
        { home: 'Man U', away: 'Man C', odds: { home: 1.2, away: 1.3, draw: 1.6 } },
      ];
    });
    it('raises a MatchRuleError', () => {
      expect(() => uniqueTeams(matches)).toThrow(MatchRuleError);
    });
  });
});
