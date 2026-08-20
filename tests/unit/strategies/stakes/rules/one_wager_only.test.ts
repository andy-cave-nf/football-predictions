import type { OutcomeDistribution } from '../../../../../src/shared';
import { oneWagerOnly, StakeRuleError } from '../../../../../src/strategies/stakes/rules';

describe('Given the one wager only rule', () => {
  let wager: OutcomeDistribution;
  describe('when a wager has only one non zero bet', () => {
    beforeEach(() => {
      wager = { home: 0.2, away: 0, draw: 0 };
    });
    it('does not raise a StakeRuleError', () => {
      expect(() => oneWagerOnly(wager)).not.toThrow(StakeRuleError);
    });
  });
  describe('when a wager has more than one non zero bet', () => {
    beforeEach(() => {
      wager = { home: 0.2, away: 0.3, draw: 0 };
    });
    it('raises a StakeRuleError', () => {
      expect(() => oneWagerOnly(wager)).toThrow(StakeRuleError);
    });
  });
});
