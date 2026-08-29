import type { SourceMatch } from '../../../../src/sources/types';
import { MatchRuleError, probabilitySumToGreaterThanOne } from '../../../../src/sources/rules';

describe('Given the odds sum to greater than one rule', () => {
  let matches: SourceMatch[];
  describe('when a match is validated with odds that sum to more than one', () => {
    beforeEach(() => {
      matches = [{ home: 'home', away: 'away', odds: { home: 2.0, away: 2.0, draw: 3.0 } }];
    });
    it('does not raise a MatchRuleError', () => {
      expect(() => probabilitySumToGreaterThanOne(matches)).not.toThrow(MatchRuleError);
    });
  });
  describe('when a match is validated with odds that sum to less than one', () => {
    beforeEach(() => {
      matches = [{ home: 'home', away: 'away', odds: { home: 4.0, away: 4.0, draw: 4.0 } }];
    });
    it('raises a MatchRuleError', () => {
      expect(() => probabilitySumToGreaterThanOne(matches)).toThrow(MatchRuleError);
    });
  });
  describe('when a match is validated with odds that sum to one', () => {
    beforeEach(() => {
      matches = [{ home: 'home', away: 'away', odds: { home: 3.0, away: 3.0, draw: 3.0 } }];
    });
    it('raises a MatchRuleError', () => {
      expect(() => probabilitySumToGreaterThanOne(matches)).toThrow(MatchRuleError);
    });
  });
});
