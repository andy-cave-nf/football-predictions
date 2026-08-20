import type { OutcomeDistribution } from '../../../../../src/shared';
import { StakeRuleError, sumLessThanOne } from '../../../../../src/strategies/stakes/rules';

describe('Given the sum less than one rule', () => {
  let wager: OutcomeDistribution;
  describe('when a wager adds to less than one', () => {
    beforeEach(() => {
      wager = { home: 0.5, away: 0.4, draw: 0.05 };
    });
    it('does not raise a StakeRuleError', () => {
      expect(() => sumLessThanOne(wager)).not.toThrow(StakeRuleError);
    });
  });
  describe('when a wager adds to more than one', () => {
    beforeEach(() => {
      wager = { home: 0.5, away: 0.4, draw: 0.2 };
    });
    it('raises a StakeRuleError', () => {
      expect(() => sumLessThanOne(wager)).toThrow(StakeRuleError);
    });
  });
  describe('when a wager adds to one', () => {
    beforeEach(() => {
      wager = { home: 0.5, away: 0.4, draw: 0.1 };
    });
    it('does not raise a StakeError', () => {
      expect(() => sumLessThanOne(wager)).not.toThrow(StakeRuleError);
    });
  });
});
