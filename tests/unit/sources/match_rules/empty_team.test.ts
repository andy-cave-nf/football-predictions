import type { SourceMatch } from '../../../../src/sources/types';
import { emptyTeam, MatchRuleError } from '../../../../src/sources/match_rules/match_rules';

describe('Given the emptyTeam rule', () => {
  let match: SourceMatch;
  describe('when the match is validated with an empty home team', () => {
    beforeEach(() => {
      match = { home: '', away: 'not empty' };
    });
    it('raises a MatchRuleError', () => {
      expect(() => emptyTeam(match)).toThrow(MatchRuleError);
    });
  });
  describe('when the match is validated with an empty away team', () => {
    beforeEach(() => {
      match = { home: 'home', away: '' };
    });
    it('raises a MatchRuleError', () => {
      expect(() => emptyTeam(match)).toThrow(MatchRuleError);
    });
  });
  describe('when the match is validated with an undefined away team', () => {
    beforeEach(() => {
      // @ts-expect-error testing away is null
      match = { home: 'home', away: null };
    });
    it('raises a MatchRuleError', () => {
      expect(() => emptyTeam(match)).toThrow(MatchRuleError);
    });
  });
  describe('when the match is validated with an undefined home team', () => {
    beforeEach(() => {
      // @ts-expect-error testing home is null
      match = { home: null, away: 'away' };
    });
    it('raises a MatchRuleError', () => {
      expect(() => emptyTeam(match)).toThrow(MatchRuleError);
    });
  });
  describe('when the match is validated without a home team', () => {
    beforeEach(() => {
      // @ts-expect-error testing no home team
      match = { away: 'away' };
    });
    it('raises a MatchRuleError', () => {
      expect(() => emptyTeam(match)).toThrow(MatchRuleError);
    });
  });
  describe('when the match is validated without an away team', () => {
    beforeEach(() => {
      // @ts-expect-error testing no away team
      match = { home: 'home' };
    });
    it('raises a MatchRuleError', () => {
      expect(() => emptyTeam(match)).toThrow(MatchRuleError);
    });
  });
});
