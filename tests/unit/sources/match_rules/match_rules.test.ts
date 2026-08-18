import type { SourceMatch } from '../../../../src/sources/types';
import { MatchRuleError, sameTeam } from '../../../../src/sources/match_rules/match_rules';

describe('Given a match with the same home and away team', () => {
  let match: SourceMatch;
  beforeEach(() => {
    match = { home: 'Arsenal', away: 'Arsenal' };
  });
  describe('when the match is processed', () => {
    it('raises a MatchRuleError', () => {
      expect(() => sameTeam(match)).toThrow(MatchRuleError);
    });
  });
});

describe('Given a match with the same home and away team, independent of case', () => {
  let match: SourceMatch;
  beforeEach(() => {
    match = { home: 'ArSeNaL', away: 'aRsEnAl' };
  });
  describe('when the match is processed', () => {
    it('raises a MatchRuleError', () => {
      expect(() => sameTeam(match)).toThrow(MatchRuleError);
    });
  });
});

describe('Given a match with the same home and away team, independent of whitespace', () => {
  let match: SourceMatch;
  beforeEach(() => {
    match = { home: '    arsenal     ', away: 'Arsenal' };
  });
  describe('when the match is processed', () => {
    it('raises a MatchRuleError', () => {
      expect(() => sameTeam(match)).toThrow(MatchRuleError);
    });
  });
});

describe('Given a valid match', () => {
  let match: SourceMatch;
  beforeEach(() => {
    match = { home: 'Arsenal', away: 'Spurs' };
  });
  describe('when the match is processed', () => {
    it('does not raise a MatchRuleError', () => {
      expect(() => sameTeam(match)).not.toThrow(MatchRuleError);
    });
  });
});
