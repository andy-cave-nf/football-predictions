import type { SourceMatch } from '../../../../src/sources/types';
import { emptyTeam, MatchRuleError } from '../../../../src/sources/match_rules/match_rules';

describe('Given the emptyTeam rule', () => {
  let matches: SourceMatch[];
  describe('when the match is validated with an empty home team', () => {
    beforeEach(() => {
      matches = [{ home: '', away: 'not empty' }];
    });
    it('raises a MatchRuleError', () => {
      expect(() => emptyTeam(matches)).toThrow(MatchRuleError);
    });
  });
  describe('when the match is validated with an empty away team', () => {
    beforeEach(() => {
      matches = [{ home: 'home', away: '' }];
    });
    it('raises a MatchRuleError', () => {
      expect(() => emptyTeam(matches)).toThrow(MatchRuleError);
    });
  });
  describe('when the match is validated with an undefined away team', () => {
    beforeEach(() => {
      // @ts-expect-error testing away is null
      matches = [{ home: 'home', away: null }];
    });
    it('raises a MatchRuleError', () => {
      expect(() => emptyTeam(matches)).toThrow(MatchRuleError);
    });
  });
  describe('when the match is validated with an undefined home team', () => {
    beforeEach(() => {
      // @ts-expect-error testing home is null
      matches = [{ home: null, away: 'away' }];
    });
    it('raises a MatchRuleError', () => {
      expect(() => emptyTeam(matches)).toThrow(MatchRuleError);
    });
  });
  describe('when the match is validated without a home team', () => {
    beforeEach(() => {
      // @ts-expect-error testing no home team
      matches = [{ away: 'away' }];
    });
    it('raises a MatchRuleError', () => {
      expect(() => emptyTeam(matches)).toThrow(MatchRuleError);
    });
  });
  describe('when the match is validated without an away team', () => {
    beforeEach(() => {
      // @ts-expect-error testing no away team
      matches = [{ home: 'home' }];
    });
    it('raises a MatchRuleError', () => {
      expect(() => emptyTeam(matches)).toThrow(MatchRuleError);
    });
  });
});
