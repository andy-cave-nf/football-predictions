import type { SourceMatch } from '../../../../src/sources/types';
import { MatchRuleError, uniqueTeams } from '../../../../src/sources/match_rules/match_rules';

describe('Given the unique team rule', () => {
  let matches: SourceMatch[];
  describe('when all teams are unique between matches', () => {
    beforeEach(() => {
      matches = [
        { home: 'Man U', away: 'Man C' },
        { home: 'Chelsea', away: 'Arsenal' },
      ];
    });
    it('does not raise a MatchRuleError', () => {
      expect(() => uniqueTeams(matches)).not.toThrow(MatchRuleError);
    });
  });
  describe('when a team plays more than one match in the source matches', () => {
    beforeEach(() => {
      matches = [
        { home: 'Man U', away: 'Man C' },
        { home: 'Chelsea', away: 'Man U' },
      ];
    });
    it('raises a MatchRuleError', () => {
      expect(() => uniqueTeams(matches)).toThrow(MatchRuleError);
    });
  });
  describe('when the same match is repeated in the source matches', () => {
    beforeEach(() => {
      matches = [
        { home: 'Man U', away: 'Man C' },
        { home: 'Man U', away: 'Man C' },
      ];
    });
    it('raises a MatchRuleError', () => {
      expect(() => uniqueTeams(matches)).toThrow(MatchRuleError);
    });
  });
});
