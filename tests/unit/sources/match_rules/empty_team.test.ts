import type { SourceMatch } from '../../../../src/sources/types';
import { emptyTeam, MatchRuleError } from '../../../../src/sources/match_rules/match_rules';

describe('Given the emptyTeam rule', () => {
  let matches: SourceMatch[];
  describe('when the match is validated with an empty home team', () => {
    beforeEach(() => {
      matches = [{ home: '', away: 'not empty', odds: { home: 1.01, away: 2.0, draw: 3.0 } }];
    });
    it('raises a MatchRuleError', () => {
      expect(() => emptyTeam(matches)).toThrow(MatchRuleError);
    });
  });
  describe('when the match is validated with an empty away team', () => {
    beforeEach(() => {
      matches = [{ home: 'home', away: '', odds: { home: 1.1, away: 2.0, draw: 3.2 } }];
    });
    it('raises a MatchRuleError', () => {
      expect(() => emptyTeam(matches)).toThrow(MatchRuleError);
    });
  });
  describe('when the match is validated with an undefined away team', () => {
    beforeEach(() => {
      // @ts-expect-error testing away is null
      matches = [{ home: 'home', away: null, odds: { home: 10, away: 2, draw: 4 } }];
    });
    it('raises a MatchRuleError', () => {
      expect(() => emptyTeam(matches)).toThrow(MatchRuleError);
    });
  });
  describe('when the match is validated with an undefined home team', () => {
    beforeEach(() => {
      // @ts-expect-error testing home is null
      matches = [{ home: null, away: 'away', odds: { home: 22, away: 1.2, draw: 3.0 } }];
    });
    it('raises a MatchRuleError', () => {
      expect(() => emptyTeam(matches)).toThrow(MatchRuleError);
    });
  });
  describe('when the match is validated without a home team', () => {
    beforeEach(() => {
      // @ts-expect-error testing no home team
      matches = [{ away: 'away', odds: { home: 1.1, away: 20, draw: 2.0 } }];
    });
    it('raises a MatchRuleError', () => {
      expect(() => emptyTeam(matches)).toThrow(MatchRuleError);
    });
  });
  describe('when the match is validated without an away team', () => {
    beforeEach(() => {
      // @ts-expect-error testing no away team
      matches = [{ home: 'home', odds: { home: 1.01, away: 2.3, draw: 3.3 } }];
    });
    it('raises a MatchRuleError', () => {
      expect(() => emptyTeam(matches)).toThrow(MatchRuleError);
    });
  });
});
